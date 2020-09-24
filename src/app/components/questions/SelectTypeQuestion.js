import React from "react";
import { Select } from "antd";
const { Option } = Select;

const TitleQuestion = (props) => {
  return (
    <>
      {props.isEdit ? (
        <Select
          value={props.typeSelect}
          onChange={props.onChangeType}
          style={{ width: "100%", marginTop: '32px' }}
          defaultValue={"Chọn kiểu câu hỏi"}
        >
          {props.TypeQuestion &&
            props.TypeQuestion.map((u) => {
              return (
                <Option key={`child-distri-${u.id}`} value={u.id}>
                  {u.type}
                </Option>
              );
            })}
        </Select>
      ) : null}
    </>
  );
};

export default TitleQuestion;
