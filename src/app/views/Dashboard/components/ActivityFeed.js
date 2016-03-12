import React from 'react';
import taskTypes from '../../../../constants/taskTypes';

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

const getStatusString = (fromStatus, toStatus) => {
	if (!fromStatus) {
		return ' was created.';
	} else {
		return 'was moved from ' + fromStatus + ' to ' + toStatus + '.';
	}
};

export default (props) => {
	const history = props.activity;
	return (
		<div style={style(taskTypes[history.toStatus].color)}>
			<span>{history.task.description} {getStatusString(history.fromStatus, history.toStatus)}</span>
		</div>
	);
};
