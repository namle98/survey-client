import React, { Fragment, useEffect, useState } from "react";
import { Question } from "../../components/questions";
import { Button } from "@material-ui/core";
import { Input } from 'antd';

const SurveySection = (props) => {
  const [isEdit, setEdit] = useState(false);
  const [title, setTitle] = useState('');

  const getDataQuestion = (value, key) => {
    props.saveQuestion(value, props.idxSection, key);
  };

  const addQuestion = () => {
    props.addQuestion(props.idxSection);
  };

  const onChangeTypeQues = (value, idxQues) => {
    props.onChangeTypeQues(value, props.idxSection, idxQues);
  }

  const onEdit = () => {
    setEdit(true);
  }

  const onCancel = () => {
    setEdit(false);
  }

  const onChangeTitle = (e) => {
    e = window.event || e;
    e.preventDefault();
    setTitle(e.target.value);
  }

  const onSave = (e) => {
    e = window.event || e;
    e.preventDefault();
    props.onChangeSurveyTitle(title, props.idxSection);
    setEdit(false);
  }

  return (
    <>
      <Fragment>
        {isEdit ? <Fragment>
          <div className="col-md-12">
            <Input
              style={{ marginBottom: "10px" }}
              onChange={onChangeTitle}
              defaultValue={props.surveySection.title}
              className="col-md-12"
            /> <Button
              style={{ marginRight: '5px' }}
              size="small"
              onClick={onCancel}
            >
              Cancel
          </Button>
            <Button
              type="primary"
              size="small"
              onClick={e => onSave(e)}
            >
              Save
          </Button>
          </div>
        </Fragment> :
          <Fragment>
            <div onClick={onEdit} className="col-md-12" style={{ fontSize: '16px', font: 'bold', marginTop: '20px' }}>{props.idxSection + 1}. {props.surveySection.title}</div>
          </Fragment>

        }
        {props.surveySection.questions.map((item, idx) => {
          return (
            <>
              <Question
                getDataQuestion={getDataQuestion}
                type={item.input_type_id}
                title={item.title}
                id={item.id}
                key={idx}
                idxQues={idx}
                typeSelect={item.input_type_id}
                onChangeTypeQues={onChangeTypeQues}
              />
            </>
          );
        })}
        <Button
          variant="contained"
          color="primary"
          onClick={addQuestion}
          style={{ margin: "10px" }}
        >
          Thêm câu hỏi
        </Button>
      </Fragment>
    </>
  );
};

export default SurveySection;
