import React from "react";
import { Card } from "antd";
import CommentBoxShow from "../../components/ShowForm/CommentBoxShow";
import GridSingleChoiseShow from "../../components/ShowForm/GridSingleChoiseShow";
import GridSingleTextShow from "../../components/ShowForm/GridSingleTextShow";
import GridTexboxShow from "../../components/ShowForm/GridTexboxShow";
import MultiChoiseShow from "../../components/ShowForm/MultiChoiseShow";
import SingleChoiseShow from "../../components/ShowForm/SingleChoiseShow";
import SingleTexboxShow from "../../components/ShowForm/SingleTexboxShow";
import GridMultiChoiseShow from "../../components/ShowForm/GridMultiChoiseShow";
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

import "./table.css";
import "./ShowFormSurvey.scss";
import GridMixShow from "../../components/ShowForm/GridMixShow";

const ShowFormSurvey = (props) => {
  return (
    <>
      {props.dataDetail && (
        <Card>
          <div>
            <div className="org_head survey_headers">

              <div>
                <h3 className="title-form">{props.dataDetail && props.dataDetail.organization
                  && props.dataDetail.organization.survey_headers
                  && props.dataDetail.organization.survey_headers.title}</h3>
              </div>

              <div>
                <h3 className="name-of-topic">{props.dataDetail && props.dataDetail.organization
                  && props.dataDetail.organization.survey_headers
                  && props.dataDetail.organization.survey_headers.description}</h3>
              </div>
              <div className="instro-of-form">
                <div className="instro-content" >
                  <pre className="instro-pre">{props.dataDetail && props.dataDetail.organization
                    && props.dataDetail.organization.survey_headers
                    && props.dataDetail.organization.survey_headers.introduction}</pre>
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
                      >
                        {numberToRomanize(idx + 1)}. {e.title}
                      </div>
                      {e.questions.map((item, i) => {
                        switch (item.input_type_id) {
                          case COMMENT_BOX:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <CommentBoxShow index={i} data={item} />
                              </div>
                            );
                          case GRID_TEXTBOX:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <GridTexboxShow index={i} data={item} />
                              </div>
                            );
                          case SINGLE_TEXTBOX:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <SingleTexboxShow index={i} data={item} />
                              </div>
                            );
                          case GRID_SINGLE_CHOISE:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <GridSingleChoiseShow index={i} data={item} />
                              </div>
                            );
                          case GRID_MULTI_CHOISE:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <GridMultiChoiseShow index={i} data={item} />
                              </div>
                            );
                          case GRID_SINGLE_TEXT:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <GridSingleTextShow index={i} data={item} />
                              </div>
                            );
                          case MULTI_CHOISE:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <MultiChoiseShow index={i} data={item} />
                              </div>
                            );
                          case SINGLE_CHOISE:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <SingleChoiseShow index={i} data={item} />
                              </div>
                            );
                          case GRID_MIX:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <GridMixShow index={i} data={item} />
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

export default ShowFormSurvey;
