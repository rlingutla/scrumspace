import React from 'react';

export default (props) => {
	const history = props.activity;
	return (
		<span>{new Array( (new Date(history.modifiedTime)).getMonth() + 1, (new Date(history.modifiedTime)).getDate() + 1, 'user:', history.modifiedUser, history.task.status).join(' ')}}</span>
	);
};