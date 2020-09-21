/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { Fragment, useEffect, useState } from "react";
import {
  TYPE_OF_INPUT, SINGLE_TEXTBOX, COMMENT_BOX, GRID_MULTI_CHOISE,
  GRID_SINGLE_CHOISE, GRID_SINGLE_TEXT, GRID_TEXTBOX, MULTI_CHOISE, SINGLE_CHOISE
} from '../../config/common/TypeOfInput';
import {
  CommentBox,
  GridTextbox,
  SingleTextbox,
  GridSingleChoise,
  GridMultiChoise,
  GridSingleText,
  MultiChoise,
  SingleChoise,
  SelectTypeQuestion
} from "../";

const TypeQuestion = TYPE_OF_INPUT;

const Question = (props) => {
  const [typeId, setTypeId] = useState(1);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    setTypeId(props.type);
  }, [props.type])

  const onEdit = () => {
    setEdit(true);
  };

  const onCancel = () => {
    setEdit(false);
  };

  const getDataSection = (value) => {
    props.getDataQuestion(value, props.idxQues);
  };

  const renderComponent = (type) => {
    switch (type) {
      case COMMENT_BOX:
        return (
          <CommentBox
            onEdit={onEdit}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={COMMENT_BOX}
          />
        );
      case GRID_TEXTBOX:
        return (
          <GridTextbox
            onEdit={onEdit}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_TEXTBOX}
          />
        );
      case SINGLE_TEXTBOX:
        return (
          <SingleTextbox
            onEdit={onEdit}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={SINGLE_TEXTBOX}
          />
        );
      case GRID_SINGLE_CHOISE:
        return (
          <GridSingleChoise
            onEdit={onEdit}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_SINGLE_CHOISE}
          />
        );
      case GRID_MULTI_CHOISE:
        return (
          <GridMultiChoise
            onEdit={onEdit}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_MULTI_CHOISE}
          />
        );
      case GRID_SINGLE_TEXT:
        return (
          <GridSingleText
            onEdit={onEdit}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_SINGLE_TEXT}
          />
        );
      case MULTI_CHOISE:
        return (
          <MultiChoise
            onEdit={onEdit}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={MULTI_CHOISE}
          />
        );
      case SINGLE_CHOISE:
        return (
          <SingleChoise
            onEdit={onEdit}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={SINGLE_CHOISE}
          />
        );
      default:
        return;
    }
  };

  const onChangeType = (value) => {
    setTypeId(value);
    props.onChangeTypeQues(value, props.idxQues);
  };

  return (
    <>
      <Fragment>
        <div className="col-md-7">{renderComponent(typeId)}</div>
        <div className="col-md-5" style={{ paddingBottom: '20px' }}>
          <SelectTypeQuestion
            onChangeType={onChangeType}
            isEdit={isEdit}
            TypeQuestion={TypeQuestion}
            typeSelect={typeId}
          />
        </div>
      </Fragment>
    </>
  );
};

export default Question;
