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
import "./table.css";

const ShowFormSurvey = (props) => {
	const [dataForm, setDataForm] = useState([]);
	const [inputTypeId, setInputTypeId] = useState([]);

  const updateState = () => {
    setDataForm([props.dataDetail]);
		setInputTypeId(props.dataDetail.input_type_id);
  }

	useEffect(updateState, [props.dataDetail.input_type_id]);

	return (
		<>
			{dataForm && (
				<Card>
					<div className="org_head survey_headers">
						<h3>{props.dataDetail.title}</h3>
					</div>
					<div className="survey_sections">
						{dataForm.map((item, i) => {
							switch (inputTypeId) {
								case 1:
									return (
										<Fragment>
											<CommentBoxShow index={i} data={item} key={i} />
										</Fragment>
									);
								case 2:
									return (
										<Fragment>
											<GridTexboxShow index={i} data={item} key={i} />
										</Fragment>
									);
								case 3:
									return (
										<Fragment>
											<SingleTexboxShow index={i} data={item} key={i} />
										</Fragment>
									);
								case 4:
									return (
										<Fragment>
											<GridSingleChoiseShow index={i} data={item} key={i} />
										</Fragment>
									);
								case 5:
									return (
										<Fragment>
											<GridMultiChoiseShow index={i} data={item} key={i} />
										</Fragment>
									);
								case 6:
									return (
										<Fragment>
											<GridSingleTextShow index={i} data={item} key={i} />
										</Fragment>
									);
								case 7:
									return (
										<Fragment>
											<MultiChoiseShow index={i} data={item} key={i} />
										</Fragment>
									);
								case 8:
									return (
										<Fragment>
											<SingleChoiseShow index={i} data={item} key={i} />
										</Fragment>
									);
								default:
									return null;
							}
						})}
					</div>
				</Card>
			)}
		</>
	);
};

export default ShowFormSurvey;
