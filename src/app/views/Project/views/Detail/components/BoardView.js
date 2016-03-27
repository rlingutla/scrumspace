import React from 'react';
import ProjectProgressBar from './ProjectProgressBar';
import ScrumBoard from './ScrumBoard/ScrumBoard';
import { Button } from 'react-bootstrap'; 
import { getProjectStatus } from '../../../shared/ProjectStatus';
import ProjectStatuses from '../../../../../constants/projectStatuses';
// import { getCurrentSprint } from '../../../../../shared/utils/utils'; //TODO: deprecate

const BoardView = (props) => {
	let status = getProjectStatus(props);

	if(status === ProjectStatuses.PLANNING){
		return (
			<div className="content">
				<div className="project-info container-fluid">
					<div>
						<Button>Go Plan a Sprint</Button>
					</div>
				</div>
			</div>
		)
	}
	else if(status === ProjectStatuses.SPRINT){
		return (
			<div className="content">
				<div className="project-info container-fluid">
					<ProjectProgressBar project_id={props._id} />
				</div>
				<ScrumBoard {...props} />
			</div>
		);
	}
	else if (status === ProjectStatuses.REVIEW){ //TODO: return the actual review board
		return (
			<div className="content">
				Project is in review
			</div>
		)
	}
};

export default BoardView;
