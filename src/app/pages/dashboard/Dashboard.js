import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import ApexCharts from "react-apexcharts";
import makeRequest from '../../libs/request';
import { Select, Spin } from 'antd';
import { Card } from "react-bootstrap";
import Loading from '../loading';
import { Link } from 'react-router-dom';
const { Option } = Select;

const Dashboard = (props) => {

  const [listDataLabel, setListDataLabel] = useState([]);
  const [listData, setListData] = useState([]);
  const [totalForm, setTotalForm] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [dataSearch, setDataSearch] = useState('');
  const [isSearchRound, setIsSearchRound] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [listSurvey, setListSurvey] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    searchSurveyHeader('');
    getInfoDashboard();
  }, []);

  const getSeries = [
    {
      name: 'Số người tham gia',
      data: [...listData]
    }
  ];

  const getOptions = {
    chart: {
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      categories: [...listDataLabel],
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return `${value} người`;
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
        },
      },
    }
  };

  const getInfoDashboard = (id) => {
    setLoading(true);
    makeRequest('get', `report/getUserOrgan?id=${id}`).then(({ data }) => {
      if (data.signal) {
        setListDataLabel(data.data.listForm);
        setListData(data.data.listUserAnswer);
        setTotalForm(data.data.totalForm);
        setTotalUser(data.data.totalUser);
      }
      setLoading(false);
    })
  }

  const searchSurveyHeader = (value) => {
    setListSurvey([]);
    setIsSearchRound(true);
    makeRequest("get", `surveyrounds/searchSurRounds`, {
      title: value,
      limit: 10,
    })
      .then(({ data }) => {
        if (data.signal) {
          let arrSurRound = data.data.rows.map((it) => {
            return {
              label: `${it.title}`,
              value: it.id,
            };
          });

          setListSurvey(arrSurRound);
          setIsSearchRound(false);
          setTextSearch(value);
        }
      })
      .catch((err) => {
        console.log("++++++++++++++++", err);
      });
  };

  const onChangeSurveyRound = (value) => {
    getInfoDashboard(value);
    setDataSearch(value);
    // if (value) {
    // 	setData({
    // 		...dataAdd,
    // 		survey_header_id: value,
    // 	});
    // }
  };


  const fakeData = (e) => {
    e = window.event || e;
    e.preventDefault();
    makeRequest('get', 'report/fakeData').then(({ data }) => {
      if (data.signal) {
        alert('Fake data thành công');
      }
    }).catch(err => {
      alert('Fake failed', err)
    })
  }

  return <div className="row">
    <div className="col-md-12">
      <div className="kt-section">
        <Card>
          <Card.Body>
            <Select
              showSearch
              value={dataSearch || "Chọn đợt khảo sát"}
              notFoundContent={
                isSearchRound ? (
                  <Spin size="small" />
                ) : textSearch ? (
                  "Không có dữ liệu"
                ) : null
              }
              filterOption={false}
              onSearch={searchSurveyHeader}
              onChange={onChangeSurveyRound}
              style={{ width: "100%" }}
              // onClick={searchSurveyHeader('')}
            >
              {listSurvey.map((u) => (
                <Option
                  key={`child-distri-${u.value}`}
                  value={u.value}
                >
                  {u.label}
                </Option>
              ))}
            </Select>
            {isLoading ? <Loading /> : <>
              <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="card card-custom bg-success gutter-b" style={{ height: '150px' }}>
                        <div className="card-body">
                          <i className="flaticon2-analytics-2 text-white icon-2x"> </i>
                          <div className="text-inverse-success font-weight-bolder font-size-h2 mt-3">{totalForm || 0}</div>
                          <Link href="#" className="text-inverse-success font-weight-bold font-size-lg mt-1">Tổng số form trong đợt</Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="card card-custom bg-primary gutter-b" style={{ height: '150px' }}>
                        <div className="card-body">
                          <i className="flaticon2-shopping-cart-1 text-white icon-2x"> </i>
                          <div className="text-inverse-success font-weight-bolder font-size-h2 mt-3"> {totalUser || 0} </div>
                          <Link href="#" className="text-inverse-success font-weight-bold font-size-lg mt-1">Tổng số người tham gia</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="chart">
                <ApexCharts options={getOptions} series={getSeries} type="bar" height={350} />
              </div>
            </>}
            {/* <button className="btn btn-primary" onClick={(e) => fakeData(e)}>Fake Data</button> */}
          </Card.Body>
        </Card>
      </div>
    </div>
  </div>
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

export default connect(mapStateToProps, null)(Dashboard);
