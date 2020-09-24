import React, { Fragment } from "react";

const GridMixShowExport = (props) => {
  const { title, question_columns, question_row } = props.data;

  return (
    <>
      <Fragment>
        <div className="">
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
              {question_row.map((item, i) => {
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
                      {item.title}
                    </td>
                    {question_columns.map((sub, i) => {
                      return (
                        <td
                          key={i}
                          style={{
                            border: "1px solid #f0f0f0 ",
                            textAlign: "center ",
                            padding: "8px ",
                            borderWidth: "thin",
                          }}
                        >
                          {/* {renderColByType(sub.type)} */}
                        </td>
                        // <td key={i}>
                        //     <Checkbox disabled />
                        // </td>
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

export default GridMixShowExport;