import React from 'react';
import ScrumBoard from './ScrumBoard';
import { Button } from 'react-bootstrap'; 
import { getProjectStatus } from 'Project/shared/ProjectStatus';
import ProjectStatuses from 'app/shared/constants/projectStatuses';
import Container from './containers';
import ProjectProgressBar from './ProjectProgressBar';
import { Link } from 'react-router';

// import { getCurrentSprint } from '../../../../../shared/utils/utils'; //TODO: deprecate

const BoardView = (props) => {
	if (!props.status) {
		return <div>Loading...</div>; // TODO: this checks for project data, maybe goes in below function?
	}

	let status = getProjectStatus(props);

	if (status.status.title === ProjectStatuses.PLANNING.title) {
		return (
			<div className="content">
				<div className="project-info container-fluid">
					<div>
						<Link to={'/project/' + props._id + '/planning'}> 
							<Button>Go Plan a Sprint</Button>
						</Link>
					</div>
				</div>
			</div>
		);
	} else if (status.status.title === ProjectStatuses.SPRINT.title) {
		return (
			<div className="content">
				<div className="project-info container-fluid">
					<ProjectProgressBar project_id={props._id} compact={false}/>
				</div>
				<ScrumBoard {...props} />
			</div>
		);
	} else if (status.status.title === ProjectStatuses.REVIEW.title) { //TODO: return the actual review board
		return (
			<div className="content">
				Project is in review
			</div>
		);
	}
};

export default Container(BoardView);
