import React from "react";

const CommentBoxShowExport = (props) => {
  const { title } = props.data;
  return (
    <div className="comment_box">
      <h6 style={{ fontWeight: 700, paddingBottom: "10px", fontSize: "17px" }}>
        {props.index + 1}.{title}
      </h6>
      <table
        style={{
          width: "100%",
          border: "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        <tr>
          <td style={{ height: "100px" }}></td>
        </tr>
      </table>
    </div>
  );
};

export default CommentBoxShowExport;
