import { serverPutTaskState, serverPostNewProject } from '../mock_server/server';

export const changeTaskState = (project_id, story_id, task_id, task) => {
	return {
		type: 'CHANGE_TASK_STATE',
		project_id,
		story_id,
		task_id,
		task
	};
};

function putTaskState(project_id, story_id, task_id, toType) {
	// return fetch('https://www.google.com/', { method: 'GET',
	//    mode: 'no-cors'
	// });

	return serverPutTaskState(project_id, story_id, task_id, toType);
}

export function putAndChangeTaskState(project_id, story_id, task_id, toType){
	return function (dispatch) {
		return putTaskState(project_id, story_id, task_id, toType).then(
			task => {
				//dispatch with status from server
				// dispatch(changeTaskState(project_id, story_id, task_id, task.status))
				dispatch(changeTaskState(project_id, story_id, task_id, task))
			},
			error => console.error("got an error", error)
			// sauce => dispatch(makeASandwich(forPerson, sauce)),
			// error => dispatch(apologize('The Sandwich Shop', forPerson, error))
		);
	};
}

function postNewProject(title, description,users,status,current_sprint,avatar,sprints,
	stories,commits,gCommits,color){
		return serverPostNewProject(title, description,users,status,current_sprint,avatar,sprints,
			stories,commits,gCommits,color);
		}

		// new project
		export const createNewProject = (title, description,users,status,current_sprint,avatar,sprints,
			stories,commits,gCommits,color) => {
				return {
					type: 'CREATE_NEW_PROJECT',
					title, description,users,status,current_sprint,avatar,sprints,
					stories,commits,gCommits,color
				};
			};

			export function postAndCreateNewProject(title, description,users,status,current_sprint,avatar,sprints,
				stories,commits,gCommits,color){
					return function(dispatch){
						return postNewProject(title, description,users,status,current_sprint,avatar,sprints,
							stories,commits,gCommits,color).then(
								project => {
									dispatch(createNewProject(title, description,users,status,current_sprint,avatar,sprints,
										stories,commits,gCommits,color));
									},
									error => console.error('got an error', error)
								);
							};
						}
// export function
