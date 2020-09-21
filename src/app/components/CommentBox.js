import React, { useState } from "react";
import { Input, Button } from "antd";

const CommentBox = (props) => {
  const [title, setTitle] = useState(
    "Do you have any other comments, questions, or concerns? test"
  );
  const [titleUpdate, setTitleUpdate] = useState("");
  const { TextArea } = Input;

  let data = {
    id: props.id,
    title: title,
    note: "",
    parent_id: 0,
    have_child: false,
    type: 1,
    input_type_id: props.type,
  };

  const handleChangeCommentBox = (e) => {
    setTitleUpdate(e.target.value);
  };

  const handleSaveCommentBox = (e) => {
    if (titleUpdate !== "") {
      setTitle(titleUpdate);
    }
    props.getDataSection(data);
    props.onCancel();
  };

  return (
    <>
      {props.isEdit ? (
        <div style={{ width: "100%", height: "100px" }}>
          <div>
            <Input
              style={{ marginBottom: "10px" }}
              onChange={handleChangeCommentBox}
              defaultValue={title}
              className="col-md-12"
            />
          </div>
          <Button
            style={{ marginRight: '5px' }}
            size="small"
            onClick={props.onCancel}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={handleSaveCommentBox}
          >
            Save
          </Button>
        </div>
      ) : (
          <div>
            <div onClick={props.onEdit} style={{ cursor: "pointer", marginTop: '10px' }}>
              Câu {props.stt + 1}. {title}.
              <TextArea rows={4} />
            </div>
          </div>
        )}
    </>
  );
};

export default CommentBox;
