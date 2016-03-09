import React from 'react';
import utils from '../../../../../shared/utils/utils';
import { Grid, Row, Col } from 'react-bootstrap';
import ProjectStatus from '../../../shared/ProjectStatus';
import { Link }  from 'react-router';
import { Line } from 'react-chartjs';

const lineOptions = {
    scaleShowGridLines : false,
		scaleShowLabels: false,
    scaleShowHorizontalLines: false,
    scaleShowVerticalLines: false,
    bezierCurve : false,
    pointDot : false,
    responsive: true
};

//get scrum time from a project object
function getScrumTime(props){
	if(props.current_sprint !== null){
		return utils.verboseServerTime(props.sprints[props.current_sprint].scrum_time);
	}
	else return '';
}

const ProjectItem = (props) => {
	const lineData = {
	    labels: ["mon", "tues", "wed"],
	    datasets: [
	        {
	            fillColor: "transparent",
	            strokeColor: "#44A9FF",
	            data: [Math.floor(Math.random()*10), Math.floor(Math.random()*10), Math.floor(Math.random()*10)]
	        }
	    ]
	};

	return (
		<Link to={`/project/detail/${props._id}`} >
			<div className="project-item">
				<Row className="left-right-align">
					<Col xs={8} className="project-title">{props.title}</Col>
					<Col xs={4} className="project-scrum-time">{getScrumTime(props)}</Col>
				</Row>
				<ProjectStatus status={props.status}/>
				<div className="chart-container">
					<Line data={lineData} options={lineOptions} />
				</div>
			</div>
		</Link>
	);
};

export default ProjectItem;
