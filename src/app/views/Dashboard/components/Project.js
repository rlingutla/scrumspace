import React from 'react';

import { Doughnut, Line } from 'react-chartjs';
import { Link }  from 'react-router';  
import { doughnutOptions, lineOptions } from '../constants/chartOptions';
import taskTypes from '../../../constants/taskTypes_refactor';
import UserTaskTotals from './UserTaskTotals';
import Task from './Task';


const capitalize = (s) => {
	return s[0] + s.slice(1).toLowerCase();
};

// TODO: make this production ready


const lineData = {
	labels: ['T-6', 'T-5', 'T-4', 'T-3', 'T-2', 'T-1', 'T'],
	datasets: [
		{
			label: 'Done',
			fillColor: 'rgba(0,0,0,0)',
			strokeColor: 'rgba(220,220,220,1)',
			pointColor: 'rgba(220,220,220,1)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(220,220,220,1)',
			data: [65, 59, 80, 81, 56, 55, 40]
		}
	]
};

const getChartObject = (label, number, color, highlight) => {
	return {
		label: label,
		value: number,
		color: color,
		highlight: color
	};
};

const isUnique = (e, i, arr) => {
	return arr.indexOf(e) === i;
};

const getTaskDistribution = (tasks) => {
	let statuses = tasks.map((task) => task.status).filter(isUnique);
	
	let countObj = {};

	tasks.forEach((task) => {
		countObj[task.status] = (countObj[task.status]) ? countObj[task.status] + 1 : 1;
	});

	// make into an array
	let statusArr = [];
	for (var prop in countObj) {
		statusArr.push({
			value: countObj[prop],
			type : prop
		});
	}
	return statusArr.map((status) => {
		return getChartObject(capitalize(status.type), 
			status.value, 
			taskTypes[status.type].color, 
			taskTypes[status.type].color
		);
	});
};

const Chart = (props) => {
	return (
		<div className="dashboard-summary">
			<h4>{props.title}</h4>
			{props.children}
		</div>
	);
};

const isActionable = (task) => {
	return task.status === 'DOING' || task.status === 'BLOCKED';
};

/*
	Parameters of projectTaskSelector
	projects: An array of projects
	storyPredicate: Boolean function for story properties
	taskPredicate: Boolean function for task properties
*/

const projectsTaskSelector = (projects, storyPredicate, taskPredicate) => {
	return projects
	.map((project) => project.stories)
	.reduce((a, b) => a.concat(b))
	.filter(storyPredicate)
	.map((story) => story.tasks)
	.reduce((a, b) => a.concat(b))
	.filter(taskPredicate);
};

const historyActivityFeed = (tasks) => {
	// set reference to task on history
	tasks.forEach((task) => {
		task.history.forEach((history) => {
			history.task = task;
		});
	});
	return tasks.map((task) => task.history)
	.reduce((a, b) => a.concat(b))
	.sort((a, b) => a.modifiedTime - b.modifiedTime);
};

export default (props) => {
	let tasks = projectsTaskSelector(new Array(props.project), () => true, () => true);
	let actionableTasks = tasks.filter(isActionable);
	let historyData = historyActivityFeed(tasks);
	return (
		<div>
			<div className="project-info container-fluid">
				<div className="state-details">
					<div className="row">
						<div className="col-md-6">
							<Link activeClassName="selected" to={'/project/detail/' + props.project._id}>
								<h4>{props.project.title}</h4>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<div className="panel-wrapper">
							<div className="row">
								<div className="panel panel-default">
									<div className="panel-container">
										<div className="panel-body">
											<div className="dashboard-summary">
												<h4>Your Tasks</h4>
												<div className="row">
													<UserTaskTotals tasks={actionableTasks} types={['DOING', 'BLOCKED', 'BLOCKING']} />
												</div>
												{ actionableTasks.map((e, i) => {
													return <Task key={i} id={e._id} status={e.status} description={e.description} />;
												}) }
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="panel panel-default">
									<div className="panel-container">
										<div className="panel-body">
											<div className="dashboard-summary">
												<h4>Activity Feed</h4>
												<div className="row">
													<div className="col-md-12">
														{
															historyData.map((history) => {
																var date = new Date(history.modifiedTime);
																debugger;
																return <p>{new Array( (new Date(history.modifiedTime)).getMonth() + 1, (new Date(history.modifiedTime)).getDate() + 1, 'user:', history.modifiedUser, history.task.status).join(' ')}</p>
															})
														}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="panel-wrapper">
							<div className="row">
								<div className="panel panel-default">
									<div className="panel-container">
										<div className="panel-body">
											<Chart title='Project Task Distribution'>
												<Doughnut data={getTaskDistribution(tasks)} options={doughnutOptions}/>
											</Chart>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="panel-wrapper">
							<div className="row">
								<div className="panel panel-default">
									<div className="panel-container">
										<div className="panel-body">
											<Chart title='Project Activity'>
												<Line data={lineData} options={lineOptions} />
											</Chart>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};