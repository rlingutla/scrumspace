import React from 'react';
import TaskTypes from 'app/shared/constants/taskTypes';

export default (props) => {

	return(
		<div>Blocked by: {props.blockedBy.map((task, i) => {
			return <span key={i} className="blocking-task" style={{color: TaskTypes.BLOCKED.color}}>{task._id}</span>
		})}
		</div>
	);
};