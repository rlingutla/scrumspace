import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* Main Components/ Screens/ Views */
import App from '../index';
import { Dashboard, Project, Settings, Statistics } from '../screens';

/* Project Components */
import { ProjectDetail, ProjectMaster, ProjectNew } from '../screens/Project/screens'; 

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