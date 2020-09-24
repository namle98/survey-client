import React, { Fragment } from "react";
//import { Radio } from "antd";

const GridSingleChoiseShowExport = (props) => {
  const { title, question_columns, question_row } = props.data;
  return (
    <>
      <Fragment>
        <div>
          <h6
            style={{ fontWeight: 700, paddingBottom: "10px", fontSize: "17px" }}
          >
            {props.index + 1}.{title}
          </h6>
          <table
            style={{
              fontFamily: "arial, sans-serif",
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #f0f0f0 ",
                    textAlign: "center ",
                    padding: "8px ",
                    borderWidth: "thin",
                  }}
                ></th>
                {question_columns.map((e, i) => {
                  return (
                    <th
                      style={{
                        border: "1px solid #f0f0f0 ",
                        textAlign: "center ",
                        padding: "8px ",
                        borderWidth: "thin",
                      }}
                      key={i}
                    >
                      {e.title}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {question_row.map((item, i) => {
                return (
                  <tr key={i}>
                    <td
                      style={{
                        border: "1px solid #f0f0f0 ",
                        textAlign: "left",
                        padding: "8px ",
                        borderWidth: "thin",
                      }}
                    >
                      {item.title}
                    </td>
                    {question_columns.map((sub, i) => {
                      return (
                        <td
                          key={i}
                          style={{
                            border: "1px solid #f0f0f0 ",
                            textAlign: "center",
                            padding: "8px ",
                            borderWidth: "thin",
                          }}
                        >
                          {/* <Radio disabled /> */}
                          <input
                            type="radio"
                            style={{ width: "50px", height: "50px" }}
                            disabled
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Fragment>
    </>
  );
};

export default GridSingleChoiseShowExport;
