import React from 'react';
import taskSelector from '../../constants/taskSelector';

import TopNav from '../../shared/components/TopNav';

import {
	ProjectWidget,
	ActivityFeed,
	TaskDistribution,
	TaskActivityTimeSeries,
	ProjectHeader,
	UserTasks
} from './components';

import Container from './containers';

// TODO: this should likely be a computed property... don't love this. 
// Also the querying happing in Project... no good.
const isActionable = (task) => {
	return task.status === 'DOING' || task.status === 'BLOCKED';
};

const Dashboard = (props) => {
	return (
		<div id="content">
			<TopNav view="Dashboard"/>
			{ 
				props.projects.map((project, i) => { 
					let tasks = taskSelector(new Array(project), () => true, () => true);
					let actionableTasks = tasks.filter(isActionable);
					return (
						<ProjectWidget key={i} project={project}> 
							<ProjectHeader id={project._id} title={project.title}/>
							<div className="container">
								<div className="row">
									<div className="col-md-6">
										<UserTasks tasks={tasks} />
										<ActivityFeed tasks={tasks} />
									</div>
									<div className="col-md-6">
										<TaskDistribution tasks={tasks} />
										<TaskActivityTimeSeries data={tasks} />
									</div>
								</div>
							</div>
						</ProjectWidget>
					);
				}) 
			}
		</div>
	);
};

export default Container(Dashboard);