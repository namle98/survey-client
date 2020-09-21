import React, { Fragment } from "react";
import { Checkbox } from "antd";
const MultiChoiseShow = (props) => {
  const { title, question_choise } = props.data;
  return (
    <>
      <Fragment>
        {props.index + 1}.{title}
        {question_choise.map((item, i) => {
          return (
            <>
              <div key={i}>
                <Checkbox disabled /> {item.title}
              </div>
            </>
          );
        })}
      </Fragment>
    </>
  );
};

export default MultiChoiseShow;
