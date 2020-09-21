import React, { useEffect, useState } from "react";
import { Input } from "antd";
const { TextArea } = Input;

let draggedItem;

const positionEl = [
  {
    id: 1,
    el: "Tiêu đề",
  },
  {
    id: 2,
    el: "Miêu tả",
  },
  {
    id: 3,
    el: "Hướng dẫn",
  },
];

const SurveyHeader = (props) => {
  const [listPosition, setListPosition] = useState(positionEl);

  useEffect(() => {});

  const onDragStart = (e, idx) => {
    e = window.event || e;
    draggedItem = listPosition[idx];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.childNode);
  };

  const onDragOver = (idx) => {
    const draggedOverItem = listPosition[idx];

    if (draggedOverItem === draggedItem) {
      return;
    }

    let items = listPosition.filter((it) => it !== draggedItem);
    items.splice(idx, 0, draggedItem);

    setListPosition(items);
  };

  const onDragEnd = (e) => {
    draggedItem = null;
  };

  const renderListEl = (item) => {
    if (item.id === 1) {
      return (
        <Input
          type="text"
          value={props.survey_headers && props.survey_headers.title}
          onChange={(e) => props.onChangeHeader(e, "title")}
        />
      );
    } else if (item.id === 2) {
      return (
        <TextArea
          value={props.survey_headers && props.survey_headers.description}
          onChange={(e) => props.onChangeHeader(e, "description")}
        />
      );
    } else {
      return (
        <TextArea
          value={props.survey_headers && props.survey_headers.introduction}
          onChange={(e) => props.onChangeHeader(e, "introduction")}
        />
      );
    }
  };

  return (
    <>
      {listPosition.map((item, idx) => {
        return (
          <div
            id={`tile-${idx}`}
            key={idx}
            className="tile"
            draggable={true}
            onDragOver={(e) => onDragOver(idx)}
            onDragStart={(e) => onDragStart(e, idx)}
            onDragEnd={(e) => onDragEnd(e)}
            style={{ paddingTop: "20px" }}
          >
            <div className="row">
              <div className="col-md-1">
                <label>{item.el}</label>
              </div>
              <div className="col-md-11">{renderListEl(item)}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SurveyHeader;
