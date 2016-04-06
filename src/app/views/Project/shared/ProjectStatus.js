import React from 'react';
import { daysDifference, getCurrentSprint } from 'app/shared/utils/utils';
import ProjectStatuses from 'app/shared/constants/projectStatuses';
import moment from 'moment';

export function getProjectStatus(project){
	if (project.current_sprint === null) return {
		status: ProjectStatuses.PLANNING
	};
	else {
		let currSprint = getCurrentSprint(project);
		let diff = daysDifference(currSprint.start_date, (new Date()).getTime());
		// exceeded sprint duration
		if (diff.days < 0) return {
			status: ProjectStatuses.REVIEW
		};
		// within sprint duration
		else if(diff.days <= currSprint.duration) return {
			status: ProjectStatuses.SPRINT,
			end_date: moment(currSprint.start_date).add(currSprint.duration, 'days')
		};
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
