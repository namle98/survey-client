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
import { Modal, Pagination, Button, Card } from "antd";
import { Form } from "react-bootstrap";
import InputForm from "../../partials/common/InputForm";
import SelectForm from "../../partials/common/SelectForm";
import { LEVEL_DISTRIBUTOR } from "../../config/product";
import { InfoCircleOutlined } from "@ant-design/icons";
import Loading from "../loading";
import ButtonLoading from "../../partials/common/ButtonLoading";
import { connect } from "react-redux";
import makeRequest from "../../libs/request";
import {
  showErrorMessage,
  showSuccessMessageIcon,
} from "../../actions/notification";

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

const ListSurveyHeader = (props) => {
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

  useEffect(() => {
    searchSurvey({ page: 1, limit: rowsPerPage });
  }, []);

  function itemRender(originalElement) {
    return originalElement;
  }

  const searchSurvey = (dataSearch = {}) => {
    setLoading(true);
    makeRequest("get", `surveyheader/search`, dataSearch)
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
    searchSurvey({ ...dataSearch, page: newPage, limit: rowsPerPage });
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
    makeRequest("get", `surveyheader/delete`, { id: dataDelete.id })
      .then(({ data }) => {
        if (data.signal) {
          showSuccessMessageIcon("Xóa thành công");
          let dataSurvey = rows.filter((item) => item.id !== dataDelete.id);
          setRow(dataSurvey);
          hideDeleteModal();
        }
        //disableLoadRemove();
      })
      .catch((err) => {
        //disableLoadRemove();
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
    searchSurvey({ page: 1, limit: rowsPerPage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    searchSurvey({ ...dataSearch, page: 1, limit: rowsPerPage });
  };

  const detailSurvey = (row) => {
    setShowDetail(true);
    setDataDetail(row);
  };

  return (
    <>
      <Link
        to="/survey-header/add"
        className="btn btn-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
      >
        Tạo tiêu đề khảo sát
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
                            placeholder="Tên"
                            value={dataSearch.name || ""}
                            onChangeValue={(value) => {
                              onChangeValue("name", value);
                            }}
                            focus={true}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-2">
                        <div className="form-group" style={{ display: "flex" }}>
                          <InputForm
                            type="text"
                            placeholder="Email"
                            value={dataSearch.email || ""}
                            onChangeValue={(value) => {
                              onChangeValue("email", value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-2">
                        <div className="form-group" style={{ display: "flex" }}>
                          <InputForm
                            type="text"
                            placeholder="Số điện thoại"
                            value={dataSearch.mobile || ""}
                            onChangeValue={(value) => {
                              onChangeValue("mobile", value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-2">
                        <div className="form-group" style={{ display: "flex" }}>
                          <SelectForm
                            optionData={LEVEL_DISTRIBUTOR}
                            placeholder="Cấp nhà phân phối"
                            keyString="id"
                            labelString="n"
                            value={dataSearch.level || ""}
                            onChangeValue={(value) => {
                              onChangeValue("level", value);
                            }}
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
                        <TableCell>Tên tổ chức/HTX</TableCell>
                        <TableCell>Tên khảo sát</TableCell>
                        <TableCell>Thời gian tạo</TableCell>
                        <TableCell style={{ width: 150 }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows && rows.length ? (
                        rows.map((row, key) => (
                          <TableRow key={`list-distri-${key}`}>
                            <TableCell>
                              {row.organization.organization_name}
                            </TableCell>
                            <TableCell>{row.survey_name}</TableCell>
                            <TableCell>{row.createdAt}</TableCell>
                            <TableCell>
                              <div className="mg-b5">
                                <Button
                                  type="primary"
                                  size="small"
                                  className="button-center-item "
                                  onClick={() => detailSurvey(row)}
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
                                      `/survey-header/update/${row.id}`
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
                      onChange={(p, s) => handleChangePage(p)}
                    />
                  </div>
                )}
              </Paper>
            </div>
            <Modal
              title="Xóa tiêu đề khảo sát"
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
              <p>Bạn có muốn xóa tiêu đề khảo sát này?</p>
            </Modal>
            <Modal
              title="Chi tiết hợp tác xã"
              visible={showDetail}
              width={600}
              onCancel={() => setShowDetail(false)}
              footer={[
                <Button type="primary" onClick={() => setShowDetail(false)}>
                  OK
                </Button>,
              ]}
            >
              <div
                className="form-group"
                style={{
                  height: "300px",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                <Card>
                  <div className="row">
                    <div className="col-md-12">
                      <span>Mã khảo sát: {dataDetail.id}</span>
                    </div>
                    <div className="col-md-12">
                      <span>Mã cơ quan: {dataDetail.organization_id}</span>
                    </div>
                    <div className="col-md-12">
                      <span>Tên khảo sát: {dataDetail.survey_name}</span>
                    </div>
                    <div className="col-md-12">
                      <span>Hướng dẫn sử dụng: {dataDetail.instructions}</span>
                    </div>
                    <div className="col-md-12">
                      <span>
                        Thông tin tiêu đề khác: {dataDetail.other_header_info}
                      </span>
                    </div>
                    <div className="col-md-12">
                      <span>Ngày tạo: {dataDetail.createdAt}</span>
                    </div>
                    <div className="col-md-12">
                      <span>Cập nhật ngày: {dataDetail.updatedAt}</span>
                    </div>
                    <div className="col-md-12">
                      <span>
                        Hợp tác xã:{" "}
                        {dataDetail &&
                          dataDetail.organization &&
                          dataDetail.organization.organization_name}
                      </span>
                    </div>
                  </div>
                </Card>
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

export default connect(mapStateToProps, null)(ListSurveyHeader);
