/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { URL_COPY } from "../../config/url";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { Modal, Pagination, Button, Card } from "antd";
import { Form } from "react-bootstrap";
import InputForm from "../../partials/common/InputForm";
import { CopyOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Loading from "../loading";
import ButtonLoading from "../../partials/common/ButtonLoading";
import { connect } from "react-redux";
import makeRequest from "../../libs/request";
import {
  showErrorMessage,
  showSuccessMessageIcon,
} from "../../actions/notification";
import { formatTime } from "../../libs/time";
import "../form/table.css";
import "../form/Form.scss";


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

const ListSurveyRounds = (props) => {
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
  const [dataDetail, setDataDetail] = useState({});
  const [dataOrganization, setdataOrganization] = useState({});

  useEffect(() => {
    searchanization({ page: 1, limit: rowsPerPage });
  }, []);

  function itemRender(current, type, originalElement) {
    return originalElement;
  }

  const searchanization = (dataSearch = {}) => {
    setLoading(true);
    makeRequest("get", `surveyrounds/searchSurRounds`, dataSearch)
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

  const deleteAction = (id) => {
    setLoadDelete(true);
    hideDeleteModal();
    setLoadDelete(false);
    makeRequest("get", `surveyrounds/deleteSurRounds`, { id: dataDelete.id })
      .then(({ data }) => {
        console.log(data);
        if (data.signal) {
          showSuccessMessageIcon("Xóa thành công");
          let dataSvR = rows.filter((item) => item.id !== dataDelete.id);
          setRow(dataSvR);
          hideDeleteModal();
        }
      })
      .catch((err) => {
        showErrorMessage("Xóa thất bại");
        console.log(err);
      });
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

  const detailSurveyRounds = (row) => {
    setShowDetail(true);
    setDataDetail(row);
  };
  const getOrganizationSurveyRounds = (row) => {
    makeRequest("get", `surveyrounds/getorganizationbyround?id=${row.id}`)
      .then(({ data }) => {
        if (data.signal) {
          const { dataOrganization, total } = data.data;
          setdataOrganization(dataOrganization);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Link
        to="/surveyround/add"
        className="btn btn-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
      >
        Tạo đợt khảo sát
			</Link>

      <div className="row">
        <div className="col-md-12">
          <div className="kt-section">
            <div className="kt-section__content border-table-default">
              <Paper className={classes1.root}>
                <div className="col-md-12">
                  <Form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group col-md-5">
                        <div className="form-group">
                          <InputForm
                            type="text"
                            placeholder="Tên đợt khảo sát"
                            value={dataSearch.title || ""}
                            onChangeValue={(value) => {
                              onChangeValue("title", value);
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
                          <TableCell>Tên Đợt Khảo Sát</TableCell>
                          <TableCell>Thời gian bắt đầu</TableCell>
                          <TableCell>Thời gian kết thúc</TableCell>
                          <TableCell style={{ width: 150 }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows && rows.length ? (
                          rows.map((row, key) => (
                            <TableRow key={`surveyrounds-${key}`}>
                              <TableCell>{row.title}</TableCell>
                              <TableCell>
                                {moment(row.start_date).format("DD-MM-YYYY")}
                              </TableCell>
                              <TableCell>
                                {moment(row.end_date).format("DD-MM-YYYY")}
                              </TableCell>
                              <TableCell>
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
                                      detailSurveyRounds(row);
                                      getOrganizationSurveyRounds(row);
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
                                        `/surveyround/update/${row.id}`
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
                      onChange={(p, s) => handleChangePage(p)}
                    />
                  </div>
                )}
              </Paper>
            </div>
            <Modal
              title="Xóa Đợt Khảo Sát"
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
              <p>Bạn có muốn xóa đợt khảo sát này?</p>
            </Modal>

            <Modal
              title="Chi tiết đợt khảo sát"
              visible={showDetail}
              width='50%'
              style={{ top: 30 }}
              onCancel={() => setShowDetail(false)}
              footer={[
                <Button type="primary" onClick={() => setShowDetail(false)}>
                  OK
								</Button>,
              ]}
            >
              <div
                className="form-group border-table-default border-table-default-popup"
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                <div className="form-group">
                  <table className="table table-striped table-bordered">
                    <tbody>
                      <tr>
                        <td className="fontBold">Tên đợt khảo sát</td>
                        <td>{dataDetail.title}</td>
                      </tr>

                      <tr>
                        <td className="fontBold">Ngày bắt đầu khảo sát</td>
                        <td>{formatTime(dataDetail.start_date)}</td>
                      </tr>

                      <tr>
                        <td className="fontBold">Ngày kết thúc khảo sát</td>
                        <td>{formatTime(dataDetail.end_date)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p>Danh sách phiếu</p>
                  <Table className="table table-striped border-table-default">
                    <TableHead>
                      <TableRow>
                        <TableCell>Tên form</TableCell>
                        <TableCell>Mã Code</TableCell>
                        <TableCell>Lấy Link</TableCell>
                      </TableRow>
                    </TableHead>
                    <tbody>
                      {dataOrganization && dataOrganization.length ? (
                        dataOrganization.map((row, key) => (
                          <TableRow key={`surveyroundsorg-${key}`}>
                            <TableCell>{row.organization.title}</TableCell>
                            <TableCell>{row.organization.code}</TableCell>
                            <TableCell className="tablecell-action">
                              <CopyToClipboard
                                style={{ marginBottom: "10px"}}
                                text={
                                  `${URL_COPY}` +
                                  "formid=" +
                                  `${row.organization.id}` +
                                  "&roundid=" +
                                  `${dataDetail.id}`
                                }
                                onCopy={() => {
                                  showSuccessMessageIcon(
                                    "Copy link thành công!"
                                  );
                                }}
                              >
                                <i className="far fa-clone customIconCopy"></i>
                              </CopyToClipboard>
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
                    </tbody>
                  </Table>
                </div>
              </div>
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

export default connect(mapStateToProps, null)(ListSurveyRounds);
