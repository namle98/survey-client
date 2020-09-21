import React from "react";
import { Input, Button } from "antd";
const GridTexboxShow = (props) => {
  const { title, question_columns, question_row } = props.data;

  return (
    <>
      <div className="grid_text_box">
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
            {question_row.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{e.title}</td>
                  {question_columns.map((e, i) => {
                    return (
                      <td key={i}>
                        <Input disabled />
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
  );
};

export default GridTexboxShow;
