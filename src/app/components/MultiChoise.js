import React, { useState } from "react";
import { Checkbox, Button, Input } from "antd";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";

let indexRow = 4;
let currentRowLabel = [];
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

  let data = {
    id: props.id,
    title: title,
    note: "",
    parent_id: 0,
    have_child: false,
    index: 1,
    type: 1, //1 là bình thường, 2 là mẫu
    input_type_id: props.type, // 4 là dạng multi select....
    question_choise: [],
  };

  let question = {};

  const handleChange = (e) => {
    e.preventDefault();
    setPreTitle(e.target.value);
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
    currentRowLabel = [...rowLabel];
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
    currentRowLabel = [...rowLabel];
    currentRowLabel.map((e, i) => {
      question.title = e.content;
      question.type = 1;
      question.index = i;
      data.question_choise.push(question);
      question = {};
    });
    if (preTitle !== "") {
      setTitle(preTitle);
    }
    props.onCancel();
    props.getDataSection(data);
  };

  const editHandle = (e) => {
    e = window.event || e;
    props.onEdit();
  };

  const onClickCancel = (e) => {
    e = window.event || e;
    e.preventDefault();
    setRowLabel(currentRowLabel);
    props.onCancel();
  };

  return (
    <>
      {props.isEdit ? (
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
          <div style={{ marginTop: "10px" }}>
            <Button
              style={{ marginRight: '5px' }}
              size="small"
              onClick={onClickCancel}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={onClickSave}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
          <>
            Câu {props.stt + 1}. {title}.
            <div onClick={editHandle} style={{ cursor: "pointer" }}>
              {rowLabel.map((item, i) => {
                return (
                  <>
                    <div key={i}>
                      <Checkbox /> {item.content}
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

export default MultiChoise;
