import React, { Fragment, useEffect, useState } from "react";
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
  SINGLE_TEXTBOX, COMMENT_BOX, GRID_MULTI_CHOISE, GRID_SINGLE_CHOISE,
   GRID_SINGLE_TEXT, GRID_TEXTBOX, MULTI_CHOISE, SINGLE_CHOISE} from '../../config/common/TypeOfInput';
import "./table.css";

let surveyTemp = {
  organization: {
    title: "Tiêu đề form",
    type: 1,
    survey_headers: {
      title: "tiêu đề header",
      description: "mô tả header",
      introduction: "phần mở đầu header",
    },
    survey_sections: [
      {
        id: 1,
        code: "utl_code",
        title: "thông tin chung",
        index: 1,
        type: 1, //1 là dạng bình thường, 2 là dạng đi cùng với header
        note: "thông tin cơ bản của người khảo sát",
        survey_header_id: "abcd-efgh-mlqt-xzyx_headers",
        questions: [
          {
            id: 1,
            title: "comment box",
            note: "comment box",
            parent_id: 0,
            have_child: false,
            type: 1,
            input_type_id: 1,
          },
          {
            id: 1,
            title: "Grid texbox",
            note: "Grid texbox",
            parent_id: 0,
            have_child: false,
            index: 1,
            type: 1, //1 là bình thường, 2 là mẫu
            input_type_id: 2, // 8 là table_string....
            question_columns: [
              {
                id: "abcd-efgh-mlqt-xzyx_column_1",
                code: "utl_code",
                title: "1.chất thải rắn",
                note: "kg",
                type: 2, // 1 là cột này ghi string, 2 là number
                index: 1,
              },
              {
                id: "abcd-efgh-mlqt-xzyx_column_2",
                code: "utl_code",
                title: "1.chất thải long",
                note: "m3",
                type: 2, // 1 là cột này ghi string, 2 là number
                index: 2,
              },
            ],
            question_row: [
              {
                id: "abcd-efgh-mlqt-xzyx_row_1",
                code: "utl_code",
                title: "số lượng/ngày",
                note: "kg",
              },
              {
                id: "abcd-efgh-mlqt-xzyx_row_2",
                code: "utl_code",
                title: "phương pháp xử lý thu gom",
                note: "m3",
              },
            ],
          },
          {
            id: 1,
            title: "single textbox",
            node: "single textbox",
            parent_id: 0,
            have_child: false,
            type: 1,
            input_type_id: 3,
          },
          {
            id: 1,
            title: "grid single choise",
            note: "grid single choise",
            parent_id: 0,
            have_child: false,
            index: 1,
            type: 1, //1 là bình thường, 2 là mẫu
            input_type_id: 4, // 8 là table_string....
            question_columns: [
              {
                id: "abcd-efgh-mlqt-xzyx_column_1",
                code: "utl_code",
                title: "1.chất thải rắn",
                note: "kg",
                type: 2, // 1 là cột này ghi string, 2 là number
                index: 1,
              },
              {
                id: "abcd-efgh-mlqt-xzyx_column_2",
                code: "utl_code",
                title: "1.chất thải long",
                note: "m3",
                type: 2, // 1 là cột này ghi string, 2 là number
                index: 2,
              },
            ],
            question_row: [
              {
                id: "abcd-efgh-mlqt-xzyx_row_1",
                code: "utl_code",
                title: "số lượng/ngày",
                note: "kg",
              },
              {
                id: "abcd-efgh-mlqt-xzyx_row_2",
                code: "utl_code",
                title: "phương pháp xử lý thu gom",
                note: "m3",
              },
            ],
          },
          {
            id: 1,
            title: "grid multi choise",
            note: "grid multi choise",
            parent_id: 0,
            have_child: false,
            index: 1,
            type: 1, //1 là bình thường, 2 là mẫu
            input_type_id: 5, // 8 là table_string....
            question_columns: [
              {
                id: "abcd-efgh-mlqt-xzyx_column_1",
                code: "utl_code",
                title: "1.chất thải rắn grid multi choise",
                note: "kg",
                type: 2, // 1 là cột này ghi string, 2 là number
                index: 1,
              },
              {
                id: "abcd-efgh-mlqt-xzyx_column_2",
                code: "utl_code",
                title: "1.chất thải long grid multi choise",
                note: "m3",
                type: 2, // 1 là cột này ghi string, 2 là number
                index: 2,
              },
            ],
            question_row: [
              {
                id: "abcd-efgh-mlqt-xzyx_row_1",
                code: "utl_code",
                title: "số lượng/ngày grid multi choise",
                note: "kg",
              },
              {
                id: "abcd-efgh-mlqt-xzyx_row_2",
                code: "utl_code",
                title: "phương pháp xử lý thu gom grid multi choise",
                note: "m3",
              },
            ],
          },
          {
            id: 1,
            title: "grid single text",
            note: "grid single text",
            parent_id: 0,
            have_child: false,
            index: 1,
            type: 1, //1 là bình thường, 2 là mẫu
            input_type_id: 6, // 8 là table_string....
            question_columns: [
              {
                id: "abcd-efgh-mlqt-xzyx_column_1",
                code: "utl_code",
                title: "1.chất thải rắn",
                note: "kg",
                type: 2, // 1 là cột này ghi string, 2 là number
                index: 1,
              },
            ],
            question_row: [
              {
                id: "abcd-efgh-mlqt-xzyx_row_1",
                code: "utl_code",
                title: "số lượng/ngày",
                note: "kg",
              },
              {
                id: "abcd-efgh-mlqt-xzyx_row_2",
                code: "utl_code",
                title: "phương pháp xử lý thu gom",
                note: "m3",
              },
            ],
          },
          {
            id: 1,
            title: "multi choise",
            note: "multi choise",
            parent_id: 0,
            have_child: false,
            index: 1,
            type: 1, //1 là bình thường, 2 là mẫu
            input_type_id: 7, // 4 là dạng multi select....
            question_choise: [
              {
                title: "hội phụ nữ",
                index: 1,
                type: 1, // 1 là checkbox
              },
              {
                title: "Đoàn thanh niên",
                index: 2,
                type: 1, // 1 là checkbox
              },
            ],
          },
          {
            id: 1,
            title: "single choise",
            note: "single choise",
            parent_id: 0,
            have_child: false,
            index: 1,
            type: 1, //1 là bình thường, 2 là mẫu
            input_type_id: 8, // 4 là dạng multi select....
            question_choise: [
              {
                title: "hội phụ nữ",
                index: 1,
                type: 1, // 1 là checkbox
              },
              {
                title: "Đoàn thanh niên",
                index: 1,
                type: 1, // 1 là checkbox
              },
            ],
          },
        ],
      },
    ],
  },
};

const ShowFormSurvey = (props) => {
  const [dataForm, setDataForm] = useState();

  useEffect(() => {
    setDataForm(props.dataDetail);
  }, [props.dataDetail]);

  return (
    <>
      {dataForm &&
        <Card title={dataForm.organization.title}>
          <div className="org_head survey_headers">
            <h3>{dataForm.organization.survey_headers.title}</h3>
            <h3>{dataForm.organization.survey_headers.description}</h3>
            <h3>{dataForm.organization.survey_headers.introduction}</h3>
          </div>
          <div className="survey_sections">
            {dataForm.organization.survey_sections.map((e) => {
              return e.questions.map((item, i) => {
                switch (item.input_type_id) {
                  case COMMENT_BOX:
                    return (
                      <Fragment>
                        <CommentBoxShow index={i} data={item} key={i} />
                      </Fragment>
                    );
                  case GRID_TEXTBOX:
                    return (
                      <Fragment>
                        <GridTexboxShow index={i} data={item} key={i} />
                      </Fragment>
                    );
                  case SINGLE_TEXTBOX:
                    return (
                      <Fragment>
                        <SingleTexboxShow index={i} data={item} key={i} />
                      </Fragment>
                    );
                  case GRID_SINGLE_CHOISE:
                    return (
                      <Fragment>
                        <GridSingleChoiseShow index={i} data={item} key={i} />
                      </Fragment>
                    );
                  case GRID_MULTI_CHOISE:
                    return (
                      <Fragment>
                        <GridMultiChoiseShow index={i} data={item} key={i} />
                      </Fragment>
                    );
                  case GRID_SINGLE_TEXT:
                    return (
                      <Fragment>
                        <GridSingleTextShow index={i} data={item} key={i} />
                      </Fragment>
                    );
                  case MULTI_CHOISE:
                    return (
                      <Fragment>
                        <MultiChoiseShow index={i} data={item} key={i} />
                      </Fragment>
                    );
                  case SINGLE_CHOISE:
                    return (
                      <Fragment>
                        <SingleChoiseShow index={i} data={item} key={i} />
                      </Fragment>
                    );
                  default:
                    return null;
                }
              });
            })}
          </div>
        </Card>}
    </>
  );
};

export default ShowFormSurvey;
