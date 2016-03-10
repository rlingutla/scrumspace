import React from 'react';

import { Doughnut, Line } from 'react-chartjs';
import { Link }  from 'react-router';  
import UserTaskTotals from './UserTaskTotals';
import Task from './Task';
import ActivityFeed from './ActivityFeed';
import TaskDistribution from './TaskDistribution';
import TaskActivityTimeSeries from './TaskActivityTimeSeries';

import taskSelector from '../../../constants/taskSelector';

const isActionable = (task) => {
	return task.status === 'DOING' || task.status === 'BLOCKED';
};

export default (props) => {
	let tasks = taskSelector(new Array(props.project), () => true, () => true);
	let actionableTasks = tasks.filter(isActionable);
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
													<UserTaskTotals tasks={actionableTasks} types={['DOING', 'BLOCKED']} />
												</div>
												{ actionableTasks.map((e, i) => {
													return <Task key={i} id={e._id} status={e.status} description={e.description} />;
												}) }
											</div>
										</div>
									</div>
								</div>
							</div>
							<ActivityFeed tasks={tasks} />
						</div>
					</div>
					<div className="col-md-6">
						<TaskDistribution tasks={tasks} />
						<TaskActivityTimeSeries data={tasks} />
					</div>
				</div>
			</div>
		</div>
	);
};