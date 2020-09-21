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

const ListOrganization = (props) => {
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
    searchanization({ page: 1, limit: rowsPerPage });
  }, []);

  function itemRender(current, type, originalElement) {
    return originalElement;
  }

  const searchanization = (dataSearch = {}) => {
    setLoading(true);
    makeRequest("get", `organization/search`, dataSearch)
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
    makeRequest("get", `organization/delete`, { id: dataDelete.id })
      .then(({ data }) => {
        if (data.signal) {
          showSuccessMessageIcon("Xóa thành công");
          let dataOrg = rows.filter((item) => item.id !== dataDelete.id);
          setRow(dataOrg);
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

  const detailOrganization = (row) => {
    setShowDetail(true);
    setDataDetail(row);
  };

  return (
    <>
      <Link
        to="/organizations/add"
        className="btn btn-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
      >
        Tạo tổ chức/HTX
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
                            placeholder="Tên tổ chức/HTX"
                            value={dataSearch.organization_name || ""}
                            onChangeValue={(value) => {
                              onChangeValue("organization_name", value);
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
                        <TableCell>Tên tổ chức/HTX</TableCell>
                        <TableCell>Thời gian tạo</TableCell>
                        <TableCell style={{ width: 150 }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows && rows.length ? (
                        rows.map((row, key) => (
                          <TableRow key={`organization-${key}`}>
                            <TableCell>{row.organization_name}</TableCell>
                            <TableCell>{row.createdAt}</TableCell>
                            <TableCell>
                              <div className="mg-b5">
                                <Button
                                  type="primary"
                                  size="small"
                                  className="button-center-item "
                                  onClick={() => {
                                    detailOrganization(row);
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
                                      `/organizations/update/${row.id}`
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
              title="Xóa tổ chức/HTX"
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
              <p>Bạn có muốn xóa tổ chức/HTX này?</p>
            </Modal>
            <Modal
              title="Chi tiết tổ chức/HTX"
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
                      <span>Mã tổ chức HTX: {dataDetail.id}</span>
                    </div>
                    <div className="col-md-12">
                      <span>
                        Tên tổ chức HTX: {dataDetail.organization_name}
                      </span>
                    </div>
                    <div className="col-md-12">
                      <span>Tổ chức HTX tạo ngày: {dataDetail.createdAt}</span>
                    </div>
                    <div className="col-md-12">
                      <span>
                        Tổ chức HTX cập nhật ngày: {dataDetail.updatedAt}
                      </span>
                    </div>
                    <div className="col-md-12">
                      <span>
                        Tổ chức HTX tạo bởi:
                        {dataDetail.createdBy != null
                          ? dataDetail.createdBy
                          : ""}
                      </span>
                    </div>
                    <div className="col-md-12">
                      <span>
                        Tổ chức HTX cập nhật bởi:
                        {dataDetail.updatedBy != null
                          ? dataDetail.updatedBy
                          : ""}
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

export default connect(mapStateToProps, null)(ListOrganization);
