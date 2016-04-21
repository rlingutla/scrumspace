import React from 'react';
import TaskTypes from 'app/shared/constants/taskTypes';

export default (props) => {
	return(
		<div>Blocked by: {props.blocked_by.map((task, i) => {
			let last = !(i < (props.blocked_by.length - 1));
			return (
				<span key={i} className="blocking-task" style={{color: TaskTypes.BLOCKED.color}}>
					{(!last) ? `${task.VID}, `:task.VID}
				</span>
			);
		})}
		</div>
	);
};