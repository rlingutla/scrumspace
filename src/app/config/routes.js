import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

import App from '../index';

/* Root-level views of application e.g. /Dashboard , /Project */
import { Dashboard, Project, Settings, Statistics } from '../views';

/*
	Views at /Project/
*/
import  { ProjectMaster, ProjectID } from '../views/Project/views/'; 

/* 
	Views at /Project/ProjectID/
 */
import { ProjectScrumBoard, ProjectSettings, ProjectPlanning } from '../views/Project/views/ProjectID/views/';

export default
<Route path='/' component={App} store={this}>
	<IndexRedirect to="dashboard" />
	<Route path='dashboard' name="Dashboard" component={Dashboard} />
	<Route path='project' name="Projects" component={Project}>
		<IndexRoute component={ProjectMaster} />
		<Route path=':id' component={ProjectID}>
			<IndexRedirect to="scrumboard" />
			<Route path='scrumboard' component={ProjectScrumBoard} />
			<Route path='planning' component={ProjectPlanning} />
			<Route path='settings' component={ProjectSettings} />
		</Route>
	</Route>
	<Route path="settings" component={Settings} />
	<Route path="statistics" component={Statistics} />
</Route>;