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
import { Select, Radio } from "antd";
import ShowFormSurvey from "./ShowFormSurvey";
import { showSuccessMessageIcon, showErrorMessage } from "../../actions/notification";
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

  useEffect(() => {
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
    makeRequest('get', `surveyform/getbyId?id=${id}`).then(({ data }) => {
      if (data.signal) {
        let detailObj = { organization: data.data };
        detailObj.organization.survey_sections = [...data.data.survey_headers.survey_sections];
        detailObj.organization.survey_headers.survey_sections = null;
        setDataDetail(detailObj);
      }
    }).catch(err => {
      showErrorMessage(err);
    })
  };

  const onClickCancelModal = () => {
    setDataDetail();
    setShowDetail(false);
  }

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
                            placeholder="Tên form"
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
                          <TableCell>Tên form</TableCell>
                          <TableCell>Code</TableCell>
                          <TableCell style={{ width: 150 }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows && rows.length ? (
                          rows.map((row, key) => (
                            <TableRow key={`organization-${key}`}>
                              <TableCell>{row.title}</TableCell>
                              <TableCell>{row.code}</TableCell>
                              <TableCell>
                                <div className="mg-b5">
                                  <Button
                                    type="primary"
                                    size="small"
                                    className="button-center-item "
                                    onClick={(e) => {
                                      detailOrganization(e, row.id);
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
                                      props.history.push(`/form/edit/${row.id}`)
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
              width={900}
              onCancel={() => onClickCancelModal()}
              footer={[
                <Button type="primary" onClick={() => onClickCancelModal()}>
                  OK
                </Button>,
              ]}
            >
              {!dataDetail ? <Loading /> :
                <div
                  className="form-group"
                  style={{
                    height: "300px",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  <Card>
                    <ShowFormSurvey dataDetail={dataDetail} />
                  </Card>
                </div>}
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

export default connect(mapStateToProps, null)(ListForm);
