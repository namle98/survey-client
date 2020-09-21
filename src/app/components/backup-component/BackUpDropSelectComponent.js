/* eslint-disable no-restricted-imports */
import React from "react";
import { CommentBox, GridTextbox, SingleTextbox, GridSingleChoise, GridMultiChoise, GridSingleText, MultiChoise, SingleChoise } from '.'


const DropSelectComponent = (props) => {

    const renderComponent = (type) => {
        switch (type) {
            case 1:
                return <CommentBox />
            case 2:
                return <GridTextbox />
            case 3:
                return <SingleTextbox />
            case 4:
                return <GridSingleChoise />
            case 5:
                return <GridMultiChoise />
            case 6:
                return <GridSingleText />
            case 7:
                return <MultiChoise />
            case 8:
                return <SingleChoise />
            default:
                return;
        }
    }

    return <div>
        {renderComponent(props.type)}
    </div>
};

export default DropSelectComponent;
