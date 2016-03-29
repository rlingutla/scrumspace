import React from 'react';
import { daysDifference, getCurrentSprint } from '../../../shared/utils/utils';
import ProjectStatuses from '../../../constants/projectStatuses';

export function getProjectStatus(project){
	if (project.current_sprint === null) return ProjectStatuses.PLANNING;
	else {
		let currSprint = getCurrentSprint(project);
		let diff = daysDifference(currSprint.start_date, (new Date()).getTime());
		// exceeded sprint duration
		if (diff.days < 0) return ProjectStatuses.REVIEW;
		// within sprint duration
		else if(diff.days <= currSprint.duration) return ProjectStatuses.SPRINT;
	}
}

export const ProjectStatus = (props) => {
	let status = getProjectStatus(props);

	return (
		<div className={'project-status ' + status.title}>
			{status.display}
		</div>
	);
};