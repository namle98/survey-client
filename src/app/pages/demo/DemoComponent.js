/* eslint-disable no-restricted-imports */
import React from "react";
import { connect } from "react-redux";
import { Card } from "antd";
import { 
  //CheckboxDemo, 
  CommentBox, GridTextbox, SingleTextbox, GridSingleChoise, 
  GridMultiChoise, GridSingleText, MultiChoise, SingleChoise } from '../../components'
const DemoComponent = (props) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="kt-section">
            <div style={{ margin: "10px" }}>
              <Card>
                <SingleTextbox stt={1} />
              </Card>
            </div>
            <div style={{ margin: "10px" }}>
              <Card>
                <CommentBox stt={2} />
              </Card>
            </div>
            <div style={{ margin: "10px" }}>
              <Card>
                <GridTextbox stt={3} />
              </Card>
            </div>
            <div style={{ margin: "10px" }}>
              <Card>
                <GridMultiChoise stt={4} />
              </Card>
            </div>
            <div style={{ margin: "10px" }}>
              <Card>
                <GridSingleChoise stt={5} />
              </Card>
            </div>
            <div style={{ margin: "10px" }}>
              <Card>
                <GridSingleText stt={6} />
              </Card>
            </div>
            <div style={{ margin: "10px" }}>
              <Card>
                <MultiChoise stt={7} />
              </Card>
            </div>
            {/* <div style={{ margin: "10px" }}>
              <Card>
                <SingleChoise stt={8} />
              </Card>
              <CheckboxDemo />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps, null)(DemoComponent);
