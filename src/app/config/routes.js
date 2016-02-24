/* Main Components/ Screens/ Views */
import App from '../index';
import { Dashboard, Project, Settings, Statistics } from '../screens';

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
/* Project Components */
import { ProjectDetail, ProjectMaster, ProjectNew } from '../screens/Project/screens'; 

/*
const routes = {
	path: '/',
	component: App,
	indexRoute: { component: Dashboard },
	childRoutes: [
		{ 
			path: 'project', 
			component: Project,
			indexRoute: { component: ProjectMaster},
			childRoutes : [
				{path: 'detail/:id', component: ProjectDetail},
				{path: 'new', component: ProjectNew }
			]
		},
		{ path: 'settings', component: Settings },
		{ path: 'statistics', component: Statistics }
	]
};

*/

var routes = <Route path='/' component={App}>
	<IndexRoute component={Dashboard} />
	<Route path='project' component={ProjectMaster}>
		<Route path='detail/:id' component={ProjectDetail} />
		<Route path='new' component={ProjectNew} />
	</Route>
	<Route path="settings" component={Settings} />
	<Route path="statistics" component={Statistics} />
</Route>;

export default routes;