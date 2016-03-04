import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

/* Main Components also known as Screens, Views, Widgets */
import App from '../index';
import { Dashboard, Project, Settings, Statistics } from '../screens';

/* Project Components */
import { ProjectDetail, ProjectMaster, ProjectNew } from '../screens/Project/screens'; 

var routes = 
<Route path='/' component={App} store={this}>
	<IndexRedirect to="dashboard" />
	<Route path='dashboard' component={Dashboard} />
	<Route path='project' component={Project}>
		<IndexRoute component={ProjectMaster} />
		<Route path='detail/:id' component={ProjectDetail} />
		<Route path='new' component={ProjectNew} />
	</Route>
	<Route path="settings" component={Settings} />
	<Route path="statistics" component={Statistics} />
</Route>;

export default routes;