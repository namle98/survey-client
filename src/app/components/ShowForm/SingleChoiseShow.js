import React, { Fragment } from "react";
import { Radio } from "antd";
const SingleChoiseShow = (props) => {
  const { title, question_choise } = props.data;
  return (
    <>
      <Fragment>
        {props.index + 1}.{title}
        {question_choise.map((item, i) => {
          return (
            <>
              <div key={i}>
                <Radio disabled /> {item.title}
              </div>
            </>
          );
        })}
      </Fragment>
    </>
  );
};

export default SingleChoiseShow;
