import React from 'react';
import taskTypes from 'app/shared/constants/taskTypes';

const style = (borderColor) => {
	return {
		margin: '10px, 0px', 
		border: '1px solid ' + borderColor,
		backgroundColor: borderColor,
	    borderRadius: '3px',
		width: '100%',
		paddingTop: '20px',
		paddingBottom: '20px',
		paddingLeft: '5px',
		paddingRight: '5px',
		marginBottom: '10px'
	};
};

const getStatusString = (from_status, to_status) => {
	if (!from_status) {
		return ' was created.';
	} else {
		return 'was moved from ' + from_status + ' to ' + to_status + '.';
	}
};

export default (props) => {
	const history = props.activity;
	return (
		<div style={style(taskTypes[history.to_status].color)}>
			<span>{history.task.description} {getStatusString(history.from_status, history.to_status)}</span>
		</div>
	);
};