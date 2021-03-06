import React from 'react';
import taskTypes from 'app/shared/constants/taskTypes';
import UserTaskTotalsItem from './UserTaskTotalsItem';

// used to check if a task is a certain status.
const taskType = (status) => {
	return (task) => {
		return task.status === status;
	};
};

export default (props) => {
	return (
		<div>
			{props.types.map((type, i) => <UserTaskTotalsItem borderRadiusKey={i} key={i} status={type} total={props.tasks.filter(taskType(type)).length} />)}
		</div>
	);
};