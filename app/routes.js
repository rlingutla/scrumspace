/* Main Components/ Screens/ Views */
import App from './components/app';
import Dashboard from './components/dashboard';
import Settings from './components/settings';
import Statistics from './components/statistics';

/* Project Components */
import ProjectMaster from './components/project/master';
import ProjectMain from './components/project/main';
import ProjectDetails from './components/project/detail';
import NewProject from './components/project/new';

const routes = {
	path: '/',
	component: App,
	indexRoute: { component: Dashboard },
	childRoutes: [
		{ 
			path: 'project', 
			component: ProjectMain ,
			indexRoute: { component: ProjectMaster},
			childRoutes : [
				{path: 'detail/:id', component: ProjectDetails},
				{path: 'new', component: NewProject }
			]
		},
		{ path: 'settings', component: Settings },
		{ path: 'statistics', component: Statistics }
	]
};

export default routes;