/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import moment from 'moment';
import { Icon } from "@material-ui/core";
import { Button, Modal, DatePicker } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import Loading from "../loading";
import { Form, Card, Col } from "react-bootstrap";
import ButtonLoading from '../../partials/common/ButtonLoading';
import makeRequest from '../../libs/request';
import { showErrorMessage, showSuccessMessageIcon } from '../../actions/notification';
import { validateSurveyRounds } from '../../libs/utils';
import { InfoCircleOutlined } from "@ant-design/icons";
import InputForm from "../../partials/common/InputForm";
//import InputForm from "../../partials/common/InputForm";
import { makeStyles } from "@material-ui/core/styles";
import "../form/table.css";
import "../form/Form.scss";

import {
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

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
const dateFormat = 'DD/MM/YYYY';
const AddEditSurveyRounds = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [dataAdd, setData] = useState({});
  const [dataGet, setDataGetOrganization] = useState({});
  const [isSubmiting, setLoadSubmit] = useState(false);
  const surveyRoundsNameRef = useRef();
  const updateId = props.match.params.id;
  const [isLoading, setLoading] = useState(false);
  const classes1 = useStyles1();
  const [rows, setRow] = useState([]);//đúng anh
  const [datacheck, setDataCheck] = useState([]);
  const [dataGetResults, setdataGet] = useState([]);

  const rowsPerPage = 10;
  const [listSelected, setListSelected] = useState([]);
  const [page, setPage] = useState(1);
  // const [rows1, setRow] = useState([]);

  const [dataSearch1, setData1] = useState({});

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (updateId) {
      getSurveyByID(updateId);
      getOrganizationByID(updateId)
    }
    searchanization1();
    searchanization();
  }, []);


  // Seach Organization
  const onChangeValue1 = (key, value) => {
    setData1({
      ...dataSearch1,
      [key]: value,
    });
  };
  const onChangeStartDate = (date) => {
    if (date) {
      //date._d.setHours(0, 0, 0, 0);
      let dateConvert = new Date(date).toUTCString();
      setData({
        ...dataAdd,
        start_date: dateConvert
      });
    } else {
      setData({
        ...dataAdd,
        start_date: ''
      });
    }
  }

  const onChangeEndDate = (date) => {
    if (date) {
      //date._d.setHours(23, 59, 59, 0);
      let dateConvert = new Date(date).toUTCString();
      setData({
        ...dataAdd,
        end_date: dateConvert
      });
    } else {
      setData({
        ...dataAdd,
        end_date: ''
      });
    }
  }


  const unfilteredData = (e) => {
    setData1({});
    setPage(1);
    searchanization1({ page: 1, limit: rowsPerPage });
  };


  const searchanization1 = (dataSearch1 = {}) => {
    setLoading(true);
    makeRequest("get", `organization/search`, dataSearch1)
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

  const handleSubmit1 = (e) => {
    e.preventDefault();
    setPage(1);
    searchanization1({ ...dataSearch1, page: 1, limit: rowsPerPage });
  };


  const iCheck = () => {
    var el = document.getElementById('checkBoxGroups');
    // get reference to input elements in toppings container element
    var tops = el.getElementsByTagName('input');

    // assign function to onclick property of each checkbox
    for (var i = 0, len = tops.length; i < len; i++) {
      if (tops[i].type === 'checkbox') {
        if (tops[i].checked === true) {
          let btn = document.createElement("BUTTON");
          let dataId = tops[i].defaultValue;
          makeRequest('get', `organization/getbyId?id=${dataId}`).then(({ data }) => {
            if (data.signal) {
              setData(data.data);
            }
          })
          btn.innerHTML = tops[i].defaultValue;
          document.getElementById('leuleu').appendChild(btn);

        }
      }
    }
    setShowForm(false);
  }

  //

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


  const getSurveyByID = (id) => {
    makeRequest('get', `surveyrounds/getbyidSurRounds?id=${id}`).then(({ data }) => {
      if (data.signal) {
        setData(data.data.dataOrganization);
        //setDataGetOrganization(data.dataOrganization[0].organizations)
      }
    })
  }
  const getOrganizationByID = (id) => {
    makeRequest('get', `surveyrounds/getorganizationbyroundid?id=${id}`).then(({ data }) => {
      if (data.signal) {
        setListSelected(data.data.listOrganization);
        //setDataGetOrganization(data.dataOrganization[0].organizations)
      }
    })
  }
  const ShowFormList = () => {
    setShowForm(true);
    //setDataDetail(row);
  };
  const getvalueCheckbox = (id) => { // conf ddaay la bat dieu kien check

    var ListOr = [];
    var Checkes = document.getElementsByClassName('Checks')
    for (let i = 0; i < rows.length; i++) {
      if (Checkes[i].checked === true) {
        ListOr.push(Checkes[i].value)
        //console.log('1111111111111111111', Checkes[i].value)
      }
    }
    //console.log('333333333333333333', ListOr)
    makeRequest('post', `organization/getListDataOrganization`, ListOr).then(({ data }) => {
      //console.log('zzzzzzzzzzzzzzz', data)
      if (data.signal) {
        const { dataGetResult } = data.data;
        setdataGet(dataGetResult)
        //console.log('5555555555555555555555555', dataGetResult)
      } else {
        console.log(data)
      }
    })
  };
  const onChangeValue = (key, value) => {
    setData({
      ...dataAdd,
      [key]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dataAdd.title) {
      surveyRoundsNameRef.current.focus();
      return showErrorMessage('Vui lòng tên đợt khảo sát');
    }

    if (!validateSurveyRounds(dataAdd.title)) {
      surveyRoundsNameRef.current.focus();
      return showErrorMessage('Tên tên tổ chức/HTX không được chứa ký tự đặc biệt')
    }

    setLoadSubmit(true);
    if (!updateId) {
      dataAdd.listSelected = listSelected;
      makeRequest('post', `surveyrounds/createSurRounds`, dataAdd).then(({ data }) => {

        if (data.signal) {
          showSuccessMessageIcon('Thêm đợt khảo sát thành công');
          return props.history.push('/surveyround/list');
        }else{
            setLoadSubmit(false);
            return showErrorMessage('Cập nhật thất bại, ' + data.message);
        }
      })
    } else {
      dataAdd.listSelected = listSelected
      makeRequest('post', `surveyrounds/updateSurRounds`, dataAdd).then(({ data }) => {
        if (data.signal) {
          showSuccessMessageIcon('Cập nhật đợt khảo sát thành công');
          return props.history.push('/surveyround/list');
        }
        else{
            setLoadSubmit(false);
            return showErrorMessage('Cập nhật thất bại, ' + data.message);
        }
      })
    }
  }

  const Checked = (row) => {
    let listSelectedT = [...listSelected];
     let isChecked =  listSelectedT.filter(item => item.id === row.id)
     if(isChecked.length > 0){
         return true
     }
     return false;
  }
  const onClickInsertForm = (e, obj) => {

    let listSelectedTemp = [...listSelected];
    let isChecked = listSelectedTemp.filter(item => item.id === obj.id);
    if (isChecked && isChecked.length > 0) {
      listSelectedTemp = listSelectedTemp.filter(item => item.id !== obj.id);
    } else {
      listSelectedTemp.push(obj);
    }

    console.log('listSelected', listSelectedTemp);

    setListSelected(listSelectedTemp);
  }
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="kt-section">
            <Card >
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formBasicEmail">
                      <Form.Label className="starDanger">Tên đợt khảo sát</Form.Label>
                      <Form.Control
                        type="text" maxLength={255}
                        ref={surveyRoundsNameRef} placeholder="Nhập tên đợt khảo sát"
                        value={(dataAdd.title && dataAdd.title) || ''}
                        onChange={(e) => onChangeValue('title', e.target.value)} />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formBasicEmail">
                      <Form.Label className="starDanger">Ngày bắt đầu: </Form.Label>

                    </Form.Group>
                    <Form.Group as={Col}>
                      <DatePicker
                        style={{ width: 150 }}
                        //showTime={true}
                        format={dateFormat}
                        placeholder={'Thời gian bắt đầu'}
                        value={dataAdd.start_date && dataAdd.start_date && moment(dataAdd.start_date) || ''}
                        onChange={onChangeStartDate}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicEmail">
                      <Form.Label className="starDanger">Ngày Kết thúc: </Form.Label>

                    </Form.Group>
                    <Form.Group as={Col}>
                      <DatePicker
                        style={{ width: 150 }}
                        //showTime={true}
                        format={dateFormat}
                        placeholder={'Thời gian kết thúc'}
                        value={dataAdd.end_date && dataAdd.end_date && moment(dataAdd.end_date) || ''}
                        onChange={onChangeEndDate}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formBasicEmail" className="border-table-default">
                      <Button className='btn btn-primary'
                        onClick={() => {
                          ShowFormList();
                        }}
                        style={{ marginBottom: 15 }}
                      >
                        Thêm form mẫu
                      </Button>
                      <Table className={classes1.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Tên phiếu đánh giá</TableCell>
                            <TableCell>Mã code</TableCell>
                            <TableCell style={{ width: 150 }}>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {listSelected && listSelected.length ? (
                            listSelected.map((row, key) => (
                              <TableRow key={`surveyrounds-${key}`}>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.code}</TableCell>
                                <TableCell>
                                  <div className="mg-b5">
                                    <span
                                      style={{ cursor: "pointer" }}
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Xóa thông tin"
                                    >
                                      <Icon
                                        className="fa fa-trash"
                                        onClick={(e) => onClickInsertForm(e, row)}
                                        style={{
                                          color: "rgb(220, 0, 78)",
                                          fontSize: 15,
                                          marginLeft: 15,
                                        }}
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

                    </Form.Group>
                  </Form.Row>
                  <div className="kt-login__actions">
                    <Link to="/surveyround/list" style={{ marginRight: '5px' }}>
                      <button type="button" className="btn btn-secondary btn-elevate kt-login__btn-secondary">Huỷ</button>
                    </Link>
                    <ButtonLoading loading={isSubmiting} className='btn btn-primary'>
                      {!updateId ? 'Tạo' : 'Cập nhật'}
                    </ButtonLoading>
                  </div>
                </Form>
              </Card.Body>
            </Card>
            <Modal
              title="Chọn mẫu khảo sát cho đợt"
              visible={showForm}
              width='50%'
              style={{top: 30}}
              onCancel={() => setShowForm(false)}
              footer={[
                <Button type="primary" onClick={(e) => { setShowForm(false) }}>
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
                {/* <Card> */}
                  <Form onSubmit={handleSubmit1}>
                    <div className="form-row">
                      <div style={{ width: '50%', marginLeft: 10, marginTop: 10 }}  >
                        <div >
                          <InputForm
                            type="text"
                            placeholder="Tên tổ chức/HTX"
                            value={dataSearch1.title || ""}
                            onChangeValue={(value) => {
                              onChangeValue1("title", value);
                            }}
                            focus={true}
                          />

                        </div>
                      </div>
                      <div style={{ width: '50%,' }}>
                        <div className="form-group" style={{ display: "flex" }}>
                          <button
                            className="btn btn-label-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
                            onClick={unfilteredData}
                            style={{ marginLeft: 10, marginTop: 15 }}
                            type="button"
                          >
                            <span>Bỏ lọc</span>
                          </button>
                          <ButtonLoading
                            type="submit"
                            className="btn btn-label-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
                            loading={isLoading}
                            style={{ marginLeft: 10, marginTop: 15 }}
                          >
                            <span>Tìm kiếm</span>
                          </ButtonLoading>
                        </div>
                      </div>
                    </div>
                  </Form>

                  {isLoading ? (
                    <Loading />
                  ) : (

                      <Table className={classes1.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Tên form</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows && rows.length ? (
                            rows.map((row, key) => (
                              <TableRow key={`organization-${key}`}>
                                <TableCell>< input style={{ marginRight: 20 }} type="checkbox" defaultChecked={Checked(row) === true ? true : false} onClick={e => onClickInsertForm(e, row)} defaultValue={row.id} />{row.title}</TableCell>
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
                {/* </Card> */}
              </div>
            </Modal>
          </div>
        </div>
      </div >
    </>
  );
}

export default AddEditSurveyRounds;