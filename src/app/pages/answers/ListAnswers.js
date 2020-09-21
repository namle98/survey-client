import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-restricted-imports
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
import makeRequest from "../../libs/request";
import { formatTime } from "../../libs/time";
import { Select, Radio } from "antd";
import ShowFormSurvey from "../form/ShowFormSurvey";
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

const ListAnswers = (props) => {
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

  let fakeData = [
    {
      id: 1,
      answer_text: "adfkasdhfjashdfkashdfk",
      user_id: 1,
      organization_id: 1,
    },
    {
      id: 2,
      answer_text: "ádfhaskdjfhaksjd",
      user_id: 1,
      organization_id: 2,
    },
    {
      id: 3,
      answer_text: "á dfkhasld ádfsahdfkjasd",
      user_id: 3,
      organization_id: 1,
    },
  ];

  useEffect(() => {
    searchanization({ page: 1, limit: rowsPerPage });
  }, []);

  function itemRender(current, type, originalElement) {
    return originalElement;
  }

  const searchanization = (dataSearch = {}) => {
    setLoading(true);
    setTimeout(() => {
      setRow(fakeData);
    }, 1000);
    setLoading(false);
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
        to="/form/add"
        className="btn btn-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
      >
        Tạo form
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
                            placeholder="Tên Answers"
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
                        <TableCell>Tên Answers</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell style={{ width: 150 }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows && rows.length ? (
                        rows.map((row, key) => (
                          <TableRow key={`organization-${key}`}>
                            <TableCell>{row.answer_text}</TableCell>
                            <TableCell>{row.organization_id}</TableCell>
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
                                    props.history.push(`/form/update/${row.id}`)
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
              title="Xóa form"
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
              <p>Bạn có muốn xóa câu trả lời này</p>
            </Modal>
            <Modal
              title="Chi tiết answers"
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
                  <ShowFormSurvey data={dataDetail} />
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

export default connect(mapStateToProps, null)(ListAnswers);
