import React, { Fragment } from "react";
import { Checkbox } from "antd";
const GridMultiChoiseShow = (props) => {
  const { title, question_columns, question_row } = props.data;
  return (
    <>
      <Fragment>
        {props.index + 1}.{title}
        <table>
          <thead>
            <tr>
              <th></th>
              {question_columns.map((e, i) => {
                return <th key={i}>{e.title}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {question_row.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.title}</td>
                  {question_columns.map((sub, i) => {
                    return (
                      <td key={i}>
                        <Checkbox disabled />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Fragment>
    </>
  );
};

export default GridMultiChoiseShow;
