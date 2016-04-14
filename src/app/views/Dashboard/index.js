import React from 'react';
import taskSelector from 'app/shared/constants/taskSelector';
import TopNav from 'app/shared/components/TopNav';
import Wrapper from 'app/shared/components/Wrapper';

import {
	ProjectWidget,
	ActivityFeed,
	ProjectStatus,
	TaskActivityTimeSeries,
	ProjectHeader,
	UserTasks
} from './components';

import Container from './containers';


const Dashboard = (props) => {
	return (
		<div id="content">
			<TopNav view="Dashboard"/>
			<div className="container-fluid">
				{ 
					props.projects.map((project, i) => { 
						let tasks = taskSelector(new Array(project), () => true, () => true);
						return (
							<ProjectWidget key={i} project={project}> 
								<ProjectHeader id={project._id} avatar={project.avatar} title={project.title}/>
								<div className="row">
									<ProjectStatus tasks={tasks} />
									<ActivityFeed tasks={tasks} />
								</div>
								<div className="row">
									<TaskActivityTimeSeries tasks={tasks} />
									<UserTasks tasks={tasks} />
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