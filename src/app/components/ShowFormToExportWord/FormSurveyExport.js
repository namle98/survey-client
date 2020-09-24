import React from "react";
import { Card } from "antd";
import {
  SINGLE_TEXTBOX,
  COMMENT_BOX,
  GRID_MULTI_CHOISE,
  GRID_SINGLE_CHOISE,
  GRID_SINGLE_TEXT,
  GRID_TEXTBOX,
  MULTI_CHOISE,
  SINGLE_CHOISE,
  GRID_MIX,
} from "../../config/common/TypeOfInput";
import { numberToRomanize } from "../../libs/utils";

import CommentBoxShowExport from "./CommentBoxShow";
import GridTexboxShowExport from "./GridTexboxShow";
import SingleTexboxShowExport from "./SingleTexboxShow";
import GridSingleChoiseShowExport from "./GridSingleChoiseShow";
import GridMultiChoiseShowExport from "./GridMultiChoiseShow";
import GridSingleTextShowExport from "./GridSingleTextShow";
import MultiChoiseShowExport from "./MultiChoiseShow";
import SingleChoiseShowExport from "./SingleChoiseShow";
import GridMixShowExport from "./GridMixShow";

const FormSurveyExport = (props) => {
  return (
    <>
      {props.dataDetail && (
        <Card>
          <div id="source-html" style={{ display: "none" }}>
            <div className="survey_headers" style={{ textAlign: "center" }}>
              <div>
                <h3
                  style={{ fontSize: "27px", fontWeight: 600, padding: "15px" }}
                >
                  {props.dataDetail &&
                    props.dataDetail.organization &&
                    props.dataDetail.organization.survey_headers &&
                    props.dataDetail.organization.survey_headers.title}
                </h3>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "21px",
                    fontWeight: 600,
                    fontStyle: "italic",
                  }}
                >
                  {props.dataDetail &&
                    props.dataDetail.organization &&
                    props.dataDetail.organization.survey_headers &&
                    props.dataDetail.organization.survey_headers.description}
                </h3>
              </div>

              <div
                style={{
                  width: "100%",
                  border: "solid",
                  borderWidth: "thin",
                  marginTop: "50px",
                  padding: "22px",
                  marginBottom: "50px",
                  fontStyle: "italic",
                }}
              >
                <div style={{ textAlign: "left", lineHeight: "30px" }}>
                  <pre className="instro-pre">
                    {props.dataDetail &&
                      props.dataDetail.organization &&
                      props.dataDetail.organization.survey_headers &&
                      props.dataDetail.organization.survey_headers.introduction}
                  </pre>
                </div>
              </div>
            </div>
            <div className="survey_sections">
              {props.dataDetail &&
                props.dataDetail.organization &&
                props.dataDetail.organization.survey_sections &&
                props.dataDetail.organization.survey_sections.map((e, idx) => {
                  return (
                    <>
                      <div
                        style={{
                          fontSize: "20px",
                          font: "bold",
                          marginTop: "20px",
                          fontWeight: 700,
                        }}
                        key={idx}
                      >
                        {numberToRomanize(idx + 1)}. {e.title}
                      </div>
                      {e.questions.map((item, i) => {
                        switch (item.input_type_id) {
                          case COMMENT_BOX:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <CommentBoxShowExport index={i} data={item} />
                              </div>
                            );
                          case GRID_TEXTBOX:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <GridTexboxShowExport index={i} data={item} />
                              </div>
                            );
                          case SINGLE_TEXTBOX:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <SingleTexboxShowExport index={i} data={item} />
                              </div>
                            );
                          case GRID_SINGLE_CHOISE:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <GridSingleChoiseShowExport
                                  index={i}
                                  data={item}
                                />
                              </div>
                            );
                          case GRID_MULTI_CHOISE:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <GridMultiChoiseShowExport
                                  index={i}
                                  data={item}
                                />
                              </div>
                            );
                          case GRID_SINGLE_TEXT:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <GridSingleTextShowExport
                                  index={i}
                                  data={item}
                                />
                              </div>
                            );
                          case MULTI_CHOISE:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <MultiChoiseShowExport index={i} data={item} />
                              </div>
                            );
                          case SINGLE_CHOISE:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <SingleChoiseShowExport index={i} data={item} />
                              </div>
                            );
                          case GRID_MIX:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <GridMixShowExport index={i} data={item} />
                              </div>
                            );
                          default:
                            return null;
                        }
                      })}
                    </>
                  );
                })}
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default FormSurveyExport;
