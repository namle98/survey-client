import React from 'react'
import { Modal, Pagination, Button, Input } from "antd";
import { withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import moment from 'moment';
export default class EditSurvey extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.survey.id,
            title: this.props.survey.title,
            startDate: this.props.survey.start_date,
            endDate: this.props.survey.end_date,
            createdAt: this.props.survey.createdAt,
            updatedAt: this.props.survey.updatedAt,
            createdBy: this.props.survey.createdBy,
        }
    }
    componentDidMount() {
        console.log('==================', JSON.stringify(this.props))
    }
    onChangeValue = (key, value) => {
        this.setState({
            ...this.state,
            [key]: value,
        })
    }
    render() {
        if (this.props) {
            return (
                <Modal
                    title="Thông tin chi tiết"
                    visible={this.state.visiableDetail}
                    // onOk={this.handleOk}
                    onCancel={() =>
                        this.setState({
                            visiableDetail: false
                        })}
                >
                    <div className="col">
                        Mã số khảo sát
                             <Input placeholder="Mã số"
                            name="id"
                            value={this.state.survey.id}
                            onChange={(e) => {
                                this.onChangeValue(e.target.name, e.target.idSurvey)
                            }}
                        >
                        </Input>
                    </div>
                    <div className="col">
                        Tên khảo sát
                             <Input placeholder="Mã số"
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
                             <Input placeholder="Mã số"
                            name="startDate"
                            value={this.state.survey.start_date}
                            onChange={(e) => {
                                this.onChangeValue(e.target.name, e.target.value)
                            }}
                        >
                        </Input>
                    </div>
                    <div className="col">
                        Ngày kết thúc
                             <Input placeholder="Mãố s"
                            name="endDate"
                            value={this.state.endDate}
                            onChange={(e) => {
                                this.onChangeValue(e.target.name, e.target.value)
                            }}
                        >
                        </Input>
                    </div>
                    <div className="col">
                        Ngày tạo khảo sát
                                 <Input placeholder="Mã số"
                            name="createdAt"
                            value={this.state.createdAt}
                            onChange={(e) => {
                                this.onChangeValue(e.target.name, e.target.value)
                            }}
                        >
                        </Input>
                    </div>
                    <div className="col">
                        Người tạo khảo  sát
                             <Input placeholder="Mã số"
                            name="createdBy"
                            value={this.state.createdBy}
                            onChange={(e) => {
                                this.onChangeValue(e.target.name, e.target.value)
                            }}
                        >
                        </Input>
                    </div>

                    <div className="col">
                        Lần cập nhật gần nhất
                             <Input placeholder="Mã số"
                            name="updatedAt"
                            value={this.state.updatedAt}
                            onChange={(e) => {
                                this.onChangeValue(e.target.name, e.target.value)
                            }}
                        >
                        </Input>
                    </div>
                </Modal>
            )
        }
    }
}
