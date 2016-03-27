import { combineReducers } from 'redux';
import projects from './projects';
import user from './user';
import settings from '../views/Settings/reducers/';

const scrumApp = combineReducers({
	user,
	projects,
	settings
});

export default scrumApp;