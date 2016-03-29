import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

/* Main Components also known as Views, Widgets */
import App from '../index';
import { Dashboard, Project, Settings, Statistics } from '../views';

/* Project Views */
import { ProjectDetail, ProjectMaster } from '../views/Project/views'; 

/* TODO, can this be somewhere else */
import { ScrumBoard, ProjectSettings, Planning } from '../views/Project/views';

export default
<Route path='/' component={App} store={this}>
	<IndexRedirect to="dashboard" />
	<Route path='dashboard' name="Dashboard" component={Dashboard} />
	<Route path='project' name="Projects" component={Project}>
		<IndexRoute component={ProjectMaster} />
		<Route path=':id' component={ProjectDetail}>
			{/*<IndexRoute component={ScrumBoard} />*/}
			<IndexRedirect to="scrumboard" />
			<Route path='planning' component={Planning} />
			<Route path='settings' component={ProjectSettings} />
			<Route path='scrumboard' component={ScrumBoard} />
		</Route>
	</Route>
	<Route path="settings" component={Settings} />
	<Route path="statistics" component={Statistics} />
</Route>;