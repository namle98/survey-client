import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-restricted-imports
import { makeStyles } from "@material-ui/core/styles";
import { Icon } from "@material-ui/core";
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
import { Card } from "react-bootstrap";
import {
  InfoCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Loading from "../loading";
import ButtonLoading from "../../partials/common/ButtonLoading";
import makeRequest from "../../libs/request";
import ShowFormSurvey from "./ShowFormSurvey";
import {
  showSuccessMessageIcon,
  showErrorMessage,
} from "../../actions/notification";
import "./table.css";
import "./Form.scss";
import FormSurveyExport from "../../components/ShowFormToExportWord/FormSurveyExport";

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

const ListForm = (props) => {
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
  const [dataDetail, setDataDetail] = useState();
  const [dataDetailExport, setDataDetailExport] = useState();

  let checkData = [];
  useEffect(() => {
    // if (dataDetailExport) {
    //   exportToWord(dataDetailExport.organization.title);
    // }
    searchanization({ page: 1, limit: rowsPerPage });
  }, []);

  function itemRender(current, type, originalElement) {
    return originalElement;
  }

  const searchanization = (dataSearch = {}) => {
    setLoading(true);

    makeRequest("get", `surveyform/search`, dataSearch)
      .then(({ data }) => {
        if (data.signal) {
          const { count, rows } = data.data;
          setRow(rows);
          setTotal(count);
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
    searchanization({ ...dataSearch, page: newPage, limit: rowsPerPage });
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
    makeRequest("get", `surveyform/delete`, { id: dataDelete.id })
      .then(({ data }) => {
        if (data.signal) {
          showSuccessMessageIcon("Xóa form thành công");
          searchanization({ page: 1, limit: rowsPerPage });
          hideDeleteModal();
        }
        setLoadDelete(false);
      })
      .catch((err) => {
        showErrorMessage("Xóa form thất bại");
        console.log(err);
      });
    setLoadDelete(false);
  };

  const showModalDelete = (id) => {
    setDataDelete({
      id,
      visible: true,
    });
  };

  const unfilteredData = (e) => {
    setData({});
    setPage(1);
    searchanization({ page: 1, limit: rowsPerPage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    searchanization({ ...dataSearch, page: 1, limit: rowsPerPage });
  };

  const detailOrganization = (e, id) => {
    e = window.event || e;
    e.preventDefault();
    setShowDetail(true);
    makeRequest("get", `surveyform/getbyId?id=${id}`)
      .then(({ data }) => {
        if (data.signal) {
          let detailObj = { organization: data.data };
          detailObj.organization.survey_sections = [
            ...data.data.survey_headers.survey_sections,
          ];
          detailObj.organization.survey_headers.survey_sections = null;
          detailObj.organization.survey_sections.sort((a, b) =>
            a.index > b.index ? 1 : -1
          );

          for (
            let i = 0;
            i < detailObj.organization.survey_sections.length;
            i++
          ) {
            detailObj.organization.survey_sections[i].questions.sort((a, b) =>
              a.index > b.index ? 1 : -1
            );
            for (
              let j = 0;
              j < detailObj.organization.survey_sections[i].questions.length;
              j++
            ) {
              detailObj.organization.survey_sections[i].questions[
                j
              ].question_choise.sort((a, b) => (a.index > b.index ? 1 : -1));
              detailObj.organization.survey_sections[i].questions[
                j
              ].question_columns.sort(function(a, b) {
                return a.speed - b.speed;
              });
              detailObj.organization.survey_sections[i].questions[
                j
              ].question_row.sort((a, b) => (a.index > b.index ? 1 : -1));
            }
          }
          setDataDetail(detailObj);
        }
      })
      .catch((err) => {
        showErrorMessage(err);
      });
  };

  const onClickCancelModal = () => {
    setDataDetail();
    setShowDetail(false);
  };

  const hanldeDetail = (id) => {
    makeRequest("get", `surveyform/getbyId?id=${id}`)
      .then(({ data }) => {
        if (data.signal) {
          let detailObj = { organization: data.data };
          detailObj.organization.survey_sections = [
            ...data.data.survey_headers.survey_sections,
          ];
          detailObj.organization.survey_headers.survey_sections = null;
          detailObj.organization.survey_sections.sort((a, b) =>
            a.index > b.index ? 1 : -1
          );

          for (
            let i = 0;
            i < detailObj.organization.survey_sections.length;
            i++
          ) {
            detailObj.organization.survey_sections[i].questions.sort((a, b) =>
              a.index > b.index ? 1 : -1
            );
            for (
              let j = 0;
              j < detailObj.organization.survey_sections[i].questions.length;
              j++
            ) {
              detailObj.organization.survey_sections[i].questions[
                j
              ].question_choise.sort((a, b) => (a.index > b.index ? 1 : -1));
              detailObj.organization.survey_sections[i].questions[
                j
              ].question_columns.sort(function(a, b) {
                return a.speed - b.speed;
              });
              detailObj.organization.survey_sections[i].questions[
                j
              ].question_row.sort((a, b) => (a.index > b.index ? 1 : -1));
            }
          }
          checkData = detailObj;
          setDataDetailExport(detailObj);
        }
      })
      .then(() => {
        if (checkData) {
          exportToWord(checkData.organization.title);
        }
      })
      .catch((err) => {
        showErrorMessage(err);
      });
  };

  const exportToWord = (filename = "") => {
    var header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    var footer = "</body></html>";
    var html =
      header + document.getElementById("source-html").innerHTML + footer;
    var blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });
    // var url =
    //   "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);
    var url = URL.createObjectURL(blob);
    filename = filename ? filename + ".doc" : "document.doc";
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.click();
    }
    document.body.removeChild(downloadLink);
    setDataDetailExport();
    setShowDetail(false);
  };

  return (
    <>
      <Link
        to="/form/add"
        className="btn btn-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
      >
        Tạo form
      </Link>
      <div className="row">
        <div className="col-md-12">
          <div className="kt-section">
            <div className="kt-section__content border-table-default">
              <Paper className={classes1.root}>
                <div className="col-md-12">
                  <Form onSubmit={handleSubmit}>
                    <div style={{ marginTop: 20, fontSize: 20 }}></div>
                    <div className="form-row">
                      <div className="col-md-5">
                        <InputForm
                          type="text"
                          placeholder="Tên form"
                          value={dataSearch.title || ""}
                          onChangeValue={(value) => {
                            onChangeValue("title", value);
                          }}
                          focus={true}
                        />
                      </div>
                      <div className="col-md-3">
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
                  <div className="col-md-12">
                    <Table className={classes1.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Tên form</TableCell>
                          <TableCell>Code</TableCell>
                          <TableCell style={{ width: 150 }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows && rows.length ? (
                          rows.map((row, key) => (
                            <TableRow key={`organization-${key}`}>
                              <TableCell className="button-action-table">
                                {row.title}
                              </TableCell>
                              <TableCell>{row.code}</TableCell>
                              <TableCell>
                                <div className="mg-b5">
                                  <span
                                    style={{ cursor: "pointer" }}
                                    d
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Xem chi tiết"
                                  >
                                    <Icon
                                      className="fa fa-file"
                                      onClick={(e) => {
                                        detailOrganization(e, row.id);
                                      }}
                                      style={{
                                        color: "#0000ff",
                                        fontSize: 15,
                                        marginLeft: 15,
                                      }}
                                    />
                                  </span>
                                  <span
                                    style={{ cursor: "pointer" }}
                                    d
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Sửa thông tin"
                                  >
                                    <Icon
                                      className="fa fa-pen"
                                      onClick={() =>
                                        props.history.push(
                                          `/form/edit/${row.id}`
                                        )
                                      }
                                      style={{
                                        color: "#ffa800",
                                        fontSize: 15,
                                        marginLeft: 15,
                                      }}
                                    />
                                  </span>
                                  <span
                                    style={{ cursor: "pointer" }}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Xóa thông tin"
                                  >
                                    <Icon
                                      className="fa fa-trash"
                                      onClick={(e) => showModalDelete(row.id)}
                                      style={{
                                        color: "rgb(220, 0, 78)",
                                        fontSize: 15,
                                        marginLeft: 15,
                                      }}
                                    />
                                  </span>
                                  <span
                                    style={{ cursor: "pointer" }}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Xuất File"
                                  >
                                    <Icon
                                      className="far fa-file-word"
                                      style={{
                                        color: "#0000ff",
                                        fontSize: 15,
                                        marginLeft: 15,
                                      }}
                                      onClick={() => hanldeDetail(row.id)}
                                    />
                                  </span>
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
                  </div>
                )}
                {total > rowsPerPage && (
                  <div className="custom-svg customSelector">
                    <Pagination
                      itemRender={itemRender}
                      className="pagination-crm"
                      current={page}
                      pageSize={rowsPerPage}
                      total={total}
                      onChange={(p, s) => handleChangePage(p)}
                    />
                  </div>
                )}
              </Paper>
            </div>
            <Modal
              title="Xóa form"
              visible={dataDelete.visible}
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
              <p>Bạn có muốn xóa form này?</p>
            </Modal>
            <Modal
              title="Chi tiết form"
              visible={showDetail}
              width="280mm"
              style={{ top: 20 }}
              onCancel={() => onClickCancelModal()}
              footer={[
                <Button type="primary" onClick={() => onClickCancelModal()}>
                  OK
                </Button>,
              ]}
              className="modal-model-detail-form"
            >
              {!dataDetail ? (
                <Loading />
              ) : (
                <div className="form-group form-view-detail">
                  <Card>
                    <ShowFormSurvey dataDetail={dataDetail} />
                    {/* <FormSurveyExport dataDetail={dataDetail} /> */}
                  </Card>
                </div>
              )}
            </Modal>
          </div>
          <FormSurveyExport dataDetail={dataDetailExport} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps, null)(ListForm);
