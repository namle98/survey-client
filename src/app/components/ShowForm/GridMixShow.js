import React, { Fragment } from "react";
import { Checkbox, Input, Radio } from "antd";
import { STRING, NUMBER, CHECKBOX, RADIO } from '../../config/common/TypeOfInput';
import './ShowForm.scss';

const GridMixShow = (props) => {
    const { title, question_columns, question_row } = props.data;

    const renderColByType = (type) => {
        switch (type) {
            case STRING:
                return <Input />
            case NUMBER:
                return <Input />
            case CHECKBOX:
                return <Checkbox />
            case RADIO:
                return <Radio />
            default:
                break;
        }
    }

    return (
        <>
            <Fragment>
                <div className="custom-table">
                    <h6 className="question-title">
                        {props.index + 1}.{title}
                    </h6>
                    <table>
                        <thead>
                            <tr className="border-table">
                                <th></th>
                                {question_columns.map((e, i) => {
                                    return <th key={i}>{e.title}</th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {question_row.map((item, i) => {
                                return (
                                    <tr key={i} className="border-table">
                                        <td>{item.title}</td>
                                        {question_columns.map((sub, i) => {
                                            return (
                                                <td key={i} style={{ margin: 'auto', textAlign: 'center', border: 'solid', borderWidth: 'thin' }}>
                                                    {renderColByType(sub.type)}
                                                </td>
                                                // <td key={i}>
                                                //     <Checkbox disabled />
                                                // </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Fragment>
        </>
    );
};

export default GridMixShow;
