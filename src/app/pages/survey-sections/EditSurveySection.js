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

const EditSurveySection = (props) => {
	const [dataUpdate, setData] = useState({});
	const [isSubmiting, setLoadSubmit] = useState(false);
	const [surveyName, setsurveyName] = useState([]);
	const [dataSurvey, setDataSurvery] = useState([]);
	const surveyHeaderRef = useRef();
	const sectionNameRef = useRef();
	const sectionSubHeadingRef = useRef();
	const sectionTitleRef = useRef();
	const sectionRequiredRef = useRef();
	const updateId = props.match.params.id;

	useEffect(() => {
		if (updateId) {
			getSurveyByID(updateId);
			getsectionName();
		}
	}, []);

	const getsectionName = () => {
		makeRequest("get", `surveyheader/getSelect`)
			.then(({ data }) => {
				setsurveyName(data.data.rows)
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getSurveyByID = (id) => {

		makeRequest("get", `surveySection/getbyid`, { id })
			.then(({ data }) => {
				if (data.data) {
					const {
						section_name,
						surveyHeader,
						section_title,
						section_required_yn,
						section_subheading
					} = data.data;
					setDataSurvery({
						section_name,
						surveyHeader,
						section_title,
						section_required_yn,
						section_subheading
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});

	};

	const onChangeValue = (key, value) => {
		setDataSurvery({
			...dataSurvey,
			[key]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// if (!dataSurvey.survey_header_id) {
		// 	surveyHeaderRef.current.focus();
		// 	return showErrorMessage("Vui lòng chọn tiêu đề khảo sát");
		// }

		if (!dataSurvey.section_name) {
			sectionNameRef.current.focus();
			return showErrorMessage("Vui lòng nhập tên phần khảo sát");
		}

		if (!validateSurveyName(dataSurvey.section_name)) {
			sectionNameRef.current.focus();
			return showErrorMessage(
				"Tên phần khảo sát không được chứa ký tự đặc biệt"
			);
		}

		if (!dataSurvey.section_title) {
			sectionTitleRef.current.focus();
			return showErrorMessage("Tiêu đề phần khảo sát không được bỏ trống");
		}

		if (!dataSurvey.section_subheading) {
			sectionSubHeadingRef.current.focus();
			return showErrorMessage("Tiêu đề phần khảo sát con không được bỏ trống");
		}

		if (!dataSurvey.section_required_yn) {
			sectionRequiredRef.current.focus();
			return showErrorMessage("Vui lòng chọn phần khảo sát yêu cầu bắt buộc");
		}
		const {
			section_name,
			section_title,
			section_required_yn,
			section_subheading,
		} = dataSurvey;
		const dataUpdate = {
			section_name, section_title, section_required_yn, section_subheading, id: updateId
		};
		setLoadSubmit(true);
		makeRequest("post", `surveySection/update`, dataUpdate)
			.then(({ data }) => {
				if (data.signal) {
					showSuccessMessageIcon("Cập nhật tiêu đề phần khảo sát thành công");
					return props.history.push("/survey-sections/list");
				}
			})
			.catch((err) => {
				setLoadSubmit(false);
				return showErrorMessage("Cập nhật thất bại, " + err);
			});
	};

	const searchSurveyHeader = (value) => {

	};

	const onChangeSurveyHeader = (value) => {
		if (value) {
			setData({
				...dataUpdate,
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
												value={dataSurvey.surveyHeader ? dataSurvey.surveyHeader.survey_name : ""}
												onSearch={searchSurveyHeader}
												onChange={onChangeSurveyHeader}
												style={{ width: "100%" }}
												ref={surveyHeaderRef}
											>
												{surveyName.map((u) => (
													<Option
														key={`child-distri-${u.survey_name}`}
														value={u.survey_name}
													>
														{u.survey_name}
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
												value={dataSurvey.section_name || ""}
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
												value={dataSurvey.section_title || ""}
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
												value={dataSurvey.section_subheading || ""}
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
												value={dataSurvey.section_required_yn === 1 ? true : false}
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
											Cập nhật
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

export default EditSurveySection;
