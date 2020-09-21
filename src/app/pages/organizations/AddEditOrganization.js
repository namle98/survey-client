/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { Form, Card, Col } from "react-bootstrap";
import ButtonLoading from '../../partials/common/ButtonLoading';
import makeRequest from '../../libs/request';
import { showErrorMessage, showSuccessMessageIcon } from '../../actions/notification';
import { validateSurveyName } from '../../libs/utils';

const AddEditOrganization = (props) => {
    const [dataAdd, setData] = useState({});
    const [isSubmiting, setLoadSubmit] = useState(false);
    const organizationNameRef = useRef();
    const updateId = props.match.params.id;

    useEffect(() => {
        if (updateId) {
            getSurveyByID(updateId);
        }
    }, []);

    const getSurveyByID = (id) => {
        makeRequest('get', `organization/getbyId?id=${id}`).then(({ data }) => {
            if (data.signal) {
                setData(data.data);
            }
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

        if (!dataAdd.organization_name) {
            organizationNameRef.current.focus();
            return showErrorMessage('Vui lòng tên tổ chức/HTX');
        }

        if (!validateSurveyName(dataAdd.organization_name)) {
            organizationNameRef.current.focus();
            return showErrorMessage('Tên tên tổ chức/HTX không được chứa ký tự đặc biệt')
        }

        setLoadSubmit(true);
        if (!updateId) {
            makeRequest('post', `organization/create`, dataAdd).then(({ data }) => {
                if (data.signal) {
                    showSuccessMessageIcon('Thêm tổ chức/HTX thành công');
                    return props.history.push('/organizations/list');
                }
            }).catch(err => {
                setLoadSubmit(false);
                return showErrorMessage('Thêm thất bại, ' + err);
            })
        } else {
            makeRequest('post', `organization/update`, dataAdd).then(({ data }) => {
                if (data.signal) {
                    showSuccessMessageIcon('Cập nhật tổ chức/HTX thành công');
                    return props.history.push('/organizations/list');
                }
            }).catch(err => {
                setLoadSubmit(false);
                return showErrorMessage('Cập nhật thất bại, ' + err);
            })
        }
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
                                            <Form.Label className="starDanger">Tên tổ chức/HTX</Form.Label>
                                            <Form.Control
                                                type="text" maxLength={255}
                                                ref={organizationNameRef} placeholder="Nhập tên tổ chức/HTX"
                                                value={(dataAdd.organization_name && dataAdd.organization_name) || ''}
                                                onChange={(e) => onChangeValue('organization_name', e.target.value)} />
                                        </Form.Group>
                                    </Form.Row>

                                    <div className="kt-login__actions">
                                        <Link to="/organizations/list" style={{ marginRight: '5px' }}>
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

export default AddEditOrganization;