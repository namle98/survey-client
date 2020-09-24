import React, { Fragment } from "react";
import { Checkbox } from "antd";
import './ShowForm.scss';

const MultiChoiseShow = (props) => {
  const { title, question_choise } = props.data;
  return (
    <>
      <Fragment>
        <h6 className="question-title">
          {props.index + 1}.{title}
        </h6>
        {question_choise.map((item, i) => {
          return (
            <>
              <div key={i}>
                <Checkbox disabled = {!props.isEnable} /> {item.title}
              </div>
            </>
          );
        })}
      </Fragment>
    </>
  );
};

export default MultiChoiseShow;
