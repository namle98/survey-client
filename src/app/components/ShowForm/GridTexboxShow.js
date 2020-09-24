import React from "react";
import { Input } from "antd";
import './ShowForm.scss';

const GridTexboxShow = (props) => {
	const { title, question_columns, question_row } = props.data;

	return (
		<>
			<div className="grid_text_box custom-table">
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
						{question_row.map((e, i) => {
							return (
								<tr key={i} className="border-table">
									<td>{e.title}</td>
									{question_columns.map((e, i) => {
										return (
											<td key={i}>
												<Input disabled = {!props.isEnable} />
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default GridTexboxShow;
