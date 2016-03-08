import React from 'react';
import utils from '../../../../../shared/utils/utils';
import { Grid, Row, Col } from 'react-bootstrap';
import ProjectStatus from '../../../shared/ProjectStatus';
import { Link }  from 'react-router';

//get scrum time from a project object
function getScrumTime(props){
	if(props.current_sprint !== null){
		return utils.verboseServerTime(props.sprints[props.current_sprint].scrum_time);
	}
	else return '';
}

const ProjectItem = (props) => {
	return (
		<Link to={`/project/detail/${props._id}`} >
			<div className="project-item">
				<Row className="left-right-align">
					<Col xs={8} className="project-title">{props.title}</Col>
					<Col xs={4} className="project-scrum-time">{getScrumTime(props)}</Col>
				</Row>
				<ProjectStatus status={props.status}/>
				<div className="chart-container"></div>
			</div>
		</Link>
	);
};

export default ProjectItem;
