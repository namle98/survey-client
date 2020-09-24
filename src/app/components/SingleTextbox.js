import React, { useState } from "react";
import { Input, Button } from "antd";
import { SINGLE_TEXTBOX } from '../config/common/TypeOfInput';
import { showErrorMessage } from "../actions/notification";

const SingleTextbox = (props) => {
  const [title, setTitle] = useState(
    props.title
  );
  const [titleUpdate, setTitleUpdate] = useState("");
  let data = {
    id: props.id || '',
    title: title,
    node: "single textbox",
    parent_id: 0,
    have_child: false,
    type: 1,
    input_type_id: SINGLE_TEXTBOX
  };

  const handleChangeTextbox = (e) => {
    e = window.event || e;
    e.preventDefault();
    setTitleUpdate(e.target.value);

  };

  const handleSaveTextbox = (e) => {
    if (titleUpdate === "") {
     return showErrorMessage("Lỗi ");
     
    }
   
      else {
      setTitle(titleUpdate);
      data.title = titleUpdate;

      props.onCancel();
      props.getDataSection(data);
    }
    
  };




  return (
    <>
      {props.isEdit ? (
        <div style={{ marginTop: '5px', height: '100px' }}>
          <p className='title-question'>Câu {props.stt + 1}. {title}</p>
          <Input
            style={{ marginBottom: "10px", height: '38px' }}
            type="text"
            onChange={handleChangeTextbox}
            defaultValue={title}
          />
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
            onClick={handleSaveTextbox}

          >
            Save
          </Button>
        </div>
      ) : (
          <div>
            <div onClick={props.onEdit} style={{ cursor: "pointer" }}>
              <p className='title-question'>Câu {props.stt + 1}. {title}</p>
              <Input type="text" />
            </div>
          </div>
        )}
    </>
  );
};

export default SingleTextbox;
