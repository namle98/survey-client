import React from "react";
import { Input } from "antd";

const TitleQuestion = (props) => {
  return (
    <>
      {props.isEdit ? (
        <Input
          style={{ marginBottom: "10px" }}
          type="text"
          onChange={(e) => props.handleChange("title", e.target.value)}
          value={props.title}
          width="100%"
        />
      ) : (
        <div className="row">{/* { props.stt}.{props.title} */}</div>
      )}
    </>
  );
};

export default TitleQuestion;
