import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link }  from 'react-router';
import { Line } from 'react-chartjs';
import moment from 'moment';

import { verboseServerTime, getCurrentTasks } from 'app/shared/utils/utils';
import taskTypes from 'app/shared/constants/taskTypes';

import { ProjectStatus } from 'Project/shared/ProjectStatus';

const lineOptions = {
    scaleShowGridLines : false,
	scaleShowLabels: false,
    scaleShowHorizontalLines: false,
    scaleShowVerticalLines: false,
    bezierCurve : true,
    bezierCurveTension : 0.4,
    pointDot : false,
    responsive: true,
    scaleFontFamily: "'Source Sans Pro', sans-serif",
    tooltipFontFamily: "'Source Sans Pro', sans-serif",
    showTooltips: false
};

const getLineDataObj = (range, datasets) => {
	let genDataSets = [];
	for(let dataset in datasets){
		genDataSets.push({
			label: dataset,
			fillColor: "transparent",
			strokeColor: taskTypes[dataset].color, 
			data: datasets[dataset]
		});
	}

	return {
		labels: Array(range).fill(0).map((n, i) => {
			let d = (range-(i+1));
			return 'T'+((d > 0) ? '-'+d:'');
		}),
		datasets: genDataSets
	};
};

const processGraphData = (project) => {
	const DAY_RANGE=5;

	const histories = getCurrentTasks(project)
		.map((task) => task.history)
		.reduce((a,b) => a.concat(b), [])
		.sort((a,b) => a.modified_time > b.modified_time);

	let today = moment().startOf('day');

	//init dataset object with each taskType
	let datasets = {};
	for(let taskType in taskTypes) {
		datasets[taskType] = Array(DAY_RANGE).fill(0);	
	}

	for(let i = 0; i < DAY_RANGE; ++i){
		let currDay = moment(today).subtract(i, 'days');
		histories.forEach((historyObj) => {
			//is history entry within current day in DAY_RANGE
			if(moment(historyObj.modified_time).isBetween(moment(currDay).startOf('day'), moment(currDay).endOf('day'))){
				//increment counter
				if(historyObj.to_status){
					++datasets[historyObj.to_status][DAY_RANGE - (i + 1)];
				}
			}
		});
	}

	return getLineDataObj(DAY_RANGE, datasets);
};

//get scrum time from a project object
function getScrumTime(props){
	if (props.current_sprint !== null){
		return props.sprints[props.current_sprint].scrum_time;
	}
	else return '';
}

const ProjectItem = (props) => {
	const lineData = processGraphData(props);

	return (
		<Link to={`/project/${props._id}`} >
			<div className="project-item">
				<Row className="left-right-align">
					<Col xs={9} className="project-title">{props.title}</Col>
					<Col xs={3} className="project-scrum-time">{getScrumTime(props)}</Col>
				</Row>
				<ProjectStatus {...props}/>
				<div className="chart-container">
					<Line data={lineData} options={lineOptions} />
				</div>
			</div>
		</Link>
	);
};

export default ProjectItem;