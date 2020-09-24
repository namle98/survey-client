import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Loading from "../loading";
import { Form, Card } from "react-bootstrap";
import InputForm from "../../partials/common/InputForm";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import {
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import { Modal, Pagination, Button, Select, Spin } from "antd";
import ButtonLoading from "../../partials/common/ButtonLoading";
import makeRequest from "../../libs/request";
import ShowFormSurvey from "../form/ShowFormSurvey";
const { Option } = Select;

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

const ListAnswers = (props) => {
	const classes1 = useStyles1();
	const rowsPerPage = 10;
	const [page, setPage] = useState(1);
	const [rows, setRow] = useState([]);
	const [dataSearch, setDataSearch] = useState({});
	const [dataDelete, setDataDelete] = useState({ visible: false });
	const [total, setTotal] = useState(0);
	const [isLoading, setLoading] = useState(true);
	const [isLoadDelete, setLoadDelete] = useState(false);
	const [showDetail, setShowDetail] = useState(false);
	const [dataDetail, setDataDetail] = useState({});
	const [isSearchRound, setIsSearchRound] = useState(false);
	const [listRound, setListRound] = useState([]);
	const [textSearch, setTextSearch] = useState('');
	const [isSearchForm, setIsSearchForm] = useState(false);
	const [listForm, setListForm] = useState([]);
	const [textSearchForm, setTextSearchForm] = useState('');

	useEffect(() => {
		getRoundNewest();
	}, []);

	function itemRender(originalElement) {
		return originalElement;
	}
	const handleChangePage = (newPage) => {
		setPage(newPage);
		searchUserForm({ ...dataSearch, page: newPage, limit: rowsPerPage });
	};
	const searchUserForm = (dataSearch = {}) => {
		setLoading(true);
		makeRequest("get", `userform/getAll`, dataSearch)
			.then(({ data }) => {
				if (data.signal) {
					const { count } = data.data;
					const { rows } = data.data.rows;
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

	const hideDeleteModal = () => {
		setDataDelete({
			...dataDelete,
			visible: false,
			idDel: 0,
		});
	};

	const deleteAction = (id) => {
		setLoadDelete(true);
		hideDeleteModal();
		setLoadDelete(false);
	};

	const detailAnswer = (row) => {
		setShowDetail(true);
		setDataDetail(row);
	};

	const searchSurveyRound = (value) => {
		setListRound([]);
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

					setListRound(arrSurRound);
					setIsSearchRound(false);
					setTextSearch(value);
				}
			})
			.catch((err) => {
				console.log("++++++++++++++++", err);
			});
	};

	const searchForm = (value) => {
		setListForm([]);
		setIsSearchForm(true);
		makeRequest("get", `organization/search`, {
			id: value,
			limit: 10,
		})
			.then(({ data }) => {
				if (data.signal) {
					let arrForm = data.data.rows.map((it) => {
						return {
							label: `${it.title}`,
							value: it.id,
						};
					});

					setListForm(arrForm);
					setIsSearchForm(false);
					setTextSearchForm(value);
				}
			})
			.catch((err) => {
				console.log("++++++++++++++++", err);
			});
	};

	const onChangeSurveyRound = (value) => {
		setDataSearch({
			...dataSearch,
			survey_round_id: value,
			form_id: ''
		});

		searchUserForm({ survey_round_id: value, page: 1, limit: rowsPerPage });
	};

	const onChangeForm = (value) => {
		setDataSearch({
			...dataSearch,
			form_id: value
		});

		searchUserForm({ survey_round_id: dataSearch.survey_round_id, form_id: value, page: 1, limit: rowsPerPage });
	};

	const unfilteredData = (e) => {
		setDataSearch({});
		setPage(1);
		searchUserForm({ page: 1, limit: rowsPerPage });
	};

	const getRoundNewest = () => {
		setListRound([]);
		makeRequest('get', 'surveyrounds/getNewest').then(({ data }) => {
			if (data.signal) {
				console.log('data', data.data)
				setDataSearch({
					...dataSearch,
					survey_round_id: data.data.id
				})
				setListRound([{ value: data.data.id, label: data.data.title }])
				searchUserForm({ survey_round_id: data.data.id, limit: 10, page: 1 });
			}
		})
	}

	return (
		<>
			<div className="row">
				<div className="col-md-12">
					<div className="kt-section">
						<div className="kt-section__content">
							<Paper className={classes1.root}>
								<div className="col-md-12">
									<Form>
										<div style={{ marginTop: 20, fontSize: 20 }}>
											<label>Tìm kiếm</label>
										</div>
										<div className="form-row">
											<div className="form-group col-md-2">
												<div className="form-group">
													<Select
														showSearch
														value={dataSearch.survey_round_id || "Nhập tên đợt"}
														notFoundContent={
															isSearchRound ? (
																<Spin size="small" />
															) : textSearch ? (
																"Không có dữ liệu"
															) : null
														}
														filterOption={false}
														onSearch={searchSurveyRound}
														onChange={onChangeSurveyRound}
														style={{ width: "100%" }}
													>
														{listRound.map((u) => (
															<Option
																key={`child-distri-${u.value}`}
																value={u.value}
															>
																{u.label}
															</Option>
														))}
													</Select>
												</div>
											</div>
											{dataSearch.survey_round_id && <div className="form-group col-md-2">
												<div className="form-group">
													<Select
														showSearch
														value={dataSearch.form_id || "Nhập tên form"}
														notFoundContent={
															isSearchForm ? (
																<Spin size="small" />
															) : textSearchForm ? (
																"Không có dữ liệu"
															) : null
														}
														filterOption={false}
														onSearch={searchForm}
														onChange={onChangeForm}
														style={{ width: "100%" }}
													>
														{listForm.map((u) => (
															<Option
																key={`child-distri-${u.value}`}
																value={u.value}
															>
																{u.label}
															</Option>
														))}
													</Select>
												</div>
											</div>}
											{dataSearch.form_id && <div className="form-group col-md-2">
												<div className="form-group">
													<InputForm
														type="text"
														placeholder="Nhập tên người tham gia"
														value={dataSearch.name || ""}
														focus={true}
													/>
												</div>
											</div>}
											<div className="form-group col-md-3">
												<div className="form-group" style={{ display: "flex" }}>
													<button
														className="btn btn-label-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
														onClick={unfilteredData}
														style={{ marginLeft: 10, marginTop: 3 }}
														type="button"
													>
														<span>Bỏ lọc</span>
													</button>

													<ButtonLoading
														type="submit"
														className="btn btn-label-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
														loading={isLoading}
														style={{ marginLeft: 10, marginTop: 3 }}
													>
														<span>Tìm kiếm</span>
													</ButtonLoading>
												</div>
											</div>
										</div>
									</Form>
								</div>
								{isLoading ? (
									<Loading />
								) : (
										<Table className={classes1.table}>
											<TableHead>
												<TableRow>
													<TableCell>Tên người trả lời </TableCell>
													<TableCell>Đợt khảo sát </TableCell>
													<TableCell>Form </TableCell>
													<TableCell style={{ width: 150 }}>Action</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{rows && rows.length ? (
													rows.map((row, key) => (
														<TableRow key={`answers-${key}`}>
															<TableCell>{row.users.name}</TableCell>
															<TableCell>
																{row.survey_round && row.survey_round.title}
															</TableCell>
															<TableCell>
																{row.organization && row.organization.title}
															</TableCell>
															<TableCell>
																<div className="mg-b5">
																	<span
																		style={{ cursor: "pointer" }}
																		d
																		data-toggle="tooltip"
																		data-placement="top"
																		title="Xem chi tiết"
																	>
																		<Icon
																			className="fa fa-file"
																			onClick={(e) => {
																				detailAnswer(e, row.id);
																			}}
																			style={{
																				color: "#0000ff",
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
									)}
								{total > rowsPerPage && (
									<div className="custom-svg customSelector">
										<Pagination
											itemRender={itemRender}
											className="pagination-crm"
											current={page}
											pageSize={rowsPerPage}
											total={total}
											onChange={(p, s) => handleChangePage(p)}
										/>
									</div>
								)}
							</Paper>
						</div>
						<Modal
							title="Chi tiết answers"
							visible={showDetail}
							width={600}
							onCancel={() => setShowDetail(false)}
							footer={[
								<Button type="primary" onClick={() => setShowDetail(false)}>
									OK
								</Button>,
							]}
						>
							<div
								className="form-group"
								style={{
									height: "300px",
									overflowY: "auto",
									overflowX: "hidden",
								}}
							>
								<Card>
									<ShowFormSurvey data={dataDetail} />
								</Card>
							</div>
						</Modal>
					</div>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = ({ auth }) => ({
	user: auth.user,
});

export default connect(mapStateToProps, null)(ListAnswers);
