import React, { useState } from "react";
import { Checkbox, Button, Input } from "antd";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import { connect } from "react-redux";
import * as actions from './../../store/actions/index';

let indexRow = 4;
const MultiChoise = (props) => {
	const [isEdit, setEdit] = useState(false);
	const [preTitle, setPreTitle] = useState();
	const [preRowLabel, setPreRowLabel] = useState();
	const [title, setTitle] = useState(
		"Do you have any other comments, questions, or concerns?"
	);
	const [rowLabel, setRowLabel] = useState([
		{ id: 1, content: "rowlabel 1" },
		{ id: 2, content: "rowlabel 2" },
		{ id: 3, content: "rowlabel 3" },
	]);

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

	const addRowLabel = () => {
		let id = indexRow++;
		let content = "";
		let data = [...rowLabel];
		data.push({ id, content });
		setRowLabel(data);
	};

	const removeRowLabel = (e, id) => {
		e.preventDefault();
		let data = [...rowLabel];
		data = data.filter((item) => item.id !== id);
		setRowLabel(data);
	};

	const onClickSave = (e) => {
		e = window.event || e;
		e.preventDefault();
		setEdit(false);

		let dataRow = [...rowLabel];
		dataRow = dataRow.filter((item) => item.content !== "");
		setRowLabel(dataRow);
		props.onStateAdded({ dataRow, title });
	};

	const editHandle = (e) => {
		e = window.event || e;
		e.preventDefault();
		setEdit(true);
		setPreRowLabel(rowLabel);
		setPreTitle(title);
	};

	const onClickCancel = (e) => {
		e = window.event || e;
		e.preventDefault();
		setEdit(false);
		setRowLabel(preRowLabel);
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
									style={{ width: "70%", marginRight: "10px" }}
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
					<div>
						<Button
							style={{marginRight: '5px' }}
							size="small"
							onClick={(e) => onClickCancel(e)}
						>
							Cancel
						</Button>
						<Button
							type="primary"
							size="small"
							onClick={(e) => onClickSave(e)}
						>
							Save
						</Button>
					</div>
				</div>
			) : (
				<>
					{props.stt}.{title}
					<div onClick={(e) => editHandle(e)} style={{ cursor: "pointer" }}>
						{rowLabel.map((item, i) => {
							return (
								<>
									<div key={i}>
										<Checkbox key={item.id} /> {item.content}
									</div>
								</>
							);
						})}
					</div>
				</>
			)}
		</>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		onStateAdded: (value) => dispatch(actions.addStateMultiChoice(value)),
	};
};

export default connect(null, mapDispatchToProps)(MultiChoise);
