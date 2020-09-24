import React, { useState, useEffect } from "react";
import { Radio, Button, Input } from "antd";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import { connect } from "react-redux";
import { updateMultiForm } from "./../../libs/utils";
import * as actions from "./../../store/actions/index";

let indexRow = 4;
let indexColumn = 3;
const GridSingleChoise = (props) => {
	const updateTitle = props.dataUpdate
		? props.dataUpdate.title
		: "Do you have any other comments, questions, or concerns?";

	const { updateColumLabel, updateRowLabel } = updateMultiForm(
		props.dataUpdate
			? props.dataUpdate.question_columns
				? props.dataUpdate.question_columns
				: null
			: null,
		props.dataUpdate
			? props.dataUpdate.question_row
				? props.dataUpdate.question_row
				: null
			: null,
		[
			{ id: 1, content: "columnLabel 1" },
			{ id: 2, content: "columnLabel 2" },
		],
		[
			{ id: 1, content: "rowlabel 1" },
			{ id: 2, content: "rowlabel 2" },
			{ id: 3, content: "rowlabel 3" },
		]
	);
	const [title, setTitle] = useState(updateTitle);
	const [rowLabel, setRowLabel] = useState(updateRowLabel);
	const [columnLabel, setColumnLabel] = useState(updateColumLabel);

	useEffect(() => {
		setTitle(updateTitle);
		setRowLabel(updateRowLabel);
		setColumnLabel(updateColumLabel);
		props.onStateAdded({
			dataRow: updateRowLabel,
			dataColumn: updateColumLabel,
			title: updateTitle,
		});
	}, [updateTitle]);

	const [isEdit, setEdit] = useState(false);
	const [preTitle, setPreTitle] = useState();
	const [preRowLabel, setPreRowLabel] = useState();
	const [preColumnLabel, setPreColumnLabel] = useState();

	const handleChange = (e) => {
		e.preventDefault();
		setTitle(e.target.value);
	};

	const handleChangeRowLabel = (e, id) => {
		e = window.event || e;
		e.preventDefault();

		let row = [...rowLabel];
		let objUpdate = row.findIndex((item) => item.id === id);
		row[objUpdate].content = e.target.value;
		setRowLabel(row);
	};

	const handleChangeColumnLabel = (e, id) => {
		e = window.event || e;
		e.preventDefault();

		let row = [...columnLabel];
		let objUpdate = row.findIndex((item) => item.id === id);
		row[objUpdate].content = e.target.value;
		setColumnLabel(row);
	};

	const addRowLabel = () => {
		let id = indexRow++;
		let content = "";
		let data = [...rowLabel];
		data.push({ id, content });
		setRowLabel(data);
	};

	const addColumnLabel = () => {
		let id = indexColumn++;
		let content = "";
		let data = [...columnLabel];
		data.push({ id, content });
		setColumnLabel(data);
	};

	const removeRowLabel = (e, id) => {
		e.preventDefault();
		let data = [...rowLabel];
		data = data.filter((item) => item.id !== id);
		setRowLabel(data);
	};

	const removeColumnLabel = (e, id) => {
		e.preventDefault();
		let data = [...columnLabel];
		data = data.filter((item) => item.id !== id);
		setColumnLabel(data);
	};

	const onClickSave = (e) => {
		e = window.event || e;
		e.preventDefault();
		setEdit(false);

		let dataColumn = [...columnLabel];
		dataColumn = dataColumn.filter((item) => item.content !== "");
		setColumnLabel(dataColumn);

		let dataRow = [...rowLabel];
		dataRow = dataRow.filter((item) => item.content !== "");
		setRowLabel(dataRow);
		props.onStateAdded({ dataColumn, dataRow, title });
	};

	const editHandle = (e) => {
		e = window.event || e;
		e.preventDefault();
		setEdit(true);
		setPreRowLabel(rowLabel);
		setPreColumnLabel(columnLabel);
		setPreTitle(title);
	};

	const onClickCancel = (e) => {
		e = window.event || e;
		e.preventDefault();
		setEdit(false);
		setRowLabel(preRowLabel);
		setColumnLabel(preColumnLabel);
		setTitle(preTitle);
	};

	return (
		<>
			{isEdit ? (
				<div>
					<div>
						<Input
							style={{ marginBottom: "10px" }}
							type="text"
							onChange={handleChange}
							defaultValue={title}
						/>
					</div>
					<label>Row label</label>
					{rowLabel.map((item, i) => {
						return (
							<div key={i}>
								<Input
									style={{ width: "80%", marginRight: "10px" }}
									onChange={(e) => handleChangeRowLabel(e, item.id)}
									defaultValue={item.content}
								/>
								<AddCircleOutline
									style={{ cursor: "pointer" }}
									onClick={addRowLabel}
								/>
								{rowLabel.length > 1 && (
									<RemoveCircleOutline
										style={{ cursor: "pointer" }}
										onClick={(e) => removeRowLabel(e, item.id)}
									/>
								)}
							</div>
						);
					})}
					<label>Tiêu đề cột</label>
					{columnLabel.map((item, idx) => {
						return (
							<div key={idx}>
								<Input
									style={{ width: "80%", marginRight: "10px" }}
									defaultValue={item.content}
									onChange={(e) => handleChangeColumnLabel(e, item.id)}
								/>
								<AddCircleOutline
									style={{ cursor: "pointer" }}
									onClick={(e) => addColumnLabel(e)}
								/>
								{columnLabel.length > 1 && (
									<RemoveCircleOutline
										style={{ cursor: "pointer" }}
										onClick={(e) => removeColumnLabel(e, item.id)}
									/>
								)}
							</div>
						);
					})}
					<div>
						<Button
							style={{ marginRight: "5px" }}
							size="small"
							onClick={(e) => onClickCancel(e)}
						>
							Cancel
						</Button>
						<Button type="primary" size="small" onClick={(e) => onClickSave(e)}>
							Save
						</Button>
					</div>
				</div>
			) : (
				<>
					{props.stt}.{title}
					<div onClick={(e) => editHandle(e)} style={{ cursor: "pointer" }}>
						<table>
							<thead>
								<tr>
									<th></th>
									{columnLabel.map((e, i) => {
										return <th key={i}>{e.content}</th>;
									})}
								</tr>
							</thead>
							<tbody>
								{rowLabel.map((item, i) => {
									return (
										<tr key={i}>
											<td>{item.content}</td>
											{columnLabel.map((sub, i) => {
												return (
													<td key={i}>
														<Radio />
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
const mapDispatchToProps = (dispatch) => {
	return {
		onStateAdded: (value) => dispatch(actions.addStateGridSigleChoice(value)),
	};
};

export default connect(null, mapDispatchToProps)(GridSingleChoise);
