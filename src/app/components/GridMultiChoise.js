import React, { useState, useEffect } from "react";
import { Checkbox, Button, Input } from "antd";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import { CHECKBOX, GRID_MULTI_CHOISE } from "../config/common/TypeOfInput";
import "./QuestionItem.scss";
import { generateRandomCode } from "../libs/random";

const GridMultiChoise = (props) => {
	const [preTitle, setPreTitle] = useState("");
	const [title, setTitle] = useState(props.title);

	const [currentRowLabel, setCurrentRowLabel] = useState([]);
	const [currentColumnLabel, setCurrentColumnLabel] = useState([]);
	const [listRowDelete, setListRowDelete] = useState([]);
	const [listColDelete, setListColDelete] = useState([]);

	const [rowLabel, setRowLabel] = useState([
		{ title: "Nội dung hàng 1", unique: "abcdefgh" },
		{ title: "Nội dung hàng 2", unique: "iklmnopq" },
		{ title: "Nội dung hàng 3", unique: "rstuvxyz" },
	]);
	const [columnLabel, setColumnLabel] = useState([
		{ title: "Nội dung cột 1", type: CHECKBOX, unique: "abcdefgh" },
		{ title: "Nội dung cột 2", type: CHECKBOX, unique: "iklmnopq" },
		{ title: "Nội dung cột 3", type: CHECKBOX, unique: "rstuvxyz" },
	]);

	const componentDidMount = () => {
		if (props.item && props.item.question_row) {
			let rowItem = props.item.question_row.map((item) => {
				return {
					id: item.id,
					title: item.title,
				};
			});
			setCurrentRowLabel([...rowItem]);
			setRowLabel(rowItem);
		} else {
			setCurrentRowLabel(rowLabel);
		}

		if (props.item && props.item.question_columns) {
			let columnItem = props.item.question_columns.map((item) => {
				return {
					id: item.id,
					title: item.title,
					type: item.type,
				};
			});
			setCurrentColumnLabel([...columnItem]);
			setColumnLabel(columnItem);
		} else {
			setCurrentColumnLabel(columnLabel);
		}
	};

	useEffect(componentDidMount, []);

	let objGridMultiChoise = {
		id: props.id || "",
		title: title,
		note: "",
		parent_id: 0,
		have_child: false,
		index: 1,
		type: 1, //1 là bình thường, 2 là mẫu
		input_type_id: GRID_MULTI_CHOISE, // 8 là table_string....
		question_columns: [],
		question_row: [],
	};

	const handleChange = (e) => {
		e = window.event || e;
		e.preventDefault();
		setPreTitle(e.target.value);
	};

	const handleChangeRowLabel = (e, idx) => {
		e = window.event || e;
		e.preventDefault();
		let rows = [...rowLabel];
		rows[idx].title = e.target.value;
		setRowLabel(rows);
	};

	const handleChangeColumnLabel = (e, idx) => {
		e = window.event || e;
		e.preventDefault();
		let columns = [...columnLabel];
		columns[idx].title = e.target.value;
		setColumnLabel(columns);
	};

	const addRowLabel = () => {
		let title = "";
		let unique = generateRandomCode(6);
		let data = [...rowLabel];
		data.push({ title, unique });
		setRowLabel(data);
	};

	const addColumnLabel = () => {
		let title = "";
		let unique = generateRandomCode(6);
		let data = [...columnLabel];
		let type = CHECKBOX;
		data.push({ title, type, unique });
		setColumnLabel(data);
	};

	const removeRowLabel = (e, idx) => {
		e.preventDefault();
		let data = [...rowLabel];
		if (data[idx].id) {
			let listRowDel = [...listRowDelete];
			listRowDel.push(data[idx]);
			setListRowDelete(listRowDel);
		}
		let datafilter = data.filter((_item, index) => {
			if (index !== idx) {
				return true;
			}
			return false;
		});
		setRowLabel(datafilter);
	};

	const removeColumnLabel = (e, idx) => {
		e.preventDefault();
		let data = [...columnLabel];
		if (data[idx].id) {
			let listColDel = [...listColDelete];
			listColDel.push(data[idx]);
			setListColDelete(listColDel);
		}
		let datafilter = data.filter((_item, index) => {
			if (index !== idx) {
				return true;
			}
			return false;
		});
		setColumnLabel(datafilter);
	};

	const onClickSave = (e) => {
		e = window.event || e;
		e.preventDefault();
		setCurrentColumnLabel([...columnLabel]);
		setCurrentRowLabel([...rowLabel]);

		columnLabel.forEach((e, i) => {
			let column = {};
			column.id = e.id || "";
			column.title = e.title;
			column.note = e.note;
			column.type = e.type;
			column.index = i;
			objGridMultiChoise.question_columns.push(column);
		});

		objGridMultiChoise.delete_cols = listColDelete;

		currentRowLabel.forEach((e) => {
			let row = {};
			row.id = e.id || "";
			row.note = e.title;
			row.title = e.title;
			objGridMultiChoise.question_row.push(row);
		});

		objGridMultiChoise.delete_rows = listRowDelete;

		if (preTitle !== "") {
			setTitle(preTitle);
			objGridMultiChoise.title = preTitle;
		}

		props.onCancel();
		props.getDataSection(objGridMultiChoise);
	};

	const editHandle = (e) => {
		e = window.event || e;
		props.onEdit();
	};

	const onClickCancel = (e) => {
		e = window.event || e;
		e.preventDefault();
		setRowLabel(currentRowLabel);
		setColumnLabel(currentColumnLabel);
		props.onCancel();
	};

	return (
		<>
			{props.isEdit ? (
				<div>
					<div>
						<p className="title-question">
							Câu {props.stt + 1}. {title}
						</p>{" "}
						<Input
							style={{ marginBottom: "10px", height: "38px" }}
							type="text"
							onChange={handleChange}
							defaultValue={title}
						/>
					</div>
					<label>Nhãn hàng</label>
					{rowLabel.map((item, idx) => {
						return (
							<div key={`$row-${item.unique}`} style={{ marginBottom: "7px" }}>
								{idx + 1}.{" "}
								<Input
									style={{ width: "80%", marginRight: "10px" }}
									onChange={(e) => handleChangeRowLabel(e, idx)}
									defaultValue={item.title}
								/>
								<AddCircleOutline
									style={{ cursor: "pointer" }}
									onClick={addRowLabel}
								/>
								{rowLabel.length > 1 && (
									<RemoveCircleOutline
										style={{ cursor: "pointer" }}
										onClick={(e) => removeRowLabel(e, idx)}
									/>
								)}
							</div>
						);
					})}

					<label style={{ marginLeft: "15px" }}>Nhãn cột</label>

					{columnLabel.map((item, idx) => {
						return (
							<div
								key={`$col-${item.unique}`}
								style={{ marginBottom: "7px", marginTop: "5px" }}
							>
								{idx + 1}.{" "}
								<Input
									style={{ width: "80%", marginRight: "10px" }}
									defaultValue={item.title}
									onChange={(e) => handleChangeColumnLabel(e, idx)}
								/>
								<AddCircleOutline
									style={{ cursor: "pointer" }}
									onClick={(e) => addColumnLabel()}
								/>
								{columnLabel.length > 1 && (
									<RemoveCircleOutline
										style={{ cursor: "pointer" }}
										onClick={(e) => removeColumnLabel(e, idx)}
									/>
								)}
							</div>
						);
					})}

					<div style={{ marginTop: "10px", marginLeft: "15px" }}>
						<Button
							style={{ marginRight: "5px " }}
							size="small"
							onClick={onClickCancel}
						>
							Cancel
						</Button>
						<Button type="primary" size="small" onClick={onClickSave}>
							Save
						</Button>
					</div>
				</div>
			) : (
				<>
					<p className="title-question">
						Câu {props.stt + 1}. {title}
					</p>
					<div onClick={editHandle} style={{ cursor: "pointer" }}>
						<table>
							<thead>
								<tr>
									<th></th>
									{columnLabel.map((e, i) => {
										return (
											<th
												key={i}
												className="td-table-create-question th-table-question-view"
											>
												{e.title}
											</th>
										);
									})}
								</tr>
							</thead>
							<tbody>
								{rowLabel.map((item, i) => {
									return (
										<tr key={i}>
											<td className="td-table-create-question">{item.title}</td>
											{columnLabel.map((sub, i) => {
												return (
													<td
														key={i}
														style={{
															margin: "auto",
															textAlign: "center",
															border: "solid",
															borderWidth: "thin",
														}}
													>
														<Checkbox />
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</>
			)}
		</>
	);
};

export default GridMultiChoise;
