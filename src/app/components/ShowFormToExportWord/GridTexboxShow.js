import React from "react";

const GridTexboxShowExport = (props) => {
  const { title, question_columns, question_row } = props.data;

  return (
    <>
      <div className="grid_text_box custom-table">
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
            <tr className="">
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
            {question_row.map((e, i) => {
              return (
                <tr key={i} className="">
                  <td
                    style={{
                      border: "1px solid #f0f0f0 ",
                      textAlign: "left",
                      padding: "8px ",
                      borderWidth: "thin",
                    }}
                  >
                    {e.title}
                  </td>
                  {question_columns.map((e, i) => {
                    return (
                      <td
                        style={{
                          border: "1px solid #f0f0f0 ",
                          textAlign: "center ",
                          padding: "8px ",
                          borderWidth: "thin",
                        }}
                        key={i}
                      ></td>
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

export default GridTexboxShowExport;
