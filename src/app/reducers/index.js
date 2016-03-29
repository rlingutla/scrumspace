import { combineReducers } from 'redux';
import projects from './projects';
import user from './user';

const scrumApp = combineReducers({
	user,
	projects
});

export default scrumApp;
