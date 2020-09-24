import React, { Fragment } from "react";
import { Input } from "antd";
import './ShowForm.scss';

const SingleTexboxShow = (props) => {
  return (
    <>
      <Fragment>
        <h6 className="question-title">
            {props.index + 1}.{props.data.title}
        </h6>
        <Input type="text" disabled = {!props.isEnable} />
      </Fragment>
    </>
  );
};

export default SingleTexboxShow;
