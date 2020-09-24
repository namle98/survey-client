/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeid } from "../../libs/utils";
import { Form, Card, Col } from "react-bootstrap";
import ButtonLoading from "../../partials/common/ButtonLoading";
import makeRequest from "../../libs/request";
import { Select, Input } from "antd";
import "./table.css";
import {
	showErrorMessage,
	showSuccessMessageIcon,
} from "../../actions/notification";
import { DropSelectComponent } from "../../components/backup-component";
const { TextArea } = Input;
const { Option } = Select;

const EditQuestion = (props) => {
	const [dataUpdate, setDataUpdate] = useState({});
	const [isSubmiting, setLoadSubmit] = useState(false);
	const [] = useState(false);
	const [, setListSurveySection] = useState([]);
	const [] = useState("");
	const [] = useState("");
	const [listInputType, setListInputType] = useState();
	const [typeSelect, setTypeSelect] = useState();
	const inputTypeRef = useRef();
	const questionNameRef = useRef();
	const questionSubtextRef = useRef();
	const updateId = props.match.params.id;
	const [valueCommentBox, setValueCommentBox] = useState();
	const [valueGripTextBox, setValueGripTextBox] = useState();
	const [valueSigleTextBox, setValueSigleTextBox] = useState();
	const [valueGridSigleChoise, setValueGridSigleChoise] = useState();
	const [valueGridMultiChoise, setValueGridMultiChoise] = useState();
	const [valueGridSigleText, setValueGridSigleText] = useState();
	const [valueMultiChoise, setValueMultiChoise] = useState();
	const [valueSigleChoise, setValueSigleChoise] = useState();

	useEffect(() => {
		getInputTypes();
		if (updateId) {
			getQuestionById(updateId);
		}
		setValueCommentBox(props.valueCommentBox);
		setValueGripTextBox(props.valueGripTextBox);
		setValueSigleTextBox(props.valueSigleTextBox);
		setValueGridSigleChoise(props.valueGridSigleChoise);
		setValueGridMultiChoise(props.valueGridMultiChoise);
		setValueGridSigleText(props.valueGridSigleText);
		setValueMultiChoise(props.valueMultiChoise);
		setValueSigleChoise(props.valueSigleChoise);
	}, [
		props.valueCommentBox,
		props.valueGripTextBox,
		props.valueSigleTextBox,
		props.valueGridSigleChoise,
		props.valueGridMultiChoise,
		props.valueGridSigleText,
		props.valueMultiChoise,
		props.valueSigleChoise,
	]);

	const getQuestionById = (id) => {
		makeRequest("get", `question/getbyId?id=${id}`)
			.then(({ data }) => {
				if (data.signal) {
					setDataUpdate(data.data);
					setTypeSelect(parseInt(data.data.input_type_id));
					console.log("questions", data.data);
				} else {
					showErrorMessage(data.message);
					return props.history.push("/questions/list");
				}
			})
			.catch((err) => {
				showErrorMessage(err);
				return props.history.push("/questions/list");
			});
	};

	const onChangeValue = (key, value) => {
		setDataUpdate({
			...dataUpdate,
			[key]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setLoadSubmit(true);
		if (updateId) {
			let questions = [];
			let question = [];
			if (typeSelect === 1 || typeSelect === 3) {
				let title = "";
				if (typeSelect == 1) {
					title = valueCommentBox;
				} else {
					title = valueSigleTextBox;
				}
				question = {
					code: makeid(15) + Date.now(),
					title: title,
					note: dataUpdate.note ? dataUpdate.note : "",
					question_table_note: "",
					parent_id: 0,
					have_child: 0,
					index: 1,
					type: 1,
					intput_type: dataUpdate.input_type_id,
				};
				questions.push({ question });
			}
			if (typeSelect === 2 || typeSelect === 6) {
				let question_columns = [];
				let question_rows = [];

				let data = "";
				if (typeSelect == 2) {
					data = valueGripTextBox;
				} else {
					data = valueGridSigleText;
				}
				// question
				question = {
					code: makeid(15) + Date.now(),
					title: data.title,
					note: dataUpdate.note ? dataUpdate.note : "",
					question_table_note: "",
					parent_id: 0,
					have_child: false,
					index: 1,
					type: 1,
					intput_type: dataUpdate.input_type_id, // 8 là table_string....
				};
				// Question column
				data.dataColumn.forEach((item) => {
					question_columns.push({
						code: makeid(15) + Date.now(),
						title: item.content,
						note: "",
						index: 1,
						type: 1,
					});
				});
				// Question row
				data.dataRow.forEach((item) => {
					question_rows.push({
						code: makeid(15) + Date.now(),
						title: item.content,
						note: "",
						index: 1,
						type: 1,
					});
				});
				question = { ...question, question_columns, question_rows };
				questions.push({ question });
			}
			if (typeSelect === 4 || typeSelect === 5) {
				let question_columns = [];
				let question_rows = [];
				let data = "";
				if (typeSelect == 4) {
					data = valueGridSigleChoise;
				} else {
					data = valueGridMultiChoise;
				}
				// question
				question = {
					code: makeid(15) + Date.now(),
					title: data.title,
					note: dataUpdate.note ? dataUpdate.note : "",
					question_table_note: "",
					parent_id: 0,
					have_child: false,
					index: 1,
					type: 2,
					intput_type: dataUpdate.input_type_id, // 8 là table_string....
				};
				// Question column
				data.dataColumn.forEach((item) => {
					question_columns.push({
						code: makeid(15) + Date.now(),
						title: item.content,
						note: "",
						index: 1,
						type: 2,
					});
				});
				// Question row
				data.dataRow.forEach((item) => {
					question_rows.push({
						code: makeid(15) + Date.now(),
						title: item.content,
						note: "",
						index: 1,
						type: 2,
					});
				});
				question = { ...question, question_columns, question_rows };
				questions.push({ question });
			}
			if (typeSelect === 7 || typeSelect === 8) {
				let question_row = [];
				let data = "";
				if (typeSelect == 7) {
					data = valueMultiChoise;
				} else {
					data = valueSigleChoise;
				}
				// question
				question = {
					code: makeid(15) + Date.now(),
					title: data.title,
					note: dataUpdate.note ? dataUpdate.note : "",
					question_table_note: "",
					parent_id: 0,
					have_child: false,
					index: 1,
					type: 2,
					intput_type: dataUpdate.input_type_id, // 8 là table_string....
				};
				// Question row
				data.dataRow.forEach((item) => {
					question_row.push({
						code: makeid(15) + Date.now(),
						title: item.content,
						note: "",
						index: 1,
						type: 2,
					});
				});
				question = { ...question, question_choise: question_row };
				questions.push({ question });
			}

			makeRequest("post", `question/update`, { ...questions, id: updateId })
				.then(({ data }) => {
					if (data.signal) {
						showSuccessMessageIcon("Cập nhật câu hỏi thành công");
						return props.history.push("/questions/list");
					}
				})
				.catch((err) => {
					setLoadSubmit(false);
					return showErrorMessage("Cập nhật thất bại, " + err);
				});
		}
	};
	const getInputTypes = () => {
		makeRequest("get", `question/getInputType`).then(({ data }) => {
			console.log(data);
			if (data.signal) {
				let arrInputType = data.data.map((it) => {
					return {
						type: `${it.title}`,
						id: it.value,
					};
				});

				setListInputType(arrInputType);
			}
		});
	};
	const onChangeInputType = (value) => {
		setTypeSelect(parseInt(value));
		if (value) {
			setDataUpdate({
				...dataUpdate,
				input_type_id: value,
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
										<Form.Group as={Col} controlId="formBasicTypeInput">
											<Form.Label className="starDanger">
												Kiểu trả lời
											</Form.Label>
											<Select
												disabled={true}
												onChange={onChangeInputType}
												value={dataUpdate.input_type_id}
												style={{ width: "100%" }}
												ref={inputTypeRef}
											>
												{listInputType &&
													listInputType.map((u) => (
														<Option key={`child-distri-${u.id}`} value={u.id}>
															{u.type}
														</Option>
													))}
											</Select>
										</Form.Group>
									</Form.Row>

									<Form.Row>
										<Form.Group as={Col} controlId="formBasicanswerRequired">
											<DropSelectComponent
												type={typeSelect ? typeSelect : 1}
												data={dataUpdate}
											/>
										</Form.Group>
									</Form.Row>

									<Form.Row>
										<Form.Group as={Col} controlId="formBasicQuestionName">
											<Form.Label className="starDanger">
												Chú thích câu hỏi
											</Form.Label>
											<TextArea
												type="text"
												placeholder=""
												value={dataUpdate.note || ""}
												onChange={(e) => {
													onChangeValue("note", e.target.value);
												}}
												ref={questionNameRef}
											/>
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
											{!updateId ? "Thêm" : "Cập nhật"}
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

const mapStateToProps = (state) => {
	return {
		valueCommentBox: state.form.valueCommentBox,
		valueGripTextBox: state.form.valueGridTextBox,
		valueSigleTextBox: state.form.valueSigleTextBox,
		valueGridSigleChoise: state.form.valueGridSigleChoise,
		valueGridMultiChoise: state.form.valueGridMultiChoise,
		valueGridSigleText: state.form.valueGridSigleText,
		valueMultiChoise: state.form.valueMultiChoise,
		valueSigleChoise: state.form.valueSigleChoise,
	};
};
export default connect(mapStateToProps)(EditQuestion);
