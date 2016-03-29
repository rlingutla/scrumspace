import React from 'react';
import taskSelector from 'app/shared/constants/taskSelector';
import TopNav from '../../shared/components/TopNav';
import Wrapper from '../../shared/components/Wrapper';

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
			<div className="container-fluid">
				{ 
					props.projects.map((project, i) => { 
						let tasks = taskSelector(new Array(project), () => true, () => true);
						let actionableTasks = tasks.filter(isActionable);
						return (
							<ProjectWidget key={i} project={project}> 
								<ProjectHeader id={project._id} avatar={project.avatar} title={project.title}/>
								<div className="row">
									<UserTasks tasks={actionableTasks} />
									<TaskDistribution tasks={tasks} />
								</div>
								<div className="row">
									<TaskActivityTimeSeries data={tasks} />
									<ActivityFeed tasks={tasks} />
								</div>
							</ProjectWidget>
						);
					}) 
				}
			</div>
		</div>
	);
};

export default Container(Dashboard);