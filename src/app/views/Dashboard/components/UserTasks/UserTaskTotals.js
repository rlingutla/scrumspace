import React from 'react';
import taskTypes from '../../../../constants/taskTypes';
import UserTaskTotalsItem from './UserTaskTotalsItem';

// used to check if a task is a certain status.
const taskType = (status) => {
	return (task) => {
		return task.status === status;
	};
};

export default (props) => {
	return (
		<div className="row">
			<div className="col-md-12">
				{props.types.map((type, i) => <UserTaskTotalsItem key={i} status={type} total={props.tasks.filter(taskType(type)).length} />)}
			</div>
		</div>
	);
};