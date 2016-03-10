import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

/* Main Components also known as Views, Widgets */
import App from '../index';
import { Dashboard, Project, Settings, Statistics } from '../views';

/* Project Components */
import { ProjectDetail, ProjectMaster } from '../views/Project/views'; 

export default
<Route path='/' component={App} store={this}>
	<IndexRedirect to="dashboard" />
	<Route path='dashboard' name="Dashboard" component={Dashboard} />
	<Route path='project' name="Projects" component={Project}>
		<IndexRoute component={ProjectMaster} />
		<Route path='detail/:id' component={ProjectDetail} />
	</Route>
	<Route path="settings" component={Settings} />
	<Route path="statistics" component={Statistics} />
</Route>;