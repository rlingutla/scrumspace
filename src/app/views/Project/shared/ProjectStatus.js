import React from 'react';
import { daysDifference, getCurrentSprint } from 'app/shared/utils/utils';
import ProjectStatuses from 'app/shared/constants/projectStatuses';
import moment from 'moment';

export function sprintStatus(sprint){
	var start = moment(sprint.start_date),
		now = moment(),
		end = moment(sprint.start_date).add(sprint.duration, 'days');


	// exceeded sprint duration
	if (now.isAfter(end)) {
		return {
			status: ProjectStatuses.REVIEW
		};
	}
	// within sprint duration
	else if(now.isBefore(end) && now.isAfter(start)) {
		return {
			status: ProjectStatuses.SPRINT,
			end_date: moment(sprint.start_date).add(sprint.duration, 'days')
		};
	}
	else return {
		status: ProjectStatuses.PLANNING
	};
}

export function getProjectStatus(project){
	if (project.current_sprint === null) return {
		status: ProjectStatuses.PLANNING
	};
	else {
		let currSprint = getCurrentSprint(project);

		// var start = moment(currSprint.start_date),
		// 	now = moment(),
		// 	end = moment(currSprint.start_date).add(currSprint.duration, 'days');


		// // exceeded sprint duration
		// if (now.isAfter(end)) {
		// 	return {
		// 		status: ProjectStatuses.REVIEW
		// 	};
		// }
		// // within sprint duration
		// else if(now.isBefore(end) && now.isAfter(start)) {
		// 	return {
		// 		status: ProjectStatuses.SPRINT,
		// 		end_date: moment(currSprint.start_date).add(currSprint.duration, 'days')
		// 	};
		// }
		// else return {
		// 	status: ProjectStatuses.PLANNING
		// };

		return sprintStatus(currSprint);
	}
}

export const ProjectStatus = (props) => {
	let status = getProjectStatus(props);

	return (
		<div className={'project-status ' + status.status.title}>
			{status.status.display}
		</div>
	);
};
