/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useEffect, useState } from "react";
import {
  TYPE_OF_INPUT, SINGLE_TEXTBOX, COMMENT_BOX, GRID_MULTI_CHOISE,
  GRID_SINGLE_CHOISE, GRID_SINGLE_TEXT, GRID_TEXTBOX, MULTI_CHOISE, SINGLE_CHOISE, GRID_MIX
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
import GridMix from "../GridMix";

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
            title={props.title}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={COMMENT_BOX}
            changeTypeWhileSave={changeTypeWhileSave}
          />
        );
      case GRID_TEXTBOX:
        return (
          <GridTextbox
            onEdit={onEdit}
            title={props.title}
            item={props.item}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_TEXTBOX}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case SINGLE_TEXTBOX:
        return (
          <SingleTextbox
            onEdit={onEdit}
            title={props.title}
            item={props.item}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={SINGLE_TEXTBOX}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case GRID_SINGLE_CHOISE:
        return (
          <GridSingleChoise
            onEdit={onEdit}
            title={props.title}
            item={props.item}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_SINGLE_CHOISE}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case GRID_MULTI_CHOISE:
        return (
          <GridMultiChoise
            onEdit={onEdit}
            title={props.title}
            onCancel={onCancel}
            item={props.item}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_MULTI_CHOISE}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case GRID_SINGLE_TEXT:
        return (
          <GridSingleText
            onEdit={onEdit}
            item={props.item}
            title={props.title}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_SINGLE_TEXT}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case MULTI_CHOISE:
        return (
          <MultiChoise
            onEdit={onEdit}
            title={props.title}
            onCancel={onCancel}
            item={props.item}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={MULTI_CHOISE}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case SINGLE_CHOISE:
        return (
          <SingleChoise
            onEdit={onEdit}
            title={props.title}
            item={props.item}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={SINGLE_CHOISE}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case GRID_MIX:
        return (
          <GridMix
            onEdit={onEdit}
            title={props.title}
            item={props.item}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_MIX}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      default:
        return;
    }
  };

  const onChangeType = (value) => {
    setTypeId(value);
  };

  const changeTypeWhileSave = () => {
    props.onChangeTypeQues(typeId, props.idxQues);
  }

  return (
    <div className="row">
      {/* <div className='row' style={{ marginTop: '20px' }}> */}
      <div className="col-md-7">{renderComponent(typeId)}</div>
      <div className="col-md-5">
        <SelectTypeQuestion
          onChangeType={onChangeType}
          isEdit={isEdit}
          TypeQuestion={TypeQuestion}
          typeSelect={typeId}
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default Question;
