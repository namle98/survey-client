import React, { useState } from "react";
import { Input, Button } from "antd";
import { COMMENT_BOX } from '../config/common/TypeOfInput';
import { showErrorMessage } from "../actions/notification";

import { showErrorMessage } from "../actions/notification";
const CommentBox = (props) => {
  const [title, setTitle] = useState(
    props.title
  );
  const [titleUpdate, setTitleUpdate] = useState(props.title);
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
<<<<<<< HEAD
    if (titleUpdate === "") {
      return showErrorMessage("Lỗi ");
      
     }
    
       else {
        setTitle(titleUpdate);
        data.title = titleUpdate;
      
      props.getDataSection(data);
      props.onCancel();
     }


=======
    if (titleUpdate !== "" && title != "") {
      setTitle(titleUpdate);
      data.title = titleUpdate;

      props.getDataSection(data);
      props.onCancel();
    }
    else {
      return showErrorMessage("Điền đầy đủ thông tin")
    }
>>>>>>> 4aa31c5a69cb74d291655c41adf522eaafcfaddc
  };

  return (
    <>
      {props.isEdit ? (
        <div style={{ width: "100%", height: "100px" }}>
          <div style={{ marginTop: '5px' }}>
            <p className='title-question'>Câu {props.stt + 1}. {title}</p>
            <Input
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
