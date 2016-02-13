/* Our Components */
import App from './components/app';
import Dashboard from './components/dashboard';
import Settings from './components/settings';
import Statistics from './components/statistics';
// Project Components
import Project from './components/project/main';
import ProjectDetails from './components/project/detail'
import NewProject from './components/project/new'

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Dashboard },
  childRoutes: [
    { 
		path: 'project', 
		component: Project ,
		indexRoute: {component: ProjectDetails},
		childRoutes : [
			{path: "new", component: NewProject }
		]
    },
    { path: 'settings', component: Settings },
    { path: 'statistics', component: Statistics }
  ]
}

module.exports = routes;