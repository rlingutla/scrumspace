import React from 'react';
import TaskTypes from 'app/shared/constants/taskTypes';
import tinyColor from 'tinycolor2';

export default (props) => {
	let task = TaskTypes[props.status];
	let style = {
		background: task.color,
		border: '1px solid ' + tinyColor(task.color).darken(20).toString(),
		color: tinyColor(task.color).darken(50).toString()
	};

	return (
		<div className="task-status" style={style}>{TaskTypes[props.status].display}</div>
	);
};