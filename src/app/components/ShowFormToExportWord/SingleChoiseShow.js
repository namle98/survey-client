import React, { Fragment } from "react";
import { Radio } from "antd";

const SingleChoiseShowExport = (props) => {
  const { title, question_choise } = props.data;
  return (
    <>
      <Fragment>
        <h6
          style={{ fontWeight: 700, paddingBottom: "10px", fontSize: "17px" }}
        >
          {props.index + 1}.{title}
        </h6>
        {question_choise.map((item, i) => {
          return (
            <>
              <div key={i}>
                <input type="radio" disabled />
                <span>{item.title}</span>
              </div>
            </>
          );
        })}
      </Fragment>
    </>
  );
};

export default SingleChoiseShowExport;
