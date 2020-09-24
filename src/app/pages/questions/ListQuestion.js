/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import {
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";
import { Modal, Pagination, Button } from "antd";
import { Form } from "react-bootstrap";
import { Card } from "react-bootstrap";
import ShowFormSurvey from "./ShowFormSurvey";
import InputForm from "../../partials/common/InputForm";
//import SelectForm from "../../partials/common/SelectForm";
import {
	showSuccessMessageIcon,
	showErrorMessage,
} from "../../actions/notification";
//import { LEVEL_DISTRIBUTOR } from "../../config/product";
import { InfoCircleOutlined } from "@ant-design/icons";
import Loading from "../loading";
import ButtonLoading from "../../partials/common/ButtonLoading";
import { connect } from "react-redux";
import makeRequest from "../../libs/request";

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

const ListQuestion = (props) => {
	const classes1 = useStyles1();
	const rowsPerPage = 10;
	const [page, setPage] = useState(1);
	const [rows, setRow] = useState([]);
	const [dataSearch, setData] = useState({});
	const [dataDelete, setDataDelete] = useState({ visible: false });
	const [total, setTotal] = useState(0);
	const [isLoading, setLoading] = useState(true);
	const [isLoadDelete, setLoadDelete] = useState(false);
	const [showDetail, setShowDetail] = useState(false);
	const [dataDetail, setDataDetail] = useState();

	useEffect(() => {
		searchSurvey({ page: 1, limit: 10 });
	}, []);

	function itemRender(originalElement) {
		return originalElement;
	}

	const searchSurvey = (dataSearch = {}) => {
		setLoading(true);
		makeRequest("get", `question/getAll`, dataSearch)
			.then(({ data }) => {
				if (data.signal) {
					const { rows, count } = data.data;
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

	const handleChangePage = (newPage) => {
		setPage(newPage);
		searchSurvey({ ...dataSearch, page: newPage, limit: rowsPerPage });
	};

	const onChangeValue = (key, value) => {
		setData({
			...dataSearch,
			[key]: value,
		});
	};

	const showModalDelete = (id) => {
		setDataDelete({
			id,
			visible: true,
		});
	};

	const hideDeleteModal = () => {
		setDataDelete({
			...dataDelete,
			visible: false,
			idDel: 0,
		});
	};

	const deleteAction = () => {
		setLoadDelete(true);
		hideDeleteModal();
		setLoadDelete(false);
		makeRequest("get", `question/delete`, { id: dataDelete.id })
			.then(({ data }) => {
				if (data.signal) {
					showSuccessMessageIcon("Xóa thành công");
					let dataQuestion = rows.filter((item) => item.id !== dataDelete.id);
					setRow(dataQuestion);
					setTotal(total - 1);
					hideDeleteModal();
				}
			})
			.catch((err) => {
				showErrorMessage("Xóa thất bại");
				console.log(err);
			});
	};

	const unfilteredData = (e) => {
		setData({});
		setPage(1);
		searchSurvey({ page: 1, limit: rowsPerPage });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setPage(1);
		searchSurvey({ ...dataSearch, page: 1, limit: rowsPerPage });
	};
	const onClickCancelModal = () => {
		setShowDetail(false);
	};

	const detailQuestion = (e, id) => {
		e = window.event || e;
		e.preventDefault();
		setShowDetail(true);
		makeRequest("get", `question/getById?id=${id}`)
			.then(({ data }) => {
				if (data.data) {
					setDataDetail(data.data);
				}
			})
			.catch((err) => {
				showErrorMessage(err);
			});
	};
	return (
		<>
			<Link
				to="/questions/add"
				className="btn btn-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
			>
				Tạo câu hỏi
			</Link>

			<div className="row">
				<div className="col-md-12">
					<div className="kt-section">
						<div className="kt-section__content">
							<Paper className={classes1.root}>
								<div className="col-md-12">
									<Form onSubmit={handleSubmit}>
										<div style={{ marginTop: 20, fontSize: 20 }}>
											<label>Tìm kiếm</label>
										</div>
										<div className="form-row">
											<div className="form-group col-md-2">
												<div className="form-group">
													<InputForm
														type="text"
														placeholder="Tên Answers"
														value={dataSearch.title || ""}
														onChangeValue={(value) => {
															onChangeValue("title", value);
														}}
														focus={true}
													/>
												</div>
											</div>
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
												<TableCell>Câu hỏi mẫu</TableCell>
												<TableCell>Kiểu trả lời</TableCell>
												<TableCell style={{ width: 150 }}>Action</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{rows && rows.length ? (
												rows.map((row, key) => (
													<TableRow key={`organization-${key}`}>
														<TableCell>{row.title}</TableCell>
														<TableCell>{row.inputType.title}</TableCell>
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
																			detailQuestion(e, row.id);
																		}}
																		style={{
																			color: "#0000ff",
																			fontSize: 15,
																			marginLeft: 15,
																		}}
																	/>
																</span>
																<span
																	style={{ cursor: "pointer" }}
																	d
																	data-toggle="tooltip"
																	data-placement="top"
																	title="Sửa thông tin"
																>
																	<Icon
																		className="fa fa-pen"
																		onClick={() =>
																			props.history.push(
																				`/questions/update/${row.id}`
																			)
																		}
																		style={{
																			color: "#ffa800",
																			fontSize: 15,
																			marginLeft: 15,
																		}}
																	/>
																</span>
																<span
																	style={{ cursor: "pointer" }}
																	data-toggle="tooltip"
																	data-placement="top"
																	title="Xóa thông tin"
																>
																	<Icon
																		className="fa fa-trash"
																		onClick={(e) => showModalDelete(row.id)}
																		style={{
																			color: "rgb(220, 0, 78)",
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
							title="Xóa tiêu đề khảo sát"
							visible={dataDelete.visible}
							onOk={deleteAction}
							onCancel={hideDeleteModal}
							footer={[
								<ButtonLoading
									type="default"
									onClick={hideDeleteModal}
									className="btn btn-label-secondary btn-secondary"
								>
									Đóng
								</ButtonLoading>,
								<ButtonLoading
									className="btn btn-label-danger btn-danger"
									onClick={deleteAction}
									loading={isLoadDelete}
								>
									<span>Xóa</span>
								</ButtonLoading>,
							]}
						>
							<p>Bạn có muốn xóa tiêu đề khảo sát này?</p>
						</Modal>
						<Modal
							title="Chi tiết câu hỏi"
							visible={showDetail}
							width={900}
							onCancel={() => onClickCancelModal()}
							footer={[
								<Button type="primary" onClick={() => onClickCancelModal()}>
									OK
								</Button>,
							]}
						>
							{!dataDetail ? (
								<Loading />
							) : (
								<div
									className="form-group"
									style={{
										height: "300px",
										overflowY: "auto",
										overflowX: "hidden",
									}}
								>
									<Card>
										<ShowFormSurvey dataDetail={dataDetail} />
									</Card>
								</div>
							)}
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

export default connect(mapStateToProps, null)(ListQuestion);
