import React from "react";
import { Input } from "antd";
import './ShowForm.scss';

const CommentBoxShow = (props) => {
  const { title } = props.data;

  const { TextArea } = Input;
  return (
    <div className="comment_box">
      <h6 className="question-title">
        {props.index + 1}.{title}
      </h6>
      <TextArea disable={!props.data.isEnable} rows={4} />
    </div>
  );
};

export default CommentBoxShow;
