import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
const { Option } = Select;

let draggedItem;

const positionEl = [
  {
    id: 1,
    el: "Tiêu đề form",
  },
  {
    id: 2,
    el: "Kiểu form"
  },
];

const listInputType = [{
  id: 1,
  type: 'Dạng bình thường'
}, {
  id: 2,
  type: 'Dạng mẫu'
}]

const Organization = (props) => {
  const [listPosition, setListPosition] = useState(positionEl);

  useEffect(() => { });

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
          value={
            props.formHeader.organization && props.formHeader.organization.title
          }
          onChange={(e) => props.onChangeHeaderForm(e.target.value, "title")}
        />
      );
    } else {
      return (
        <Select
          defaultValue={props.formHeader.organization.type || 'Chọn kiểu form'}
          onChange={onChangeSelect}
          style={{ width: "100%" }}
        >
          {listInputType &&
            listInputType.map((u) => (
              <Option key={`child-distri-${u.id}`} value={u.id}>
                {u.type}
              </Option>
            ))}
        </Select>
      );
    }
  };

  const onChangeSelect = (value) => {
    props.onChangeHeaderForm(value, "type");
  }

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

export default Organization;
