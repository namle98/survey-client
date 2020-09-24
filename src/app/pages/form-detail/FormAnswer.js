import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getParameter } from "../../libs/utils";
import { Card, Steps } from "antd";
import { Col, Form } from "react-bootstrap";
import CommentBoxShow from "../../components/ShowForm/CommentBoxShow";
import GridSingleChoiseShow from "../../components/ShowForm/GridSingleChoiseShow";
import GridSingleTextShow from "../../components/ShowForm/GridSingleTextShow";
import GridTexboxShow from "../../components/ShowForm/GridTexboxShow";
import MultiChoiseShow from "../../components/ShowForm/MultiChoiseShow";
import SingleChoiseShow from "../../components/ShowForm/SingleChoiseShow";
import SingleTexboxShow from "../../components/ShowForm/SingleTexboxShow";
import GridMultiChoiseShow from "../../components/ShowForm/GridMultiChoiseShow";
import ButtonLoading from '../../partials/common/ButtonLoading';
import { showErrorMessage, showSuccessMessageIcon } from '../../actions/notification';
import {
  SINGLE_TEXTBOX,
  COMMENT_BOX,
  GRID_MULTI_CHOISE,
  GRID_SINGLE_CHOISE,
  GRID_SINGLE_TEXT,
  GRID_TEXTBOX,
  MULTI_CHOISE,
  SINGLE_CHOISE,
  GRID_MIX,
} from "../../config/common/TypeOfInput";
import GridMixShow from "../../components/ShowForm/GridMixShow";
import { numberToRomanize } from "../../libs/utils";
import makeRequest from '../../libs/request';
import "../form/table.css";
import "../form/ShowFormSurvey.scss";
import "./FormAnswer.scss";
const { Step } = Steps;

// class Logout extends Component {
const FormAnswer = (props) => {
  const [step, setStep] = useState(1);
  const [organization, setOrganization] = useState(null);
  const [roundItem, setRoundItem] = useState(null);
  const [infoUser, setInfoUser] = useState({});

  const getFormById = (formId) => {
    makeRequest('get', `surveyform/getbyId?id=${formId}`).then(({ data }) => {
      if (data.signal) {
        if (!data.data) return;
        data.data.survey_headers.survey_sections = 
        data.data.survey_headers.survey_sections.sort((a,b) => {return a.index - b.index});
        data.data.survey_headers.survey_sections = data.data.survey_headers.survey_sections.map(item => {
          item.questions = item.questions.sort((a,b) => {return a.index - b.index});
          return item;
        });

        setOrganization(data.data);
      }
    });
  };

  const getroundById = (roundId) => {
    makeRequest('get', `surveyrounds/getbyidSurRounds?id=${roundId}`).then(({ data }) => {
      if (data.signal) {
        if (!data.data) return;
        setRoundItem(data.data);
        let formId = getParameter('formid');
        if (formId) {
          getFormById();
        }
      }
    });
  };

  const componentDidMount = () => {
    let roundIdParam = getParameter('roundid');
    // if (roundid) {
    //   getroundById(roundId);
    // }
    let formIdParam = getParameter('formid');
    setInfoUser({
      ...infoUser,
      organization_id: formIdParam,
      round_id: roundIdParam
    });

    if (formIdParam) {
      getFormById(formIdParam);
    }
  }

  useEffect(componentDidMount, []);

  const onChangeValue = (key, newValue) => {
    setInfoUser({
      ...infoUser,
      [key]: newValue
    });
  }

  const handleSubmitInfoUser = (e) => {
    e.preventDefault();

    if (!infoUser.name) {
      return showErrorMessage('Vui lòng nhập tên');
    }

    if (!infoUser.email) {
      return showErrorMessage('Vui lòng nhập email hoặc username');
    }

    if (!infoUser.organization_id || !infoUser.round_id) {
      return showErrorMessage('Link khảo sát bị lỗi');
    }

    makeRequest('post', `user/create-user-form`, infoUser).then(({ data }) => {
      if (!data.signal) {
        return showErrorMessage('error', data.message);
      } 
      setInfoUser({
        ...infoUser,
        ...data.data
      });
      setStep(2);
    });
  };

  const submitForm = () => {
    let body = {
      infoUser: {
        user_id: infoUser.id,
        survey_round_id: infoUser.round_id,
        organization_id: infoUser.organization_id,
      },
      organization: {...organization}
    };
    makeRequest('post', `answers/createanswerform`, body).then(({ data }) => {
      if (!data.signal) {
        return showErrorMessage('error', data.message);
      } 
      showSuccessMessageIcon('Gửi thành công');
      setTimeout(() => { window.location.reload(false); }, 2000);
    });
  }

  return (
    <>
      <Card className="answer-form" style={{height: step === 1 ? 'inherit' : 'auto'}}>
        <div className="row">
          <div className="col-md-12">
            <div className="kt-section">
              <Card >
                <Steps current={step - 1}>
                  <Step title="Điền thông tin" description="Nhập tên người khảo sát" />
                  <Step title="Khảo sát" description="Nhập thông tin khảo sát!" />
                </Steps>
              </Card>
            </div>
          </div>
        </div>
        {
          step === 1 &&
          <div className="row">
            <div className="col-md-12">
              <div className="kt-section form-view-detail-answer">
                <Card>
                  <div id="source-html">
                    <div className="org_head survey_headers info-user">
                      <Form onSubmit={handleSubmitInfoUser}>
                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label className="starDanger">Họ và Tên</Form.Label>
                            <Form.Control
                              type="text" maxLength={255}
                              value={infoUser.name}
                              onChange={(e) => onChangeValue('name', e.target.value)} />
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label className="starDanger">Email hoặc Username</Form.Label>
                            <Form.Control
                              type="text" maxLength={255}
                              value={infoUser.email}
                              onChange={(e) => onChangeValue('email', e.target.value)} />
                          </Form.Group>
                        </Form.Row>
                        {/* <Form.Row>
                          <Form.Group as={Col}>
                              <Form.Label className="starDanger">Chức Vụ</Form.Label>
                              <Form.Control
                                  type="text" maxLength={255}
                                  value={infoUser.name || ''}
                                  onChange={(e) => onChangeValue('name', e.target.value)} />
                          </Form.Group>
                      </Form.Row> */}
                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label>Điện Thoại</Form.Label>
                            <Form.Control
                              type="text" maxLength={255}
                              value={infoUser.mobile}
                              onChange={(e) => onChangeValue('mobile', e.target.value)} />
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label>Điạ chỉ</Form.Label>
                            <Form.Control
                              type="text" maxLength={255}
                              value={infoUser.address || ''}
                              onChange={(e) => onChangeValue('address', e.target.value)} />
                          </Form.Group>
                        </Form.Row>             <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label>Mã Tỉnh (nếu có)</Form.Label>
                            <Form.Control
                              type="text" maxLength={255}
                              value={infoUser.city}
                              onChange={(e) => onChangeValue('city', e.target.value)} />
                          </Form.Group>
                        </Form.Row>
                        <div className="kt-login__actions info-user-action">
                          <ButtonLoading className='btn btn-primary'>
                            Tiếp Tục
                          </ButtonLoading>
                        </div>
                      </Form>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        }
        {
          organization && step === 2 &&
          <div className="row">
            <div className="col-md-12">
              <div className="kt-section form-view-detail-answer">
                <Card>
                  <div id="source-html">
                    <div className="org_head survey_headers">

                      <div>
                        <h3 className="title-form">{organization.survey_headers.title}</h3>
                      </div>

                      <div>
                        <h3 className="name-of-topic">{organization.survey_headers.description}</h3>
                      </div>

                      <div className="instro-of-form">
                        <div className="instro-content" >
                          <pre className="instro-pre">{organization.survey_headers.introduction}</pre>
                        </div>
                      </div>

                    </div>
                    <div className="survey_sections">
                      {organization.survey_headers.survey_sections &&
                        organization.survey_headers.survey_sections.map((e, idx) => {
                          return (
                            <>
                              <div
                                style={{
                                  fontSize: "20px",
                                  font: "bold",
                                  marginTop: "20px",
                                  fontWeight: 700,
                                }}
                              >
                                {numberToRomanize(idx + 1)}. {e.title}
                              </div>
                              {e.questions.reverse().map((item, i) => {
                                switch (item.input_type_id) {
                                  case COMMENT_BOX:
                                    return (
                                      <div
                                        className="question-form-detail"
                                        key={item.id}
                                      >
                                        <CommentBoxShow index={i} data={item} isEnable={true} />
                                      </div>
                                    );
                                  case GRID_TEXTBOX:
                                    return (
                                      <div
                                        className="question-form-detail"
                                        key={item.id}
                                      >
                                        <GridTexboxShow index={i} data={item} isEnable={true} />
                                      </div>
                                    );
                                  case SINGLE_TEXTBOX:
                                    return (
                                      <div
                                        className="question-form-detail"
                                        key={item.id}
                                      >
                                        <SingleTexboxShow index={i} data={item} isEnable={true} />
                                      </div>
                                    );
                                  case GRID_SINGLE_CHOISE:
                                    return (
                                      <div
                                        className="question-form-detail"
                                        key={item.id}
                                      >
                                        <GridSingleChoiseShow index={i} data={item} isEnable={true} />
                                      </div>
                                    );
                                  case GRID_MULTI_CHOISE:
                                    return (
                                      <div
                                        className="question-form-detail"
                                        key={item.id}
                                      >
                                        <GridMultiChoiseShow index={i} data={item} isEnable={true} />
                                      </div>
                                    );
                                  case GRID_SINGLE_TEXT:
                                    return (
                                      <div
                                        className="question-form-detail"
                                        key={item.id}
                                      >
                                        <GridSingleTextShow index={i} data={item} isEnable={true} />
                                      </div>
                                    );
                                  case MULTI_CHOISE:
                                    return (
                                      <div
                                        className="question-form-detail"
                                        key={item.id}
                                      >
                                        <MultiChoiseShow index={i} data={item} isEnable={true} />
                                      </div>
                                    );
                                  case SINGLE_CHOISE:
                                    return (
                                      <div
                                        className="question-form-detail"
                                        key={item.id}
                                      >
                                        <SingleChoiseShow index={i} data={item} isEnable={true} />
                                      </div>
                                    );
                                  case GRID_MIX:
                                    return (
                                      <div
                                        className="question-form-detail"
                                        key={item.id}
                                      >
                                        <GridMixShow index={i} data={item} isEnable={true} />
                                      </div>
                                    );
                                  default:
                                    return null;
                                }
                              })}
                            </>
                          );
                        })}
                    </div>
                  </div>
                  <div className="kt-login__actions info-user-action form-submit">
                    <ButtonLoading className='btn btn-primary' onClick= {() => submitForm()}>
                      Gửi
                    </ButtonLoading>
                  </div>
                </Card>
              </div>
            </div>
          </div>

        }
      </Card>
    </>
  );
}
export default connect(null, null)(FormAnswer);
