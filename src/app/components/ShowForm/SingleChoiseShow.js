import React, { Fragment, useState } from "react";
import { Radio } from "antd";
import './ShowForm.scss';

const SingleChoiseShow = (props) => {
  const { title, question_choise } = props.data;
  const [value, setValue] = useState(null);

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <>
      <Fragment>
        <h6 className="question-title">
          {props.index + 1}.{title}
        </h6>
        <Radio.Group onChange={(e) => onChange(e)} value={value}>
          {question_choise.map((item, index) => {
            return (
                <div key={`${item.id}-${index}`}>
                  <Radio disabled={!props.isEnable} key={`${item.id}-${index}`}
                  value={item.id}> {item.title} </Radio>
                </div>
            );
          })}
        </Radio.Group>
      </Fragment>
    </>
  );
};

export default SingleChoiseShow;
