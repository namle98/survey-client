import React, { useState } from "react";
import { Input, Button } from "antd";
import { connect } from 'react-redux';
import * as actions from './../../store/actions/index';

const CommentBox = (props) => {
  const [isEdit, setEdit] = useState(false);
  const [title, setTitle] = useState(
    "Do you have any other comments, questions, or concerns?"
  );
  const [titleUpdate, setTitleUpdate] = useState("");
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
    setTitleUpdate(e.target.value);
  };

  const handleSaveCommentBox = (e) => {
    setTitle(titleUpdate);
    setEdit(false);
    props.onStateAdded(titleUpdate);
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
          <Button
            style={{ right: "6%", top: "105px" }}
            size="small"
            onClick={() => handleClick("cancel")}
          >
            Cancel
          </Button>
          <Button
            style={{ right: "0px", top: "105px" }}
            type="primary"
            size="small"
            onClick={handleSaveCommentBox}
          >
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
              <TextArea rows={4} />
            </div>
          </div>
        )}
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onStateAdded: (value) => dispatch(actions.addStateCommentBox(value)),
  }
}

export default connect(null, mapDispatchToProps)(CommentBox);
