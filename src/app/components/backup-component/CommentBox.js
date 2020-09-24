import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";

const CommentBox = (props) => {
	const [isEdit, setEdit] = useState(false);
	const [title, setTitle] = useState();
	const updateTitle = props.dataUpdate
		? props.dataUpdate.title
		: "Do you have any other comments, questions, or concerns?";

	useEffect(() => {
		setTitle(updateTitle);
		props.onStateAdded(updateTitle);
	}, [updateTitle]);

	const { TextArea } = Input;

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

	const handleChangeCommentBox = (e) => {
		setTitle(e.target.value);
	};

	const handleSaveCommentBox = (e) => {
		setEdit(false);
		props.onStateAdded(title);
	};

	return (
		<>
			{isEdit ? (
				<div>
					<TextArea
						style={{ marginBottom: "10px" }}
						rows={4}
						onChange={handleChangeCommentBox}
						defaultValue={title}
					/>
					<div>
						<Button size="small" onClick={() => handleClick("cancel")}>
							Cancel
						</Button>
						<Button type="primary" size="small" onClick={handleSaveCommentBox}>
							Save
						</Button>
					</div>
				</div>
			) : (
				<div>
					<div
						onClick={() => handleClick("edit")}
						style={{ cursor: "pointer" }}
					>
						{props.stt}.{title}
						<TextArea rows={4} />
					</div>
				</div>
			)}
		</>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		onStateAdded: (value) => dispatch(actions.addStateCommentBox(value)),
	};
};

export default connect(null, mapDispatchToProps)(CommentBox);
