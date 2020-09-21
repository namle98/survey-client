/* eslint-disable no-restricted-imports */
import React, { useState } from "react";
import { connect } from "react-redux";
import { Card, Select } from "antd";
import { DropSelectComponent } from '../../components/backup-component';

const { Option } = Select;

const TypeQuestion = [{
    id: 1,
    type: 'CommentBox'
},
{
    id: 2,
    type: 'GridTextbox'
},
{
    id: 3,
    type: 'SingleTextbox'
}, {
    id: 4,
    type: 'GridSingleChoise'
}, {
    id: 5,
    type: 'GridMultiChoise'
}, {
    id: 6,
    type: 'GridSingleText'
}, {
    id: 7,
    type: 'MultiChoise'
}, {
    id: 8,
    type: 'SingleChoise'
}]

const DemoQuestion = (props) => {

    const [typeSelect, setTypeSelect] = useState();

    const onChangeType = (id) => {
        setTypeSelect(id);
    }

    return (
        <>
            <Select
                value={typeSelect || ''}
                onChange={onChangeType}
                style={{ width: '100%' }}
                defaultValue={'Chọn kiểu câu hỏi'}
            >
                {TypeQuestion.map(u => (
                    <Option key={`child-distri-${u.id}`} value={u.id}>{u.type}</Option>
                ))}
            </Select>
            <div className="row">
                <div className="col-md-12">
                    <div className="kt-section">
                        <div style={{ margin: "10px" }}>
                            <Card>
                                <DropSelectComponent type={typeSelect} />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = ({ auth }) => ({
    user: auth.user,
});

export default connect(mapStateToProps, null)(DemoQuestion);
