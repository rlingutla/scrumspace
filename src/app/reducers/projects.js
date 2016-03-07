const task = (state, action) => {
  switch (action.type) {
    case 'CHANGE_TASK_STATE':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    default:
      return state
  }
}

const projects = (state = [], action) => {
	switch (action.type){
		case 'CHANGE_TASK_STATE':
			let task = state.find((proj) => proj._id == action.project_id)
			.stories.find((story) => story._id == action.story_id)
			.tasks.find((task) => task._id == action.task_id);


			debugger;
			// let taskState = state.projects.find(project_id).stories.find(story_id).tasks.find(task_id)

			// return [
			// 	...state,
			// 	task(state., action)
			// ]
			return state;
		default: //just returning state for now
			return state;
	}
};

export default projects;