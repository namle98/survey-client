import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutline from "@material-ui/icons/RemoveCircleOutline";
import { STRING, GRID_TEXTBOX } from '../config/common/TypeOfInput';
import { generateRandomCode } from '../libs/random';
import './QuestionItem.scss';
import { showErrorMessage } from "../actions/notification";
import { whiteSpace } from "../libs/utils";

const GridTextbox = (props) => {
  const [title, setTitle] = useState(
    props.title
  );

  const [titleUpdate, setTitleUpdate] = useState(props.title)
  const [currentRowLabel, setCurrentRowLabel] = useState([]);
  const [currentColumnLabel, setSurrentColumnLabel] = useState([]);
  const [listRowDelete, setListRowDelete] = useState([]);
  const [listColDelete, setListColDelete] = useState([]);

  const [rowLabel, setRowLabel] = useState([
    { title: "Nội dung hàng 1", unique: 'abcdefgh' },
    { title: "Nội dung hàng 2", unique: 'iklmnopq' },
    { title: "Nội dung hàng 3", unique: 'rstuvxyz' }
  ]);

  const [columnLabel, setColumnLabel] = useState([
    { title: "Nội dung cột 1", type: STRING, unique: 'abcdefgh' },
    { title: "Nội dung cột 2", type: STRING, unique: 'iklmnopq' },
  ]);

  const componentDidMount = () => {
    console.log("GRID TEXT")
    if (props.item && props.item.question_row) {
      let rowItem = props.item.question_row.map(item => {
        return {
          id: item.id,
          title: item.title
        }
      });
      setCurrentRowLabel([...rowItem]);
      setRowLabel(rowItem);
    } else {
      setCurrentRowLabel(rowLabel);
    }

    if (props.item && props.item.question_columns) {
      let columnItem = props.item.question_columns.map(item => {
        return {
          id: item.id,
          title: item.title,
          type: item.type
        }
      });
      setSurrentColumnLabel([...columnItem]);
      setColumnLabel(columnItem);
    } else {
      setSurrentColumnLabel(columnLabel);
    }
  }

  useEffect(componentDidMount, []);

  let objGridTextbox = {
    id: props.id || '',
    title: title,
    note: "",
    parent_id: 0,
    have_child: false,
    index: 1,
    type: 1, //1 là bình thường, 2 là mẫu
    input_type_id: GRID_TEXTBOX, // 8 là table_string....
    question_columns: [],
    question_row: []
  };

  const handleChangeTextbox = (e) => {
    e = window.event || e;
    e.preventDefault();
    setTitleUpdate(e.target.value);
  };
  const handleChangeTextboxRowLabel = (e, idx) => {
    let newRowLabel = [...rowLabel];
    newRowLabel[idx].title = e.target.value;
    setRowLabel(newRowLabel);
  };

  const handleChangeTextboxColumnLabel = (e, idx) => {
    let objCol = [...columnLabel]
    objCol[idx].title = e.target.value;
    setColumnLabel(objCol);
  };

  const addRowLabel = () => {
    let title = "";
    let unique = generateRandomCode(6);
    let data = [...rowLabel];
    data.push({ title, unique });
    setRowLabel(data);
  };

  const addColumnLabel = () => {
    let title = "";
    let unique = generateRandomCode(6);
    let data = [...columnLabel];
    data.push({ title, type: STRING, unique });
    setColumnLabel(data);
  };

  const handleCancelGridTextbox = () => {
    setRowLabel(currentRowLabel);
    setColumnLabel(currentColumnLabel);
    props.onCancel();
  };

  const handleSaveGridTextbox = (e) => {
    e = window.event || e;
    e.preventDefault();
    if (titleUpdate != "") {
      setCurrentRowLabel([...rowLabel]);
      setSurrentColumnLabel([...columnLabel]);
      currentColumnLabel.forEach((e, i) => {
        if (e.title != "" && whiteSpace(e.title) > 0) {
          let column = {};
          column.id = e.id;
          column.title = e.title;
          column.note = e.title;
          column.index = i;
          column.type = e.type;
          objGridTextbox.question_columns.push(column);
        } else {
          return showErrorMessage("Điền đầy đủ thông tin cột " + (i + 1))

        }
      });
      if (columnLabel.length != objGridTextbox.question_columns.length) {
        return 0;
      }
      objGridTextbox.delete_cols = listColDelete;

      currentRowLabel.forEach((e, i) => {
        if (e.title != "" && whiteSpace(e.title) > 0) {
          let row = {};
          row.id = e.id || '';
          row.note = e.note;
          row.title = e.title;
          objGridTextbox.question_row.push(row);
        } else {
          return showErrorMessage("Điền đầy đủ thông tin dòng" + (i + 1))

        }
      });
      if (rowLabel.length != objGridTextbox.question_row.length) {
        return 0;
      }
      objGridTextbox.delete_rows = listRowDelete;

      if (titleUpdate !== "") {
        setTitle(titleUpdate);
        objGridTextbox.title = titleUpdate;
      }
      props.getDataSection(objGridTextbox);
      props.onCancel();
    } else { return showErrorMessage("Điền đầy đủ thông tin") }
  };

  const removeRowLabel = (e, idx) => {
    e.preventDefault();
    let data = [...rowLabel];
    if (data[idx].id) {
      let listRowDel = [...listRowDelete];
      listRowDel.push(data[idx]);
      setListRowDelete(listRowDel);
    }
    let datafilter = data.filter((_item, index) => {
      if (index !== idx) {
        return true;
      }
      return false;
    });
    setRowLabel(datafilter);
  };

  const removeColumnLabel = (e, idx) => {
    e.preventDefault();
    let data = [...columnLabel];
    if (data[idx].id) {
      let listColDel = [...listColDelete];
      listColDel.push(data[idx]);
      setListColDelete(listColDel);
    }
    let datafilter = data.filter((_item, index) => {
      if (index !== idx) {
        return true;
      }
      return false;
    });
    setColumnLabel(datafilter);
  };

  return (
    <>
      {props.isEdit ? (
        <div>
          <div style={{ marginTop: '5px' }}>
            <p className='title-question'>Câu {props.stt + 1}. {title}</p> <Input
              style={{ marginBottom: "10px", height: '38px' }}
              type="text"
              onChange={handleChangeTextbox}
              defaultValue={title}
            />
          </div>
          <label style={{ marginLeft: '15px' }}>Nhãn hàng</label>
          {rowLabel.map((item, idx) => {
            return (
              <div key={`$row-${item.unique}`} style={{ marginBottom: '7px' }}>
                {idx + 1}.<Input
                  style={{ width: "80%", marginRight: "10px" }}
                  onChange={(e) => handleChangeTextboxRowLabel(e, idx)}
                  defaultValue={item.title}
                />
                <AddCircleOutlineIcon
                  style={{ cursor: "pointer" }}
                  onClick={addRowLabel}
                />
                {rowLabel.length > 1 && (
                  <RemoveCircleOutline
                    style={{ cursor: "pointer" }}
                    onClick={(e) => removeRowLabel(e, idx)}
                  />
                )}
              </div>
            );
          })}
          <label style={{ marginLeft: '15px' }}>Nhãn cột</label>
          {columnLabel.map((item, idx) => {
            return (
              <div key={`$col-${item.unique}`} style={{ marginBottom: '7px' }}>
                {idx + 1}. <Input
                  style={{ width: "80%", marginRight: "10px" }}
                  defaultValue={item.title}
                  onChange={(e) => handleChangeTextboxColumnLabel(e, idx)}
                />
                <AddCircleOutlineIcon
                  style={{ cursor: "pointer" }}
                  onClick={addColumnLabel}
                />
                {columnLabel.length > 1 && (
                  <RemoveCircleOutline
                    style={{ cursor: "pointer" }}
                    onClick={(e) => removeColumnLabel(e, idx)}
                  />
                )}
              </div>
            );
          })}
          <div style={{ marginTop: "10px", marginLeft: '15px' }}>
            <Button
              style={{ marginRight: '5px' }}
              size="small"
              onClick={handleCancelGridTextbox}
            >
              Hủy bỏ
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
            <p className='title-question'>Câu {props.stt + 1}. {title}</p>
            <div onClick={props.onEdit} style={{ cursor: "pointer" }}>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    {columnLabel.map((e, i) => {
                      return <th key={i} style={{ margin: 'auto', textAlign: 'center', border: 'solid', borderWidth: 'thin' }} className='th-table-question-view'>{e.title}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {rowLabel.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td className='td-table-create-question'>{e.title}</td>
                        {columnLabel.map((e, i) => {
                          return (
                            <td key={i} style={{ margin: 'auto', textAlign: 'center', border: 'solid', borderWidth: 'thin' }}>
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
