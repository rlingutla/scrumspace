/* Our Components */
import App from './components/App';
import Dashboard from './components/dashboard';
import Project from './components/project';
import Settings from './components/settings';
import Statistics from './components/statistics';

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Dashboard },
  childRoutes: [
    { path: 'project', component: Project },
    { path: 'settings', component: Settings },
    { path: 'statistics', component: Statistics }
  ]
}

module.exports = routes;