/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { Form, Card, Col } from "react-bootstrap";
import ButtonLoading from '../../partials/common/ButtonLoading';
import makeRequest from '../../libs/request';
import { Select, Spin, Input } from "antd";
import { showErrorMessage, showSuccessMessageIcon } from '../../actions/notification';
import { validateSurveyName } from '../../libs/utils';
import Loading from "../loading";

const { TextArea } = Input;
const { Option } = Select;

const AddEditSurveyHeader = (props) => {
    const [dataAdd, setData] = useState({});
    const [isSubmiting, setLoadSubmit] = useState(false);
    const [isSearchUnit, setSearchUnit] = useState(false);
    const [listUnit, setListUnit] = useState([]);
    const [textSearch, setTextSearch] = useState('');
    const [isLoadUpdate, setLoadUpdate] = useState(false);
    const organizationRef = useRef();
    const surveyNameRef = useRef();
    const instructionsRef = useRef();
    const otherHeaderInfoRef = useRef();
    const updateId = props.match.params.id;

    useEffect(() => {
        if (updateId) {
            getSurveyByID(updateId);
        }
    }, []);

    const getSurveyByID = (id) => {
        setLoadUpdate(true);
        makeRequest('get', `surveyheader/getbyid?id=${id}`)
            .then(({ data }) => {
                if (data.signal) {
                    setListUnit([{
                        value: data.data.organization.id,
                        label: data.data.organization.organization_name
                    }]);
                    setData({ ...data.data, organization_id: data.data.organization.id });
                }
                setLoadUpdate(false);
            })
            .catch(err => {
                setLoadUpdate(false);
                console.log(err);
            })
    }

    const onChangeValue = (key, value) => {
        setData({
            ...dataAdd,
            [key]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!dataAdd.organization_id) {
            organizationRef.current.focus();
            return showErrorMessage('Vui lòng chọn tổ chức/HTX');
        }

        if (!dataAdd.survey_name) {
            surveyNameRef.current.focus();
            return showErrorMessage('Vui lòng nhập tên khảo sát');
        }

        if (!validateSurveyName(dataAdd.survey_name)) {
            surveyNameRef.current.focus();
            return showErrorMessage('Tên khảo sát không được chứa ký tự đặc biệt')
        }

        if (!dataAdd.instructions) {
            instructionsRef.current.focus();
            return showErrorMessage('Vui lòng nhập hướng dẫn');
        }

        if (!dataAdd.other_header_info) {
            otherHeaderInfoRef.current.focus();
            return showErrorMessage('Vui lòng nhập thông tin khảo sát');
        }

        if (updateId) {
            setLoadSubmit(true);
            makeRequest('post', `surveyheader/update`, dataAdd).then(({ data }) => {
                if (data.signal) {
                    showSuccessMessageIcon('Cập nhật tiêu đề khảo sát thành công');
                    return props.history.push('/survey-header/list');
                }
                setLoadSubmit(false);
            }).catch(err => {
                setLoadSubmit(false);
                return showErrorMessage('Cập nhật thất bại, ' + err);
            })
        } else {
            setLoadSubmit(true);
            makeRequest('post', `surveyheader/create`, dataAdd).then(({ data }) => {
                if (data.signal) {
                    showSuccessMessageIcon('Thêm tiêu đề khảo sát thành công');
                    return props.history.push('/survey-header/list');
                }
                setLoadSubmit(false);
            }).catch(err => {
                setLoadSubmit(false);
                return showErrorMessage('Thêm thất bại, ' + err);
            })
        }
    }

    const searchUnit = value => {
        setListUnit([]);
        setSearchUnit(true);
        makeRequest('get', `organization/search`, { organization_name: value, limit: 25 })
            .then(({ data }) => {
                if (data.signal) {
                    let arrUnit = data.data.rows.map(it => {
                        return {
                            label: `${it.organization_name}`,
                            value: it.id
                        }
                    })

                    setListUnit(arrUnit);
                    setSearchUnit(false);
                    setTextSearch(value);
                }
            })
            .catch(err => {
                setSearchUnit(false);
                console.log('++++++++++++++++', err)
            })
    };

    const onChangeUnit = (value) => {
        if (value) {
            setData({
                ...dataAdd,
                organization_id: value
            })
        }
    }

    if (isLoadUpdate) return <Loading />

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="kt-section">
                        <Card >
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formBasicName">
                                            <Form.Label className="starDanger">Chọn tổ chức/HTX</Form.Label>
                                            <Select
                                                showSearch
                                                value={(dataAdd && dataAdd.organization_id) || ''}
                                                placeholder="Nhập tổ chức/HTX"
                                                notFoundContent={isSearchUnit ? <Spin size="small" /> : textSearch ? 'Không có dữ liệu' : null}
                                                filterOption={false}
                                                onSearch={searchUnit}
                                                onChange={onChangeUnit}
                                                style={{ width: '100%' }}
                                                ref={organizationRef}
                                            >
                                                {listUnit.map(u => (
                                                    <Option key={`child-distri-${u.value}`} value={u.value}>{u.label}</Option>
                                                ))}
                                            </Select>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formBasicEmail">
                                            <Form.Label className="starDanger">Tên khảo sát</Form.Label>
                                            <Form.Control
                                                type="text" maxLength={255}
                                                ref={surveyNameRef} placeholder=""
                                                value={(dataAdd.survey_name && dataAdd.survey_name) || ''}
                                                onChange={(e) => onChangeValue('survey_name', e.target.value)} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formBasicDesc">
                                            <Form.Label className="starDanger">Hướng dẫn</Form.Label>
                                            <TextArea
                                                type="text"
                                                placeholder=""
                                                value={dataAdd.instructions || ''}
                                                onChange={(e) => { onChangeValue('instructions', e.target.value) }}
                                                ref={instructionsRef}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formBasicPassword">
                                            <Form.Label>Thông tin tiêu đề khác</Form.Label>
                                            <TextArea
                                                type="text"
                                                placeholder=""
                                                value={dataAdd.other_header_info || ''}
                                                onChange={(e) => { onChangeValue('other_header_info', e.target.value) }}
                                                ref={otherHeaderInfoRef}
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <div className="kt-login__actions">
                                        <Link to="/survey-header/list" style={{ marginRight: '5px' }}>
                                            <button type="button" className="btn btn-secondary btn-elevate kt-login__btn-secondary">Huỷ</button>
                                        </Link>
                                        <ButtonLoading loading={isSubmiting} className='btn btn-primary'>
                                            {!updateId ? 'Thêm' : 'Cập nhật'}
                                        </ButtonLoading>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddEditSurveyHeader;