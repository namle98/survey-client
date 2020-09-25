import React, { useState, useEffect } from "react";
import { Button, Input, Radio } from "antd";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import { RADIO, SINGLE_CHOISE } from '../config/common/TypeOfInput';
import { generateRandomCode } from '../libs/random';
import { showErrorMessage } from "../actions/notification";

const SingleChoise = (props) => {

  const [currentRowLabel, setCurrentRowLabel] = useState([]);
  const [preTitle, setPreTitle] = useState(props.title);
  const [title, setTitle] = useState(
    props.title
  );
  const [listDelete, setListDelete] = useState([]);

  const [rowLabel, setRowLabel] = useState([
    { title: "Nội dung hàng 1", unique: 'abcdefgh' },
    { title: "Nội dung hàng 2", unique: 'iklmnopq' },
    { title: "Nội dung hàng 3", unique: 'rstuvxyz' },
  ]);

  let objSingleChoise = {
    id: props.id,
    title: title,
    note: "",
    parent_id: 0,
    have_child: false,
    index: 1,
    type: 1, //1 là bình thường, 2 là mẫu
    input_type_id: SINGLE_CHOISE, // 4 là dạng multi select....
    question_choise: [],
  };

  const componentDidMount = () => {
    if (props.item && props.item.question_choise) {
      let rowItem = props.item.question_choise.map(item => {
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
  }

  useEffect(componentDidMount, []);

  const handleChange = (e) => {
    e = window.event || e;
    e.preventDefault();
    setPreTitle(e.target.value);
    console.log("pre " + preTitle)
  };

  const handleChangeRowLabel = (e, idx) => {
    e = window.event || e;
    e.preventDefault();
    let row = [...rowLabel];
    row[idx].title = e.target.value;
    setRowLabel(row);
  };

  const addRowLabel = () => {
    let unique = generateRandomCode(6);
    let title = "";
    let data = [...rowLabel];
    setCurrentRowLabel([...rowLabel]);
    data.push({ title, unique });
    setRowLabel(data);
  };

  const removeRowLabel = (e, idx) => {
    e.preventDefault();
    let data = [...rowLabel];
    if (data[idx].id) {
      let delItem = data[idx];
      let listDel = [...listDelete];
      listDel.push(delItem);
      setListDelete(listDel);
    }
    let datafilter = data.filter((_item, index) => {
      if (index !== idx) {
        return true;
      }
      return false;
    });
    setRowLabel(datafilter);
  };

  const onClickSave = (e) => {
    e = window.event || e;
    e.preventDefault();
    if (preTitle != "") {
      setCurrentRowLabel([...rowLabel]);
      rowLabel.forEach((e, i) => {
        if (e.title != "") {
          console.log("100   " + e.title)
          let question = {};
          question.id = e.id || '';
          question.title = e.title;
          question.type = RADIO;
          question.index = i;
          question.input_type_id = SINGLE_CHOISE;
          objSingleChoise.question_choise.push(question);
        }
      });
      if(objSingleChoise.question_choise.length!=rowLabel.length){
        return showErrorMessage("Điền đầy đủ thông tin")
      }
      objSingleChoise.delete_choises = listDelete;
      if (preTitle !== "") {
        setTitle(preTitle);
        objSingleChoise.title = preTitle;
      }
      console.log(JSON.stringify(objSingleChoise))
      props.onCancel();
      props.getDataSection(objSingleChoise);
    }
    else {
      return showErrorMessage("Điền đầy đủ thông tin")
    }
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
          <div style={{ marginTop: '5px' }}>
            <p className='title-question'>Câu {props.stt + 1}. {title}</p>
            <Input
              style={{ marginBottom: "10px", height: '38px' }}
              type="text"
              onChange={handleChange}
              defaultValue={title}
            />
          </div>
          <label style={{ marginLeft: '15px' }}>Nhãn hàng</label>
          {rowLabel.map((item, idx) => {
            return (
              <div key={`$row-${item.unique}`} style={{ marginBottom: '7px' }}>
                {idx + 1}. <Input
                  style={{ width: "80%", marginRight: "10px" }}
                  onChange={(e) => handleChangeRowLabel(e, idx)}
                  defaultValue={item.title}
                />
                <AddCircleOutline
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
          <div style={{ marginTop: "10px" }}>
            <Button
              style={{ marginRight: '5px', marginLeft: '15px' }}
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
            <p className='title-question'>Câu {props.stt + 1}. {title}</p>
            <div onClick={editHandle} style={{ cursor: "pointer" }}>
              {rowLabel.map((item, i) => {
                return (
                  <>
                    <div key={i} style={{ marginBottom: '7px' }}>
                      <Radio /> {item.title}
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

export default SingleChoise;
