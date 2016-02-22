/* Main Components/ Screens/ Views */
import App from '../index';
import { Dashboard, Project, Settings, Statistics } from '../screens';

/* Project Components */
import { ProjectDetail, ProjectMaster, ProjectNew } from '../screens/Project/screens'; 

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

export default routes;