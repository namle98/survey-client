import React, { useState } from "react";
import { Input, Button } from "antd";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import { connect } from "react-redux";
import * as actions from './../../store/actions/index';

let indexRow = 4;
let indexColumn = 3;
const GridTextbox = (props) => {
	const [isEdit, setEdit] = useState(false);
	const [title, setTitle] = useState(
		"Do you have any other comments, questions, or concerns?"
	);
	const [titleUpdate, setTitleUpdate] = useState("");
	const [rowLabel, setRowLabel] = useState([{ id: 1, content: "rowlabel 1" }]);
	const [columnLabel, setColumnLabel] = useState([
		{ id: 1, content: "columnLabel 1" },
	]);

	const handleClick = (handle) => {
		switch (handle) {
			case "edit":
				setEdit(true);
				break;
			case "cancel":
				setEdit(false);
				break;
			default:
		}
	};

	const handleChangeTextbox = (e) => {
		setTitleUpdate(e.target.value);
	};
	const handleChangeTextboxRowLabel = (id, evn) => {
		let currenId = rowLabel
			.map((e) => {
				return e.id;
			})
			.indexOf(id);
		let newRowLabel = [...rowLabel];
		newRowLabel[currenId] = {
			...newRowLabel[currenId],
			content: evn.target.value,
		};

		setRowLabel(newRowLabel);
	};

	const handleChangeTextboxColumnLabel = (id, evn) => {
		let currenId = columnLabel
			.map((e) => {
				return e.id;
			})
			.indexOf(id);
		let newColumnLabel = [...columnLabel];
		newColumnLabel[currenId] = {
			...newColumnLabel[currenId],
			content: evn.target.value,
		};
		setColumnLabel(newColumnLabel);
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

	const handleSaveGridTextbox = () => {
		setTitle(titleUpdate);
		setEdit(false);

		let dataRow = [...rowLabel];
		dataRow = dataRow.filter((item) => item.content !== "");
		setRowLabel(dataRow);

		let dataColumn = [...columnLabel];
		dataColumn = dataColumn.filter((item) => item.content !== "");
		setColumnLabel(dataColumn);
		props.onStateAdded({ dataColumn, dataRow, title: titleUpdate });
	};
	const removeColumnLabel = (e, id) => {
		e.preventDefault();
		let data = [...columnLabel];
		data = data.filter((item) => item.id !== id);
		setColumnLabel(data);
	};
	const removeRowLabel = (e, id) => {
		e.preventDefault();
		let data = [...rowLabel];
		data = data.filter((item) => item.id !== id);
		setRowLabel(data);
	};

	return (
		<>
			{props.stt}.{title}
			{isEdit ? (
				<div>
					<div>
						<Input
							style={{ marginBottom: "10px" }}
							type="text"
							onChange={handleChangeTextbox}
							defaultValue={title}
						/>
					</div>
					<label>Row label</label>
					{rowLabel.map((e, i) => {
						return (
							<div key={i}>
								<Input
									style={{ width: "70%", marginRight: "10px" }}
									onChange={(evn) => handleChangeTextboxRowLabel(e.id, evn)}
									defaultValue={e.content}
								/>
								{/* <Icon style={{ fontSize: 30 }}>add_circle</Icon> */}
								<AddCircleOutline
									style={{ cursor: "pointer" }}
									onClick={addRowLabel}
								/>
								{rowLabel.length > 1 && (
									<RemoveCircleOutline
										style={{ cursor: "pointer" }}
										onClick={(env) => removeRowLabel(env, e.id)}
									/>
								)}
							</div>
						);
					})}
					<label>Columns label</label>
					{columnLabel.map((e, i) => {
						return (
							<div key={i}>
								<Input
									style={{ width: "70%", marginRight: "10px" }}
									defaultValue={e.content}
									onChange={(evn) => handleChangeTextboxColumnLabel(e.id, evn)}
								/>
								<AddCircleOutline
									style={{ cursor: "pointer" }}
									onClick={addColumnLabel}
								/>
								{columnLabel.length > 1 && (
									<RemoveCircleOutline
										style={{ cursor: "pointer" }}
										onClick={(env) => removeColumnLabel(env, e.id)}
									/>
								)}
							</div>
						);
					})}
					<div>
						<Button
							style={{marginRight: '5px'}}
							size="small"
							onClick={() => handleClick("cancel")}
						>
							Cancel
						</Button>
						<Button
							type="primary"
							size="small"
							onClick={handleSaveGridTextbox}
						>
							Save
						</Button>
					</div>
				</div>
			) : (
					<div onClick={() => handleClick("edit")} style={{ cursor: "pointer" }}>
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
								{rowLabel.map((e, i) => {
									return (
										<tr key={i}>
											<td>{e.content}</td>
											{columnLabel.map((e, i) => {
												return (
													<td key={i}>
														<Input />
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
		</>
	);
};
const mapDispatchToProps = (dispatch) => {
	return {
		onStateAdded: (value) => dispatch(actions.addStateGridTextBox(value)),
	};
};

export default connect(null, mapDispatchToProps)(GridTextbox);
