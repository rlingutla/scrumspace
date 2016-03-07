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
			return state.map((project) => {
				if(project._id == action.project_id){
					return Object.assign({}, project, { stories: project.stories.map((story) => {
						if(story._id == action.story_id){
							return Object.assign({}, story, { tasks: story.tasks.map((task) => {
								if(task._id == action.task_id){
									return Object.assign({}, task, {status: action.toType});
								} else return task;
							})});
						} else return story;
					})});
				} else return project;
			});


			// let task = state.find((proj) => proj._id == action.project_id)
			// .stories.find((story) => story._id == action.story_id)
			// .tasks.find((task) => task._id == action.task_id);

			// return Object.assign({}, task, {status: action.toType});


		default: //just returning state for now
			return state;
	}
};

export default projects;