import { project as projectModel } from 'app/shared/constants/models';
import { browserHistory } from 'react-router';
import _ from 'underscore';

const projects = (state = [], action) => {
	switch (action.type){
		case 'NEW_PROJECT':
			return [...state, action.project];
		case 'UPDATE_PROJECT':
			return state.map((project) => {
				return (project._id === action.project._id) ? Object.assign({}, action.project):project;
			});
	  case 'REMOVE_PROJECT':
	    return state.filter((project) => project._id !== action.project._id);
		case 'UPDATE_TASK':
			return state.map((project) => {
				if (project._id === action.project_id){
					return Object.assign({}, project, { stories: project.stories.map((story) => {
						if (story._id === action.story_id){
							return Object.assign({}, story, { tasks: story.tasks.map((task) => {
								return (task._id === action.task._id) ? Object.assign({}, action.task):task;
							})});
						} else return story;
					})});
				} else return project;
			});
		case 'NEW_STORY':
			return state.map((project) => {
				if(project._id === action.project_id){
					return Object.assign({}, project, { stories: [...project.stories, action.story]});
				} else return project;
			});
		case 'UPDATE_STORY':
			return state.map((project) => {
				if(project._id === action.project_id){
					return Object.assign({}, project, { stories: project.stories.map((story) => {
							return (story._id === action.story_id) ? action.story:story;
						})
					});
				} else return project;
			});
		case 'REMOVE_STORY':
			return state.map((project) => {
				if(project._id === action.project_id){
					return Object.assign({}, project, { stories: project.stories.filter((story) => story._id !== action.story._id) });
				} else return project;
			});
		case 'REMOVE_SPRINT':
			return state.map((project) => {
				if(project._id === action.project_id){
					return Object.assign({}, project, {
						sprints: project.sprints.filter((sprint) => sprint._id !== action.sprint._id),
						stories: project.stories.map((story) => {
							if(story.sprint_id === action.sprint_id)
								story.sprint_id = null;
							return story;
						})});
				} else return project;
			});

		case 'NEW_SPRINT':
			return state.map((project) => {
				if(project._id === action.project_id){
					return Object.assign({}, project, { sprints: [...project.sprints, action.sprint] });
				} else return project;
			});
		case 'UPDATE_SPRINT':
			return state.map((project) => {
					if(project._id === action.project_id){
						return Object.assign({}, project, { sprints: project.sprints.map((sprint) => {
								return (sprint._id === action.sprint_id) ? action.sprint:sprint;
							})
						});
					} else return project;
			});
		default: //just returning state for now
			return state;
	}
};

export default projects;
