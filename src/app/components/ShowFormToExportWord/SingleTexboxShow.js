import React, { Fragment } from "react";

const SingleTexboxShowExport = (props) => {
  return (
    <>
      <Fragment>
        <h6
          style={{ fontWeight: 700, paddingBottom: "10px", fontSize: "17px" }}
        >
          {props.index + 1}.{props.data.title}
        </h6>
        ………………………………………………………………………………………………….....
      </Fragment>
    </>
  );
};

export default SingleTexboxShowExport;
