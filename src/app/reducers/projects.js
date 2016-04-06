import { project as projectModel } from 'app/shared/constants/models';
import _ from 'underscore';

const task = (state, action) => {
	switch (action.type) {
		case 'CHANGE_TASK_STATE':
			return {
				id: action.id,
				text: action.text,
				completed: false
			};
		default:
			return state;
	}
};

const projects = (state = [], action) => {
	switch (action.type){
		case 'UPDATE_TASK':
			return state.map((project) => {
				if (project._id === action.project_id){
					return Object.assign({}, project, { stories: project.stories.map((story) => {
						if (story._id === action.story_id){
							return Object.assign({}, story, { tasks: story.tasks.map((task) => {
								if (task._id === action.task._id){
									return Object.assign({}, action.task);
								}	else return task;
							})});
						} else return story;
					})});
				} else return project;
			});
		case 'CHANGE_TASK_STATE':
			return state.map((project) => {
				if (project._id === action.project_id){
					return Object.assign({}, project, { stories: project.stories.map((story) => {
						if (story._id === action.story_id){
							return Object.assign({}, story, { tasks: story.tasks.map((task) => {
								if (task._id === action.task_id){
									return Object.assign({}, action.task);
								}	else return task;
							})});
						} else return story;
					})});
				} else return project;
			});
		case 'CHANGE_STORY_STATE':
			return state.map((project) => {
				if (project._id === action.project_id){
					return Object.assign({}, project, { stories: project.stories.map((story) => {
						if (story._id === action.story._id){
							return Object.assign({}, action.story);
						} else return story;
					})});
				} else return project;
			});
		case 'CREATE_NEW_PROJECT':
			//find right project
			let project = _.defaults({
				_id: state.length,
				title: action.title,
				description: action.description,
				users: action.users,
			  status: action.status,
				current_sprint: action.current_sprint,
				avatar: action.avatar,
				sprints: action.sprints,
				stories: action.stories,
				commits: action.commits,
				timeFrame: action.timeFrame,
				membersOnProj:action.membersOnProj,
				color: action.color,
				gCommits: action.gCommits
			}, projectModel());

			return [
				...state,
				project
			];
		case 'REMOVE_STORY':
			return state.map((project) => {
				return (project._id === action.project._id) ? action.project : project;
			});
		case 'NEW_STORY':
			return state.map((project) => {
				return (project._id === action.project._id) ? action.project : project;
			});
		case 'REMOVE_SPRINT':
			return state.map((project) => {
				return (project._id === action.project._id) ? action.project : project;
			});
		case 'MOVE_STORY':
			return state.map((project) => {
				return (project._id === action.project._id) ? action.project : project;
			});
		case 'NEW_SPRINT':
			return state.map((project) => {
				return (project._id === action.project._id) ? action.project : project;
			});
		case 'START_SPRINT':
			return state.map((project) => {
				return (project._id === action.project._id) ? action.project:project;
			});
  	default: //just returning state for now
			return state;
	}
};

export default projects;
