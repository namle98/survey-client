import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";

const SingleTextbox = (props) => {
	const [isEdit, setEdit] = useState(false);
	const [title, setTitle] = useState();
	const updateTile = props.dataUpdate
		? props.dataUpdate.title
		: "Do you have any other comments, questions, or concerns?";

	useEffect(() => {
		setTitle(updateTile);
		props.onStateAdded(updateTile);
	}, [updateTile]);

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
		setTitle(e.target.value);
	};

	const handleSaveTextbox = (e) => {
		setEdit(false);
		props.onStateAdded(title);
	};

	return (
		<>
			{isEdit ? (
				<div>
					<Input
						style={{ marginBottom: "10px" }}
						type="text"
						onChange={handleChangeTextbox}
						defaultValue={title}
					/>
					<Button
						style={{ marginRight: "5px" }}
						size="small"
						onClick={() => handleClick("cancel")}
					>
						Cancel
					</Button>
					<Button type="primary" size="small" onClick={handleSaveTextbox}>
						Save
					</Button>
				</div>
			) : (
				<div>
					<div
						onClick={() => handleClick("edit")}
						style={{ cursor: "pointer" }}
					>
						{props.stt}.{title}
						<Input type="text" />
					</div>
				</div>
			)}
		</>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		onStateAdded: (value) => dispatch(actions.addStateSigleTextBox(value)),
	};
};

export default connect(null, mapDispatchToProps)(SingleTextbox);
