import React, { Fragment } from "react";
import { Input } from "antd";

const SingleTexboxShow = (props) => {
  return (
    <>
      <Fragment>
        {props.index + 1}.{props.data.title}
        <Input type="text" disabled />
      </Fragment>
    </>
  );
};

export default SingleTexboxShow;
