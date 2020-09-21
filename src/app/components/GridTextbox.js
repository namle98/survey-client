import React, { useState } from "react";
import { Input, Button } from "antd";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

let index = 1;
let indexRow = 4;
let indexColumn = 3;
let currentRowLabel = [];
let currentColumnLabel = [];
const GridTextbox = (props) => {
  const [isEdit, setEdit] = useState(false);
  const [title, setTitle] = useState(
    "Do you have any other comments, questions, or concerns?"
  );
  const [titleUpdate, setTitleUpdate] = useState("");
  const [rowLabel, setRowLabel] = useState([
    { id: 1, content: "rowlabel 1" },
    { id: 2, content: "rowlabel 2" },
    { id: 3, content: "rowlabel 3" },
  ]);
  const [columnLabel, setColumnLabel] = useState([
    { id: 1, content: "columnLabel 1" },
    { id: 2, content: "columnLabel 2" },
  ]);

  let data = {
    id: "abcd-efgh-mlqt-xzyx_question_3",
    title: "Trong quá trình sản xuất, kinh doanh, thương mại...?",
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

  const handleChangeTextbox = (e) => {
    setTitleUpdate(e.target.value);
  };
  const handleChangeTextboxRowLabel = (id, evn) => {
    let currenId = rowLabel
      .map((e) => {
        return e.id;
      })
      .indexOf(id);
    let newRowLabel = [...rowLabel];
    newRowLabel[currenId] = {
      ...newRowLabel[currenId],
      content: evn.target.value,
    };
    setRowLabel(newRowLabel);
  };

  const handleChangeTextboxColumnLabel = (id, evn) => {
    let currenId = columnLabel
      .map((e) => {
        return e.id;
      })
      .indexOf(id);
    let newColumnLabel = [...columnLabel];
    newColumnLabel[currenId] = {
      ...newColumnLabel[currenId],
      content: evn.target.value,
    };
    setColumnLabel(newColumnLabel);
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

  const handleCancelGridTextbox = () => {
    setRowLabel(currentRowLabel);
    setColumnLabel(currentColumnLabel);
    props.onCancel();
  };

  const handleSaveGridTextbox = () => {
    currentRowLabel = [...rowLabel];
    currentColumnLabel = [...columnLabel];
    currentColumnLabel.map((e, i) => {
      columns.title = e.content;
      columns.note = e.content;
      columns.index = i;
      data.question_columns.push(columns);
      columns = {};
    });

    currentRowLabel.map((e, i) => {
      row.note = e.content;
      row.title = e.content;
      data.question_row.push(row);
      row = {};
    });
    if (titleUpdate !== "") {
      setTitle(titleUpdate);
    }
    props.onCancel();
    props.getDataSection(data);
  };

  return (
    <>
      {/* {props.stt}.{title} */}
      {props.isEdit ? (
        <div>
          {/* <div>
            <Input
              style={{ marginBottom: "10px" }}
              type="text"
              onChange={handleChangeTextbox}
              defaultValue={title}
            />
          </div> */}
          <label>Row label</label>
          {rowLabel.map((e, i) => {
            return (
              <div key={i}>
                <Input
                  style={{ width: "70%", marginRight: "10px" }}
                  onChange={(evn) => handleChangeTextboxRowLabel(e.id, evn)}
                  defaultValue={e.content}
                />
                <AddCircleOutlineIcon
                  style={{ cursor: "pointer" }}
                  onClick={addRowLabel}
                />
              </div>
            );
          })}
          <label>Columns label</label>
          {columnLabel.map((e, i) => {
            return (
              <div key={i}>
                <Input
                  style={{ width: "70%", marginRight: "10px" }}
                  defaultValue={e.content}
                  onChange={(evn) => handleChangeTextboxColumnLabel(e.id, evn)}
                />
                <AddCircleOutlineIcon
                  style={{ cursor: "pointer" }}
                  onClick={addColumnLabel}
                />
              </div>
            );
          })}
          <div style={{ marginTop: "10px" }}>
            <Button
              style={{ marginRight: '5px' }}
              size="small"
              onClick={handleCancelGridTextbox}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={handleSaveGridTextbox}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
          <>
            Câu {props.stt + 1}. {title}.
            <div onClick={props.onEdit} style={{ cursor: "pointer" }}>
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
                  {rowLabel.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>{e.content}</td>
                        {columnLabel.map((e, i) => {
                          return (
                            <td key={i}>
                              <Input />
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

export default GridTextbox;
