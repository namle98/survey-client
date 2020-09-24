import React, { useState } from "react";
import { Input, Button } from "antd";
import { COMMENT_BOX } from '../config/common/TypeOfInput';

const CommentBox = (props) => {
  const [title, setTitle] = useState(
    props.title
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
    input_type_id: COMMENT_BOX,
  };

  const handleChangeCommentBox = (e) => {
    e = window.event || e;
    e.preventDefault();
    setTitleUpdate(e.target.value);
  };

  const handleSaveCommentBox = (e) => {
    if (titleUpdate !== "") {
      setTitle(titleUpdate);
      data.title = titleUpdate;
    }
    props.getDataSection(data);
    props.onCancel();
  };

  return (
    <>
      {props.isEdit ? (
        <div style={{ width: "100%", height: "100px" }}>
          <div style={{ marginTop: '5px' }}>
            <p className='title-question'>Câu {props.stt + 1}. {title}</p> <Input
              style={{ marginBottom: "10px", height: '38px' }}
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
            <div onClick={props.onEdit} style={{ cursor: "pointer", marginTop: '10px', marginBottom: '5px' }}>
              <p className='title-question'>Câu {props.stt + 1}. {title}</p>
              <TextArea rows={4} />
            </div>
          </div>
        )}
    </>
  );
};

export default CommentBox;
