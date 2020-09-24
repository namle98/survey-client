import React, { Fragment, useState, useEffect } from "react";
import { Question } from "../../components/questions";
import { Input, Button } from 'antd';
import {
  numberToRomanize
} from '../../libs/utils';

const SurveySection = (props) => {
  const [isEdit, setEdit] = useState(false);
  const [title, setTitle] = useState('');

  const componentDidMount = () => {
    setTitle(props.surveySection.title)
  };

  useEffect(componentDidMount, []);

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
            <p style={{ fontSize: '20px', marginTop: '10px', marginBottom: '20px', fontWeight: 600 }}>{numberToRomanize(props.idxSection + 1)}. {props.surveySection.title}</p><Input
              onChange={onChangeTitle}
              defaultValue={props.surveySection.title}
              className="col-md-12"
            />
            <div style={{ marginTop: '7px' }}>
              <Button
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
          </div>
        </Fragment> :
          <Fragment>
            <div onClick={onEdit} className="col-md-12" 
            style={{ fontSize: '20px', font: 'bold', marginTop: '10px', marginBottom: '20px' }}>
              {numberToRomanize(props.idxSection + 1)}. {props.surveySection.title}</div>
          </Fragment>
        }

        <div className="col-md-12">
          <div className="row" style={{ paddingBottom: '10px' }}>
            {props.surveySection.questions.map((item, idx) => {
              return (
                <div className="col-md-12" style={{ marginTop: '10px', marginBottom: '20px' }}>
                  <Question
                    getDataQuestion={getDataQuestion}
                    type={item.input_type_id}
                    item={item}
                    title={item.title}
                    id={item.id}
                    key={idx}
                    idxQues={idx}
                    typeSelect={item.input_type_id}
                    onChangeTypeQues={onChangeTypeQues}
                    isUpdate={props.isUpdate || false}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-md-12">
          <Button
            onClick={addQuestion}
            style={{ margin: "10px", marginLeft: '0px', height: '35px', marginBottom: '10px' }}
            type="primary"
          >
            Thêm câu hỏi
        </Button>
        </div>
      </Fragment>
    </>
  );
};

export default SurveySection;
