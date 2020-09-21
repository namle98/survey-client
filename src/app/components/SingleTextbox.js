import React, { useState } from "react";
import { Input, Button } from "antd";

const SingleTextbox = (props) => {
  const [title, setTitle] = useState(
    "Do you have any other comments, questions, or concerns?"
  );
  const [titleUpdate, setTitleUpdate] = useState("");
  let data = {
    title: title,
    node: "single textbox",
    parent_id: 0,
    have_child: false,
    type: 1,
    input_type_id: props.type
  };

  const handleChangeTextbox = (e) => {
    setTitleUpdate(e.target.value);
  };

  const handleSaveTextbox = (e) => {
    if (titleUpdate !== "") {
      setTitle(titleUpdate);
    }
    props.onCancel();
    props.getDataSection(data);
  };

  return (
    <>
      {props.isEdit ? (
        <div>
          <Input
            style={{ marginBottom: "10px" }}
            type="text"
            onChange={handleChangeTextbox}
            defaultValue={title}
          />
          <Button
            style={{ marginRight: '5px' }}
            size="small"
            onClick={() => props.onCancel}
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
              Câu {props.stt + 1}. {title}.
              <Input type="text" />
            </div>
          </div>
        )}
    </>
  );
};

export default SingleTextbox;
