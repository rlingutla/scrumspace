/* Main Components/ Screens/ Views */
import App from '../index';
import { Dashboard, Settings, Statistics } from '../screens';

/* Project Components 
import ProjectMaster from '../screens/Dashboard'; 
import ProjectDetails from './components/project/detail';
import ProjectNew from './components/project/new';


		{ 
			path: 'project', 
			component: ProjectMain ,
			indexRoute: { component: ProjectMaster},
			childRoutes : [
				{path: 'detail/:id', component: ProjectDetails},
				{path: 'new', component: ProjectNew }
			]
		},


*/
const routes = {
	path: '/',
	component: App,
	indexRoute: { component: Dashboard },
	childRoutes: [
		{ path: 'settings', component: Settings },
		{ path: 'statistics', component: Statistics }
	]
};

export default routes;