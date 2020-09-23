import React from 'react'
import makeRequest from "../../libs/request";
import { URL_API } from '../../config/url';
import ButtonLoading from '../../partials/common/ButtonLoading';

import DateTimePicker from "./DateTimePicker";
import EditSurvey from './functionEdit'
import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody, Icon
} from "@material-ui/core";
import { showSuccessMessageIcon, showErrorMessage } from "../../actions/notification";
import { InfoCircleOutlined, SearchOutlined, CalendarOutlined } from "@ant-design/icons";
import { Modal, Pagination, Button, Input } from "antd";
import { withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import moment from 'moment';
import { AUTH_TOKEN_KEY } from '../../config/auth';
import { typeOf } from 'react-is';
import { isInteger } from 'lodash';

const useStyles = theme => ({
    root: {
        width: "100%",
        //   marginTop: theme.spacing(3),
        overflowX: "auto",
    },
    table: {
        minWidth: 650,
    },
});

const classes = useStyles();
class ListSurvey extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            SurRounds: [],
            token: "",
            searchKey: "",
            totalPage: "",
            idDelete: "",
            searched: false,
            defaultInPage: "2",
            currentPage: "1",
            deleteVisiable: false,
            survey: {
                id: "",
                title: "",
                startDate: "",
                endDate: "",
                createdAt: "",
                updatedAt: "",
                createdBy: "",
                updatedBy: "",

            },
            visiableDetail: false,
            detailSurvey: {},
            user: ""

        }
    }
    componentDidMount() {
        let storeData = localStorage.getItem(AUTH_TOKEN_KEY);
        storeData = JSON.parse(storeData)
        let token = storeData.authToken
        let user = storeData.user
        token = token.slice(1, token.length - 1);
        this.setState({
            ...this.state,
            user: user,
            token: token,
            SurRounds: this.fetchAPI()
        })

    }
    fetchAPI() {
        let data = { page: this.state.currentPage, limit: this.state.defaultInPage }
         makeRequest("get", `surveyrounds/getAllSurRounds`, data)
            .then(response => {
                 this.setState({
                    ...this.state,
                    totalPage: (response.data.data.total),
                    SurRounds: response.data.data.ListSurveyRounds
                })
            },
            )

    }
    async dateTime(data, key) {
        await this.setState({
            ...this.state,
            survey: {
                ...this.state.survey,
                [key]: data
            }
        })
    }
    async searchHandle() {
         await this.setState({
            ... this.state,
            searched: true,
        })
        let data = {
            title: this.state.searchKey,
            page: this.state.currentPage,
            limit: 2
        }
        await makeRequest("get", `surveyrounds/searchSurRounds`, data)
            .then(response => {
                 if (response.data.message === "SUCCESS" && response.data.code === 200)
                    this.setState({
                        ...this.state,
                        totalPage: (response.data.data.total),
                        SurRounds: response.data.data.rows
                    })
            },
            )
    }
    onChangeValue = (key, value) => {
        this.setState({
            ...this.state,
            survey: {
                ...this.state.survey,
                [key]: value,
            }
        })
    }
    async onChangePage(page) {
        await this.setState({
            ... this.state,
            currentPage: page,
        });
        // if (this.state.searched === false) {
        this.fetchAPI()
        // } else { this.searchHandle() }
    };
    deleteModal(e, id) {
        this.setState({
            ... this.state,
            deleteVisiable: true,
            idDelete: id,
        })
    }
    DeleteSurvey() {
        let data = {
            id: this.state.idDelete
        }
        let url = URL_API + `surveyrounds/deleteSurRounds?id=${data.id}`;
        fetch(url, {
            method: 'GET',
            headers: {
                "token": this.state.token
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.message === "SUCCESS" && result.code === 200) {
                        this.setState({
                            ...this.state,
                            deleteVisiable: false,
                        })
                    }
                    this.fetchAPI()
                    showSuccessMessageIcon("Xóa khảo sát thành công");
                })
            .catch((error) => {
				return showErrorMessage("Xóa thất bại, " + error);

            });
    }

    async updateSurvey() {
         let convert = {
            del: 0,
            end_date: this.state.survey.endDate,
            id: this.state.survey.id,
            start_date: this.state.survey.startDate,
            title: this.state.survey.title,
        };
         let url = URL_API + `surveyrounds/updateSurRounds/`;

        makeRequest("post", `surveyrounds/updateSurRounds`, convert)
            .then(({ data }) => {
                if (data.signal) {
                    this.setState({
                        ...this.state,
                        visiableDetail: false
                    })
                }
            })
            .then(() => {
                this.fetchAPI()
                showSuccessMessageIcon("Cập nhậ khảo sát thành công");
                return this.props.history.push("/survey/list");
            })
            .catch((err) => {
                // setLoadSubmit(false);
                return showErrorMessage("Cập nhật thất bại, " + err);
            });
    };

    async onClickDetail(e, id) {
        e = window.event || e;
        e.preventDefault();
         const url = URL_API + `surveyrounds/getbyidSurRounds?id=${id}`
        await fetch(url, {
            method: 'GET',
            headers: {
                "token": this.state.token
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        ...this.state,
                        detailSurvey: result.data,
                        survey: {
                            id: result.data.id,
                            title: result.data.title,
                            startDate: result.data.start_date,
                            endDate: result.data.end_date,
                            createdAt: result.data.createdAt,
                            updatedAt: result.data.updatedAt,
                            createdBy: result.data.createdBy,
                        }
                    })
                })
            .catch((error) => {
             });
         await this.setState({
            visiableDetail: true
        })
 
    }
    render() {

        let show;
        if (this.state.SurRounds) {
            show = this.state.SurRounds.map((item, key) => {
                return (
                    <TableRow key={key} >
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{moment(item.start_date).format('DD/MM/YYYY A hh:mm:ss')}</TableCell>
                        <TableCell>{moment(item.end_date).format('DD/MM/YYYY A hh:mm:ss')}</TableCell>
                        <TableCell>{moment(item.createdAt).format('DD/MM/YYYY A hh:mm:ss')}</TableCell>
                        <TableCell>
                            <div className="mg-b5">
                                <Button
                                    type="primary"
                                    size="small"
                                    className="button-center-item "
                                    onClick={(e) => {
                                        this.onClickDetail(e, item.id)
                                    }}
                                    icon={<InfoCircleOutlined />}
                                >
                                    Chi tiết
                                </Button>
                                <Modal
                                    id="modal-detail"
                                    title="Thông tin chi tiết"
                                    visible={this.state.visiableDetail}
                                    onCancel={() => this.setState({
                                        ...this.state,
                                        visiableDetail: false
                                    })}

                                    footer={[
                                        <Button key="update"
                                            onClick={() => { this.updateSurvey() }}
                                        >
                                            Cập nhật
                                                </Button>,
                                        <Button key="update"
                                            onClick={() =>
                                                this.setState({
                                                    visiableDetail: false
                                                })}
                                        >
                                            Trở về
                                                 </Button>,

                                    ]}
                                >

                                    <div className="col">
                                        Mã số khảo sát
                                              <Input placeholder="Mã số"
                                            name="id"
                                            disabled={true}
                                            value={this.state.survey.id}
                                            onChange={(e) => {
                                                this.onChangeValue(e.target.name, e.target.idSurvey)
                                            }}
                                        >
                                        </Input>
                                    </div>
                                    <div className="col">
                                        Tên khảo sát
                             <Input placeholder="Tên khảo sát"
                                            name="title"
                                            value={this.state.survey.title}
                                            onChange={(e) => {
                                                this.onChangeValue(e.target.name, e.target.value)
                                            }}
                                        >
                                        </Input>
                                    </div>
                                    <div className="col">
                                        Ngày bắt đầu
                           
                                        <DateTimePicker changeDate={
                                            (data) => {
                                                this.dateTime(data, "startDate")
                                            }}
                                            defaultDate={this.state.survey.startDate}
                                        ></DateTimePicker>

                                    </div>
                                    <div className="col">
                                        Ngày kết thúc
                                        <DateTimePicker changeDate={
                                            (data) => {
                                                this.dateTime(data, "endDate")
                                            }}
                                            defaultDate={this.state.survey.endDate}
                                        ></DateTimePicker>
                                    </div>
                                    <div className="col">
                                        Ngày tạo khảo sát
                                 <Input placeholder="Ngày tạo khảo sát"
                                            name="createdAt"
                                            disabled={true}
                                            value={moment(this.state.survey.createdAt).format('DD/MM/YYYY A hh:mm:ss')}
                                            onChange={(e) => {
                                                this.onChangeValue(e.target.name, e.target.value)
                                            }}
                                        >
                                        </Input>
                                    </div>
                                    <div className="col">
                                        Người tạo
                             <Input placeholder="Người tạo khảo  sát"
                                            name="createdBy"
                                            disabled={true}
                                            value={this.state.survey.createdBy}
                                            onChange={(e) => {
                                                this.onChangeValue(e.target.name, e.target.value)
                                            }}
                                        >
                                        </Input>
                                    </div>

                                    <div className="col">
                                        Lần cập nhật gần nhất
                             <Input placeholder="Lần cập nhật gần nhất"
                                            name="updatedAt"                 
                                            disabled={true}
                                            value={moment(this.state.survey.updatedAt).format('DD/MM/YYYY A hh:mm:ss')}
                                            onChange={(e) => {
                                                this.onChangeValue(e.target.name, e.target.value)
                                            }}
                                        >
                                        </Input>
                                    </div>
                                </Modal>
                            </div>

                            <div className="mg-b5">
                                <Button
                                    type="primary"
                                    size="small"
                                    className="button-center-item btn-danger"
                                    style={{ color: "white" }}
                                    onClick={(e) => this.deleteModal(e, item.id)}
                                    icon={<InfoCircleOutlined />}
                                >
                                    Xóa
                                </Button>

                                <Modal
                                    id="modal-del"
                                    title="Xóa khảo sát"
                                    visible={this.state.deleteVisiable}
                                    onCancel={() => this.setState({
                                        ... this.state,
                                        deleteVisiable: false
                                    })}
                                    footer={[
                                        <ButtonLoading
                                            type="default"
                                            onClick={() => this.setState({
                                                ...this.state,
                                                deleteVisiable: false,
                                            })}
                                            className="btn btn-label-secondary btn-secondary"
                                        >
                                            Đóng
                </ButtonLoading>,
                                        <ButtonLoading
                                            className="btn btn-label-danger btn-danger"
                                            onClick={() => {
                                                this.DeleteSurvey()
                                            }}
                                        >
                                            <span>Xóa</span>
                                        </ButtonLoading>,
                                    ]}
                                >
                                    <p>Bạn có muốn xóa khảo sát này?</p>
                                </Modal>

                            </div>
                        </TableCell>
                    </TableRow>
                )

            })
        }
        return (
            <div>
                <div className="search-box">
                    <Input style={{ width: "300px" }}
                        value={this.state.searchKey}
                        onKeyPress={(e) => {
                            if (e.keyCode === 13) {
                                this.searchHandle()
                            }
                        }
                        }
                        onChange={(e) =>
                            this.setState({
                                ... this.state,
                                searchKey: e.target.value,
                            })}
                    >
                    </Input>
                    <Button
                        onClick={() => {
                            this.searchHandle()
                        }}
                        icon={<SearchOutlined />

                        }
                    ></Button >
                </div>
                <Table className={classes.table}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã khảo sát</TableCell>
                            <TableCell>Tên khảo sát</TableCell>
                            <TableCell>Ngày bắt đầu</TableCell>
                            <TableCell>Ngày kết thúc</TableCell>
                            <TableCell>Tạo ngày</TableCell>
                            <TableCell style={{ width: 150 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {show}
                    </TableBody>

                </Table>

                <div className="pagination">
                    <Pagination
                        defaultCurrent={1}
                        className="pagination-crm"
                        defaultPageSize={this.state.defaultInPage}
                        total={this.state.totalPage}
                        onChange={(page) => this.onChangePage(page)}
                    >
                    </Pagination>
                </div>
            </div>
        )
    }
}

export default withStyles(useStyles)(withRouter(ListSurvey));