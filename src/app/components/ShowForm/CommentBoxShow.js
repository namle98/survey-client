import React from "react";
import { Input } from "antd";

const CommentBoxShow = (props) => {
  const { title } = props.data;

  const { TextArea } = Input;
  return (
    <div className="comment_box">
      {props.index + 1}.{title}
      <TextArea disabled rows={4} />
    </div>
  );
};

export default CommentBoxShow;
