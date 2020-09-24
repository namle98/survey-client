/* eslint-disable no-restricted-imports */
import React, { useState } from "react";
import { connect } from "react-redux";
import SurveyHeader from "../../components/Header/SurveyHeader";
import SurveySection from "../../components/surveySection/SurveySection";
import { showErrorMessage, showSuccessMessageIcon } from "../../actions/notification";
import Organization from "../../components/Organization/Organization";
import makeRequest from '../../libs/request';
import Loading from '../loading';
import { Card } from "react-bootstrap";
import { Steps } from 'antd';
import { generateRandomCode } from '../../libs/random';
import './Form.scss';
import './table.css';
const { Step } = Steps;
const surveyTemp = {
  organization: {
    title: "",
    type: 0,
    survey_headers: {
      title: "",
      description: "",
      introduction: "",
    },
    survey_sections: [
      {
        id: 'abcdefgh',
        title: "Đề mục",
        note: "",
        type: 1,
        lastQuesId: 1,
        questions: [
          {
            id: 1,
            title: "Tiêu đề câu hỏi",
            note: "",
            input_type_id: 1,
          },
        ],
      },
    ]
  }
};

const surveySectionTemp = {
  title: "Đề mục",
  note: "",
  type: 1,
  lastQuesId: 1,
  questions: [
    {
      id: 1,
      title: "Tiêu đề câu hỏi",
      note: "",
      input_type_id: 1,
    },
  ],
}

const questionTemp = {
  title: "Tiêu đề câu hỏi",
  note: "",
  input_type_id: 1,
}

const AddForm = (props) => {
  console.log('vaoooooooooooooo')
  const [isLoadSubmit, setLoadSubmit] = useState(false);
  const [step, setStep] = useState(1);
  const [surveyContent, setSurveyContent] = useState(surveyTemp);
  //const [dataSend, setDataSend] = useState({});
  let dataSend = {};

  const onChangeHeader = (e, key) => {
    e = window.event || e;
    e.preventDefault();

    let organization = surveyContent.organization;
    organization.survey_headers[key] = e.target.value;
    setSurveyContent({
      ...surveyContent,
      organization,
    });
  };

  const onChangeHeaderForm = (value, key) => {
    let organization = surveyContent.organization;
    organization[key] = value;
    setSurveyContent({
      ...surveyContent,
      organization,
    });
  };

  const passStep1 = () => {
    if (!surveyContent.organization.title) {
      return showErrorMessage("Vui lòng nhập tiêu đề form");
    }

    if (!surveyContent.organization.type) {
      return showErrorMessage("Vui lòng chọn loại form");
    }
    setStep(2);
  };

  const passStep2 = () => {
    if (!surveyContent.organization.survey_headers) {
      return showErrorMessage("Vui lòng nhập đầy đủ thông tin");
    }

    if (!surveyContent.organization.survey_headers.title) {
      return showErrorMessage("Vui lòng nhập tiêu đề");
    }

    if (!surveyContent.organization.survey_headers.description) {
      return showErrorMessage("Vui lòng nhập miêu tả");
    }

    if (!surveyContent.organization.survey_headers.introduction) {
      return showErrorMessage("Vui lòng nhập hướng dẫn");
    }
    setStep(3);
  };

  const backStep = (step) => {
    setStep(step);
  };

  const saveSurveySection = (surveySection) => {
    dataSend = surveyTemp;
    dataSend.organization.survey_sections = surveySection;
  };


  const onAddQuestionToSection = (idxSec) => {
    let organization = { ...surveyContent };
    organization.organization.survey_sections[idxSec].questions.push(questionTemp);
    setSurveyContent(organization);
  }

  const onUpdateQuestionFromSection = (question, idxSec, idxQues) => {
    let organization = { ...surveyContent };
    organization.organization.survey_sections[idxSec].questions[idxQues] = question;
    setSurveyContent(organization);
  }

  const onChangeTypeQues = (type, idxSec, idxQues) => {
    let organization = { ...surveyContent };
    organization.organization.survey_sections[idxSec].questions[idxQues].input_type_id = type;
    setSurveyContent(organization);
  }

  const addSection = () => {
    let organization = { ...surveyContent };
    let sectionAdd = {...surveySectionTemp};
    sectionAdd.id = generateRandomCode(6);
    organization.organization.survey_sections.push(sectionAdd);
    setSurveyContent(organization);
  }

  const saveForm = (e) => {
    e = window.event || e;
    e.preventDefault();
    setLoadSubmit(true);
    makeRequest('post', `surveyform/create`, surveyContent).then(({ data }) => {
      if (data.signal) {
        showSuccessMessageIcon('Thêm form thành công');
        return props.history.push('/form/list');
      }
      setLoadSubmit(false);
    }).catch(err => {
      setLoadSubmit(false);
      return showErrorMessage('Thêm form thất bại, ' + err);
    })
  }

  const onChangeSurveyTitle = (value, idxSection) => {
    let organization = { ...surveyContent };
    organization.organization.survey_sections[idxSection].title = value;
    setSurveyContent(organization);
  }

  if (isLoadSubmit) return <Loading />

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="kt-section">
            <Card >
              <Card.Body>
                <Steps current={step - 1}>
                  <Step title="Tên Form" description="Nhập tên form khảo sát!" />
                  <Step title="Tiêu Đề Form" description="Nhập tên form header!" />
                  <Step title="Câu hỏi" description="Khởi tạo các câu hỏi" />
                </Steps>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="kt-section">
            <Card >
              <Card.Body>
                {step === 1 && (
                  <>
                    <Organization
                      formHeader={surveyContent}
                      onChangeHeaderForm={onChangeHeaderForm}
                    />
                    <div style={{ paddingTop: "20px" }}>
                      <button onClick={passStep1} className="btn btn-primary">
                        Tiếp tục
                      </button>
                    </div>
                  </>
                )
                }
                {
                  step === 2 && (
                    <>
                      <SurveyHeader
                        survey_headers={surveyContent.organization.survey_headers}
                        onChangeHeader={onChangeHeader}
                      />
                      <div style={{ paddingTop: "20px" }}>
                        <button onClick={() => backStep(1)} className="btn btn-secondary">
                          Quay lại
                        </button>
                        <button
                            onClick={passStep2}
                            className="btn btn-primary"
                            style={{ marginLeft: "25px" }}
                          >
                            Tiếp tục
                        </button>
                      </div>
                    </>
                  )
                }
                {
                  step === 3 && (
                    <>
                      {surveyContent.organization && surveyContent.organization.survey_sections ? surveyContent.organization.survey_sections.map((item, idx) => {
                        return (
                          <Card className="card-survey-section" >
                            <Card.Body>
                              <div className="row median-line" key={`section-${item.id}-${item.unique}`}>
                                <SurveySection
                                  surveySection={item}
                                  addQuestion={onAddQuestionToSection}
                                  saveSurveySection={saveSurveySection}
                                  idxSection={idx}
                                  saveQuestion={onUpdateQuestionFromSection}
                                  onChangeTypeQues={onChangeTypeQues}
                                  onChangeSurveyTitle={onChangeSurveyTitle}
                                />
                              </div>
                            </Card.Body>
                          </Card >
                        );
                      }) : null}

                      <div style={{ paddingTop: "20px" }}>
                        <button onClick={() => backStep(2)} className="btn btn-secondary" style={{ marginRight: '10px' }}>
                          Quay lại
                        </button>
                        <button onClick={addSection} className="btn btn-success" style={{ marginRight: '10px' }}>
                          Thêm đề mục
                        </button>
                        <button onClick={(e) => saveForm(e)} className="btn btn-primary">
                          Lưu form
                        </button>
                      </div>

                    </>
                  )
                }
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps, null)(AddForm);
