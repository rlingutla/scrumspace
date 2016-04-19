import React from 'react';
import taskSelector from 'app/shared/constants/taskSelector';
import TopNav from 'app/shared/components/TopNav';
import Wrapper from 'app/shared/components/Wrapper';
import { Link } from 'react-router';
import moment from 'moment';

import {
	ProjectWidget,
	ActivityFeed,
	ProjectStatus,
	TaskActivityTimeSeries,
	ProjectHeader,
	UserTasks
} from './components';

import Container from './containers';

function getDaysLeft(timeStamp) {
	var eventdate = moment(timeStamp);
	var todaysdate = moment();
	debugger;
	return eventdate.diff(todaysdate, 'days');
}

const Dashboard = (props) => {
	var projectsInSprint = props.projects.filter((project)=>{return project.current_sprint;});
	var numProjectsInSprint = projectsInSprint.length;
	if (numProjectsInSprint === 0) {
		return (
			<div id="content">
				<TopNav view="Dashboard"/>
				<div className="container-fluid">
					<div className="row" style={{marginTop: '15px'}}>
						<div className="col-md-12 col-lg-12">
							<div className="panel panel-default">
								<div className="panel-body">
									<h3>
										{'You currently have no projects in SPRINT status. '}
										<Link activeClassName="selected" to={'/project/'}>
											Go plan a project!
										</Link>
									</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div id="content">
			<TopNav view="Dashboard"/>
			<div className="container-fluid">
				{ 
					projectsInSprint.map((project, i) => { 
						var currentSprint = project.sprints.find((sprint) => sprint._id === project.current_sprint);


						var daysLeft = getDaysLeft(currentSprint.start_date + currentSprint.duration * 24 * 60 * 60 * 1000);


						let tasks = taskSelector(new Array(project), () => true, () => true);
						return (
							<ProjectWidget key={i} project={project}> 
								<ProjectHeader id={project._id} avatar={project.avatar} title={project.title}/>
								<div className="row">
									<ProjectStatus daysLeft={daysLeft} tasks={tasks} />
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