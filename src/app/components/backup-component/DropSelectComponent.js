/* eslint-disable no-restricted-imports */
import React from "react";
import {
	CommentBox,
	GridTextbox,
	SingleTextbox,
	GridSingleChoise,
	GridMultiChoise,
	GridSingleText,
	MultiChoise,
	SingleChoise,
} from ".";

const DropSelectComponent = (props) => {
	const renderComponent = (type) => {
		switch (type) {
			case 1:
				return <CommentBox dataUpdate={props.data} />;
			case 2:
				return <GridTextbox dataUpdate={props.data} />;
			case 3:
				return <SingleTextbox dataUpdate={props.data} />;
			case 4:
				return <GridSingleChoise dataUpdate={props.data} />;
			case 5:
				return <GridMultiChoise dataUpdate={props.data} />;
			case 6:
				return <GridSingleText dataUpdate={props.data} />;
			case 7:
				return <MultiChoise dataUpdate={props.data} />;
			case 8:
				return <SingleChoise dataUpdate={props.data} />;
			default:
				return;
		}
	};

	return <div>{renderComponent(props.type)}</div>;
};

export default DropSelectComponent;
