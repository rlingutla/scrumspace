import { combineReducers } from 'redux';
import projects from './projects';
import user from './user';
import settings from '../views/Settings/reducers/';
import projectPlanning from '../views/Project/views/views/Planning/reducers/';

const scrumApp = combineReducers({
	user,
	projects,
	settings
});

export default scrumApp;
