/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Card, Col } from "react-bootstrap";
import ButtonLoading from "../../partials/common/ButtonLoading";
import makeRequest from "../../libs/request";
import { Select, Spin, Radio } from "antd";
import {
	showErrorMessage,
	showSuccessMessageIcon,
} from "../../actions/notification";
import { validateSurveyName } from "../../libs/utils";
const { Option } = Select;

const fakeUnit = [
	{
		id: 1,
		organization_name: "HTX A",
	},
	{
		id: 2,
		organization_name: "HTX B",
	},
	{
		id: 3,
		organization_name: "HTX C",
	},
];

const fakeDetail = {
	id: 3,
	organization: {
		id: 3,
		organization_name: "HTX C",
	},
	survey_name: "Khao sat C",
	instructions: "Huong Dan C",
	other_header_info: "Du an C",
	createdAt: "10/10/2000",
};

const AddSurveySection = (props) => {
	const [dataAdd, setData] = useState({});
	const [isSubmiting, setLoadSubmit] = useState(false);
	const [isSearchSurveyHeader, setsearchSurveyHeader] = useState(false);
	const [listSurveyHeader, setlistSurveyHeader] = useState([]);
	const [textSearch, setTextSearch] = useState("");
	const surveyHeaderRef = useRef();
	const sectionNameRef = useRef();
	const sectionSubHeadingRef = useRef();
	const sectionTitleRef = useRef();
	const sectionRequiredRef = useRef();
	const updateId = props.match.params.id;


	const onChangeValue = (key, value) => {
		setData({
			...dataAdd,
			[key]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!dataAdd.survey_header_id) {
			surveyHeaderRef.current.focus();
			return showErrorMessage("Vui lòng chọn tiêu đề khảo sát");
		}

		if (!dataAdd.section_name) {
			sectionNameRef.current.focus();
			return showErrorMessage("Vui lòng nhập tên phần khảo sát");
		}

		if (!validateSurveyName(dataAdd.section_name)) {
			sectionNameRef.current.focus();
			return showErrorMessage(
				"Tên phần khảo sát không được chứa ký tự đặc biệt"
			);
		}

		if (!dataAdd.section_title) {
			sectionTitleRef.current.focus();
			return showErrorMessage("Tiêu đề phần khảo sát không được bỏ trống");
		}

		if (!dataAdd.section_subheading) {
			sectionSubHeadingRef.current.focus();
			return showErrorMessage("Tiêu đề phần khảo sát con không được bỏ trống");
		}

		if (!dataAdd.section_required_yn) {
			sectionRequiredRef.current.focus();
			return showErrorMessage("Vui lòng chọn phần khảo sát yêu cầu bắt buộc");
		}

		setLoadSubmit(true);
		makeRequest("post", `surveySection/create`, dataAdd)
			.then(({ data }) => {
				if (data.signal) {
					showSuccessMessageIcon("Thêm tiêu đề phần khảo sát thành công");
					return props.history.push("/survey-sections/list");
				}
			})
			.catch((err) => {
				setLoadSubmit(false);
				return showErrorMessage("Thêm thất bại, " + err);
			});
	};

	const searchSurveyHeader = (value) => {
		setlistSurveyHeader([]);
		setsearchSurveyHeader(true);
		makeRequest("get", `surveyheader/search`, {
			other_header_info: value,
			limit: 20,
		})
			.then(({ data }) => {
				if (data.signal) {
					let arrSurHeader = data.data.rows.map((it) => {
						return {
							label: `${it.other_header_info}`,
							value: it.id,
						};
					});

					setlistSurveyHeader(arrSurHeader);
					setsearchSurveyHeader(false);
					setTextSearch(value);
				}
			})
			.catch((err) => {
				console.log("++++++++++++++++", err);
			});
	};

	const onChangeSurveyHeader = (value) => {
		if (value) {
			setData({
				...dataAdd,
				survey_header_id: value,
			});
		}
	};

	return (
		<>
			<div className="row">
				<div className="col-md-12">
					<div className="kt-section">
						<Card>
							<Card.Body>
								<Form onSubmit={handleSubmit}>
									<Form.Row>
										<Form.Group as={Col} controlId="formBasicName">
											<Form.Label className="starDanger">
												Chọn tiêu đề khảo sát
											</Form.Label>
											<Select
												showSearch
												value={(dataAdd && dataAdd.survey_header_id) || ""}
												placeholder="Nhập tổ chức/HTX"
												notFoundContent={
													isSearchSurveyHeader ? (
														<Spin size="small" />
													) : textSearch ? (
														"Không có dữ liệu"
													) : null
												}
												filterOption={false}
												onSearch={searchSurveyHeader}
												onChange={onChangeSurveyHeader}
												style={{ width: "100%" }}
												ref={surveyHeaderRef}
											>
												{listSurveyHeader.map((u) => (
													<Option
														key={`child-distri-${u.value}`}
														value={u.value}
													>
														{u.label}
													</Option>
												))}
											</Select>
										</Form.Group>
									</Form.Row>
									<Form.Row>
										<Form.Group as={Col} controlId="formSectionName">
											<Form.Label className="starDanger">
												Tên phần khảo sát
											</Form.Label>
											<Form.Control
												type="text"
												placeholder="Nhập tên phần khảo sát"
												value={dataAdd.section_name || ""}
												onChange={(e) => {
													onChangeValue("section_name", e.target.value);
												}}
												ref={sectionNameRef}
											/>
										</Form.Group>
									</Form.Row>
									<Form.Row>
										<Form.Group as={Col} controlId="formBasicTitle">
											<Form.Label>Tiêu đề phần khảo sát</Form.Label>
											<Form.Control
												type="text"
												placeholder="Nhập tiêu đề phần khảo sát"
												value={dataAdd.section_title || ""}
												onChange={(e) => {
													onChangeValue("section_title", e.target.value);
												}}
												ref={sectionTitleRef}
											/>
										</Form.Group>
									</Form.Row>
									<Form.Row>
										<Form.Group as={Col} controlId="formBasicTitle">
											<Form.Label>Tiêu đề phần khảo sát con</Form.Label>
											<Form.Control
												type="text"
												placeholder="Nhập tiêu đề phần khảo sát con"
												value={dataAdd.section_subheading || ""}
												onChange={(e) => {
													onChangeValue("section_subheading", e.target.value);
												}}
												ref={sectionSubHeadingRef}
											/>
										</Form.Group>
									</Form.Row>
									<Form.Row>
										<Form.Group as={Col} controlId="formBasicTitle">
											<Form.Label style={{ paddingRight: "20px" }}>
												Phần yêu cầu bắt buộc
											</Form.Label>
											<Radio.Group
												onChange={(e) =>
													onChangeValue("section_required_yn", e.target.value)
												}
												value={dataAdd.section_required_yn}
											>
												<Radio value={true}>Có</Radio>
												<Radio value={false}>Không</Radio>
											</Radio.Group>
										</Form.Group>
									</Form.Row>

									<div className="kt-login__actions">
										<Link
											to="/survey-header/list"
											style={{ marginRight: "5px" }}
										>
											<button
												type="button"
												className="btn btn-secondary btn-elevate kt-login__btn-secondary"
											>
												Huỷ
											</button>
										</Link>
										<ButtonLoading
											loading={isSubmiting}
											className="btn btn-primary"
										>
											Thêm
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
};

export default AddSurveySection;
