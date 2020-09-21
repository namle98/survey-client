import React, { useState } from "react";
import { Checkbox, Button, Input } from "antd";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";

let indexRow = 4;
let indexColumn = 4;
let currentRowLabel = [];
let currentColumnLabel = [];

const GridMultiChoise = (props) => {
  const [isEdit, setEdit] = useState(false);
  const [preTitle, setPreTitle] = useState();
  const [title, setTitle] = useState(
    "Do you have any other comments, questions, or concerns?"
  );
  const [rowLabel, setRowLabel] = useState([
    { id: 1, content: "rowlabel 1" },
    { id: 2, content: "rowlabel 2" },
    { id: 3, content: "rowlabel 3" },
  ]);
  const [columnLabel, setColumnLabel] = useState([
    { id: 1, content: "columnLabel 1" },
    { id: 2, content: "columnLabel 2" },
    { id: 3, content: "columnLabel 3" },
  ]);

  let data = {
    id: "abcd-efgh-mlqt-xzyx_question_3",
    title: title,
    note: "",
    parent_id: 0,
    have_child: false,
    index: 1,
    type: 1, //1 là bình thường, 2 là mẫu
    input_type_id: props.type, // 8 là table_string....
    question_columns: [],
    question_row: [],
  };

  let columns = {};

  let row = {};

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

  const handleChangeColumnLabel = (e, id) => {
    e = window.event || e;
    e.preventDefault();

    let row = [...columnLabel];
    let objUpdate = row.findIndex((item) => item.id === id);
    row[objUpdate].content = e.target.value;
    setColumnLabel(row);
  };

  const addRowLabel = () => {
    let id = indexRow++;
    let content = "";
    let data = [...rowLabel];
    currentRowLabel = [...rowLabel];
    data.push({ id, content });
    setRowLabel(data);
  };

  const addColumnLabel = () => {
    let id = indexColumn++;
    let content = "";
    let data = [...columnLabel];
    currentColumnLabel = [...columnLabel];
    data.push({ id, content });
    setColumnLabel(data);
  };

  const removeRowLabel = (e, id) => {
    e.preventDefault();
    let data = [...rowLabel];
    data = data.filter((item) => item.id !== id);
    setRowLabel(data);
  };

  const removeColumnLabel = (e, id) => {
    e.preventDefault();
    let data = [...columnLabel];
    data = data.filter((item) => item.id !== id);
    setColumnLabel(data);
  };

  const onClickSave = (e) => {
    e = window.event || e;
    e.preventDefault();
    currentColumnLabel = [...columnLabel];
    currentRowLabel = [...rowLabel];
    columnLabel.map((e, i) => {
      columns.title = e.content;
      columns.note = e.content;
      columns.index = i;
      data.question_columns.push(columns);
      columns = {};
    });

    rowLabel.map((e, i) => {
      row.note = e.content;
      row.title = e.content;
      data.question_row.push(row);
      row = {};
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
    setColumnLabel(currentColumnLabel);
    props.onCancel();
  };

  const onEdit = () => {
    setEdit(true);
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
          <label>Columns label</label>
          {columnLabel.map((item, idx) => {
            return (
              <div key={idx}>
                <Input
                  style={{ width: "70%", marginRight: "10px" }}
                  defaultValue={item.content}
                  onChange={(e) => handleChangeColumnLabel(e, item.id)}
                />
                <AddCircleOutline
                  style={{ cursor: "pointer" }}
                  onClick={(e) => addColumnLabel(e)}
                />
                {columnLabel.length > 1 && (
                  <RemoveCircleOutline
                    style={{ cursor: "pointer" }}
                    onClick={(e) => removeColumnLabel(e, item.id)}
                  />
                )}
              </div>
            );
          })}
          <div style={{ marginTop: "10px" }}>
            <Button
              style={{ paddingRight: '5px ' }}
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
            Câu {props.stt + 1}. {title}
            <div onClick={editHandle} style={{ cursor: "pointer" }}>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    {columnLabel.map((e, i) => {
                      return <th key={i}>{e.content}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {rowLabel.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.content}</td>
                        {columnLabel.map((sub, i) => {
                          return (
                            <td key={i}>
                              <Checkbox />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
    </>
  );
};

export default GridMultiChoise;
