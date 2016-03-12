import React from 'react';
import taskTypes from '../../../../constants/taskTypes';

export default (props) => {
	return (
		<div key={props.key} style={{ borderColor: taskTypes[props.status].color}} className="task" onClick={props.openDetail}>
			<div className="heading">
				<div className="row left-right-align">
					<div className="col-md-6"><a>{props.id}</a></div>
					<div className="col-md-6"></div>
				</div>
			</div>
			<div className="body">{props.description}</div>
		</div>
	);
};