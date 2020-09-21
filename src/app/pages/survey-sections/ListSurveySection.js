/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { Modal, Pagination, Button } from "antd";
import { Form } from "react-bootstrap";
import InputForm from "../../partials/common/InputForm";
import { Card, Col } from "react-bootstrap";
import { InfoCircleOutlined } from "@ant-design/icons";
import Loading from "../loading";
import ButtonLoading from "../../partials/common/ButtonLoading";
import { connect } from "react-redux";
import makeRequest from "../../libs/request";
import { formatTime } from "../../libs/time";
import { Select, Radio } from "antd";
const { Option } = Select;

const useStyles1 = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
}));

const ListSurveySection = (props) => {
  const classes1 = useStyles1();
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);
  const [rows, setRow] = useState([]);
  const [dataSearch, setData] = useState({});
  const [dataDelete, setDataDelete] = useState({ visible: false });
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isLoadDelete, setLoadDelete] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [dataSurvey, setDataSurvery] = useState({});
  const [surveyName, setsurveyName] = useState([]);

  useEffect(() => {
    searchSurveySection({ page: 1, limit: rowsPerPage });
    getsectionName();
  }, []);

  function itemRender(originalElement) {
    return originalElement;
  }
  const getsectionName = () => {
    makeRequest("get", `surveyheader/getSelect`)
      .then(({ data }) => {
        setsurveyName(data.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showModalDetail = (idUpdate) => {
    makeRequest("get", `surveySection/getbyid`, {
      id: idUpdate,
    })
      .then(({ data }) => {
        if (data.data) {
          const {
            section_name,
            surveyHeader,
            section_title,
            section_required_yn,
          } = data.data;
          setDataSurvery({
            section_name,
            surveyHeader,
            section_title,
            section_required_yn,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setShowDetail(true);
  };
  const searchSurveySection = (dataSearch = {}) => {
    setLoading(true);
    makeRequest("get", `surveySection/getallsectionscondition`, dataSearch)
      .then(({ data }) => {
        if (data.signal) {
          const { rows, total } = data.data;
          setRow(rows);
          setTotal(total);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
    searchSurveySection({ ...dataSearch, page: newPage, limit: rowsPerPage });
  };

  const onChangeValue = (key, value) => {
    setData({
      ...dataSearch,
      [key]: value,
    });
  };

  const hideDeleteModal = () => {
    setDataDelete({
      ...dataDelete,
      visible: false,
      idDel: 0,
    });
  };

  const deleteAction = () => {
    setLoadDelete(true);
    hideDeleteModal();
    setLoadDelete(false);
  };

  const showModalDelete = (id) => {
    setDataDelete({
      id,
      visible: true,
    });
  };

  const unfilteredData = () => {
    setData({});
    setPage(1);
    searchSurveySection({ page: 1, limit: rowsPerPage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    searchSurveySection({ ...dataSearch, page: 1, limit: rowsPerPage });
  };
  return (
    <>
      <Link
        to="/survey-header/add"
        className="btn btn-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
      >
        Tạo đề mục khảo sát
      </Link>

      <div className="row">
        <div className="col-md-12">
          <div className="kt-section">
            <div className="kt-section__content">
              <Paper className={classes1.root}>
                <div className="col-md-12">
                  <Form onSubmit={handleSubmit}>
                    <div style={{ marginTop: 20, fontSize: 20 }}>
                      <label>Tìm kiếm</label>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-2">
                        <div className="form-group">
                          <InputForm
                            type="text"
                            placeholder="Tên đề mục khảo sát"
                            value={dataSearch.section_name || ""}
                            onChangeValue={(value) => {
                              onChangeValue("section_name", value);
                            }}
                            focus={true}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-3">
                        <div className="form-group" style={{ display: "flex" }}>
                          <button
                            className="btn btn-label-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
                            onClick={unfilteredData}
                            style={{ marginLeft: 10, marginTop: 3 }}
                            type="button"
                          >
                            <span>Bỏ lọc</span>
                          </button>

                          <ButtonLoading
                            type="submit"
                            className="btn btn-label-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
                            loading={isLoading}
                            style={{ marginLeft: 10, marginTop: 3 }}
                          >
                            <span>Tìm kiếm</span>
                          </ButtonLoading>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
                {isLoading ? (
                  <Loading />
                ) : (
                  <Table className={classes1.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Đề mục khảo sát</TableCell>
                        <TableCell>Tên đề mục khảo sát</TableCell>
                        <TableCell>Tiêu đề đề mục khảo sát</TableCell>
                        <TableCell>Yêu cầu bắt buộc</TableCell>
                        <TableCell style={{ width: 150 }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows && rows.length ? (
                        rows.map((row, key) => (
                          <TableRow key={`list-distri-${key}`}>
                            <TableCell>
                              {row.surveyHeader.survey_name}
                            </TableCell>
                            <TableCell>{row.section_name}</TableCell>
                            <TableCell>{row.section_title}</TableCell>
                            <TableCell>
                              {row.section_required_yn ? "Có" : "Không"}
                            </TableCell>
                            <TableCell>{formatTime(row.createdAt)}</TableCell>
                            <TableCell>
                              <div className="mg-b5">
                                <Button
                                  type="primary"
                                  size="small"
                                  className="button-center-item "
                                  onClick={() => {
                                    showModalDetail(row.id);
                                  }}
                                  icon={<InfoCircleOutlined />}
                                >
                                  Chi tiết
                                </Button>
                              </div>
                              <div className="mg-b5">
                                <Button
                                  type="primary"
                                  size="small"
                                  className="button-center-item btn-success"
                                  style={{ color: "white" }}
                                  onClick={() =>
                                    props.history.push(
                                      `/survey-sections/update/${row.id}`
                                    )
                                  }
                                  icon={<InfoCircleOutlined />}
                                >
                                  Cập nhật
                                </Button>
                              </div>
                              <div className="mg-b5">
                                <Button
                                  type="primary"
                                  size="small"
                                  className="button-center-item btn-danger"
                                  style={{ color: "white" }}
                                  onClick={() => showModalDelete(row.id)}
                                  icon={<InfoCircleOutlined />}
                                >
                                  Xóa
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={10} align="center">
                            Không có dữ liệu
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
                {total > rowsPerPage && (
                  <div className="custom-svg customSelector">
                    <Pagination
                      itemRender={itemRender}
                      className="pagination-crm"
                      current={page}
                      pageSize={rowsPerPage}
                      total={total}
                      onChange={(p) => handleChangePage(p)}
                    />
                  </div>
                )}
              </Paper>
            </div>
            <Modal
              title="Xóa đề mục khảo sát"
              visible={dataDelete.visible}
              onOk={deleteAction}
              onCancel={hideDeleteModal}
              footer={[
                <ButtonLoading
                  type="default"
                  onClick={hideDeleteModal}
                  className="btn btn-label-secondary btn-secondary"
                >
                  Đóng
                </ButtonLoading>,
                <ButtonLoading
                  className="btn btn-label-danger btn-danger"
                  onClick={deleteAction}
                  loading={isLoadDelete}
                >
                  <span>Xóa</span>
                </ButtonLoading>,
              ]}
            >
              <p>Bạn có muốn xóa đề mục khảo sát này?</p>
            </Modal>
            <Modal
              title="Chi tiết đơn hàng"
              visible={showDetail}
              onCancel={() => setShowDetail(false)}
              footer={[
                <Button type="primary" onClick={() => setShowDetail(false)}>
                  OK
                </Button>,
              ]}
            >
              <Card>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formSectionName">
                        <Form.Label className="starDanger">
                          Đề mục khảo sát
                          <Select
                            showSearch
                            value={
                              dataSurvey.surveyHeader
                                ? dataSurvey.surveyHeader.survey_name
                                : ""
                            }
                            disabled={true}
                            filterOption={false}
                            style={{ width: "100%" }}
                          >
                            {surveyName.map((u) => (
                              <Option
                                key={`child-distri-${u.survey_name}`}
                                value={u.survey_name}
                              >
                                {u.survey_name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Label>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formBasicTitle">
                        <Form.Label>Tiêu đề phần khảo sát</Form.Label>
                        <Form.Control
                          type="text"
                          disabled={true}
                          value={dataSurvey.section_name}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formBasicTitle">
                        <Form.Label>Tiêu đề phần khảo sát con</Form.Label>
                        <Form.Control
                          type="text"
                          disabled={true}
                          value={dataSurvey.section_title}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formBasicTitle">
                        <Form.Label style={{ paddingRight: "20px" }}>
                          Phần yêu cầu bắt buộc
                        </Form.Label>
                        <Radio.Group
                          disabled={true}
                          value={
                            dataSurvey.section_required_yn === 1 ? true : false
                          }
                        >
                          <Radio value={true}>Có</Radio>
                          <Radio value={false}>Không</Radio>
                        </Radio.Group>
                      </Form.Group>
                    </Form.Row>
                  </Form>
                </Card.Body>
              </Card>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps, null)(ListSurveySection);
