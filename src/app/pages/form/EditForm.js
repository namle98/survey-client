/* eslint-disable no-restricted-imports */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SurveyHeader from "../../components/Header/SurveyHeader";
import SurveySection from "../../components/surveySection/SurveySection";
import { showErrorMessage, showSuccessMessageIcon } from "../../actions/notification";
import Organization from "../../components/Organization/Organization";
import makeRequest from '../../libs/request';
import Loading from '../loading';
import { Card } from "react-bootstrap";

const surveySectionTemp = {
    id: 1,
    title: "Đề mục",
    note: "",
    type: 1,
    lastQuesId: 1,
    questions: [
        {
            id: 1,
            title: "test title",
            note: "",
            input_type_id: 1,
        },
    ],
}

const questionTemp = {
    title: "test title",
    note: "",
    input_type_id: 1,
}

const EditForm = (props) => {
    const [isLoadSubmit, setLoadSubmit] = useState(false);
    const [step, setStep] = useState(1);
    const [surveyContent, setSurveyContent] = useState();
    const updateId = props.match.params.id;

    useEffect(() => {
        if (updateId) {
            getFormById();
        }
    }, []);

    const getFormById = () => {
        makeRequest('get', `surveyform/getbyId?id=${updateId}`).then(({ data }) => {
            if (data.signal) {
                let dataUpdate = { organization: data.data };
                dataUpdate.organization.survey_sections = data.data.survey_headers.survey_sections;
                dataUpdate.organization.survey_headers.survey_sections = null;
                console.log('dataUpdate', dataUpdate);
                setSurveyContent(dataUpdate);
            }
        })
    }

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

        console.log('surveyContent.organization.type', surveyContent.organization.type)
        if (!surveyContent.organization.type) {
            return showErrorMessage("Vui lòng nhập loại form giá trị 1 hoặc 2");
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

    const saveQuestion = (survey_sections) => {
        let organization = { ...surveyContent.organization };
        let currentId = organization.survey_sections.findIndex(
            (e) => e.id === survey_sections.id
        );
        organization.survey_sections[currentId] = survey_sections;
        setSurveyContent({
            ...surveyContent,
            organization,
        });
    };

    const onChangeContentSurveySection = (e, key) => {
        e = window.event || e;
        e.preventDefault();

        let organization = surveyContent.organization;
        organization.survey_sections[key] = e.target.value;
        setSurveyContent({
            ...surveyContent,
            organization,
        });
    }

    const onAddQuestionToSection = (idxSec) => {
        let organization = { ...surveyContent };
        organization.organization.survey_sections[idxSec].questions.push(questionTemp);
        setSurveyContent(organization);
    }

    const onRemoveQuestionFromSection = (e, idxSec, idxQues) => {
        e = window.event || e;
        e.preventDefault();
        let organization = { ...surveyContent };
        organization.organization.survey_sections[idxSec].questions.filter(item => item.id !== idxQues);
        setSurveyContent({
            ...surveyContent,
            organization,
        });
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
        organization.organization.survey_sections.push(surveySectionTemp);
        setSurveyContent(organization);
    }

    const saveForm = (e) => {
        e = window.event || e;
        e.preventDefault();
        setLoadSubmit(true);
        makeRequest('post', `surveyform/update`, surveyContent).then(({ data }) => {
            if (data.signal) {
                showSuccessMessageIcon('Cập nhật form thành công');
                return props.history.push('/form/list');
            }
            setLoadSubmit(false);
        }).catch(err => {
            setLoadSubmit(false);
            return showErrorMessage('Cập nhật form thất bại, ' + err);
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
            {surveyContent &&
                <>
                    { step === 1 && (
                        <>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="kt-section">
                                        <Card >
                                            <Card.Body>
                                                <div className="row" style={{ marginBottom: '20px', fontSize: '20px', font: 'bold' }}>Bước 1: Điền thông tin Form</div>
                                                <Organization
                                                    formHeader={surveyContent}
                                                    onChangeHeaderForm={onChangeHeaderForm}
                                                />
                                                <div style={{ paddingTop: "20px" }}>
                                                    <button onClick={passStep1} className="btn btn-primary">
                                                        Tiếp tục
                      </button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div className="row" style={{ marginBottom: '20px', fontSize: '20px', font: 'bold' }}>Bước 2: Điền thông tin tiêu đề</div>
                            <SurveyHeader
                                survey_headers={surveyContent.organization.survey_headers}
                                onChangeHeader={onChangeHeader}
                            />
                            <div style={{ paddingTop: "20px" }}>
                                <button onClick={() => backStep(1)} className="btn btn-primary">
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
                    )}
                    {step === 3 && (
                        <>
                            <div className="row" style={{ fontSize: '20px', font: 'bold' }}>Bước 3: Điền thông tin đề mục</div>
                            {surveyContent.organization && surveyContent.organization.survey_sections ? surveyContent.organization.survey_sections.map((item, idx) => {
                                return (
                                    <div className="row" key={idx} style={{ borderBottom: 'solid' }}>
                                        <SurveySection
                                            surveySection={item}
                                            addQuestion={onAddQuestionToSection}
                                            idxSection={idx}
                                            saveQuestion={onUpdateQuestionFromSection}
                                            onChangeTypeQues={onChangeTypeQues}
                                            onChangeSurveyTitle={onChangeSurveyTitle}
                                        />
                                    </div>
                                );
                            }) : null}
                            <div style={{ paddingTop: "20px" }}>
                                <button onClick={() => backStep(2)} className="btn btn-primary" style={{ marginRight: '10px' }}>
                                    Quay lại
                                    </button>
                                <button onClick={addSection} className="btn btn-success" style={{ marginRight: '10px' }}>
                                    Thêm đề mục
                                    </button>
                                <button onClick={(e) => saveForm(e)} className="btn btn-primary">
                                    Cập nhật form
                                </button>
                            </div>
                        </>
                    )}
                </>
            }
        </>
    );
};

const mapStateToProps = ({ auth }) => ({
    user: auth.user,
});

export default connect(mapStateToProps, null)(EditForm);
