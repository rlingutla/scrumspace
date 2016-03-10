import React from 'react';
import taskTypes from '../../../constants/taskTypes_refactor';
import UserTaskTotalsItem from './UserTaskTotalsItem';

// used to check if a task is a certain status.
const taskType = (status) => {
	return (task) => {
		return task.status === status;
	};
};
export default (props) => {
	return (
		<div className="col-md-12">
			{props.types.map((type) => <UserTaskTotalsItem status={type} total={props.tasks.filter(taskType(type)).length} />)};
		</div>
	);
};