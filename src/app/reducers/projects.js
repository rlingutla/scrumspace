import { projectDefault } from '../constants/models';
import _ from 'underscore';

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
									return Object.assign({}, action.task);
								} else return task;
							})});
						} else return story;
					})});
				} else return project;
			});
		case 'CREATE_NEW_PROJECT':
      //find right project
			let project = _.defaults({
        _id: state.length,
				title: action.title,
				description: action.description
			}, projectDefault());

			return [
				...state,
				project
			]
    case 'CREATE_NEW_SPRINT':
      var p = state;
      action.stories = action.stories.filter((e) =>{
				if(e.title === null || e.title === '' || typeof e.title === 'undefined'){
					return false;
				}
				else{
					return true;
				}
			});
      let sprint = {
        '_id': action.sid,
        'name': action.name,
        'start_date': action.start_date,
        'end_date': action.end_date,
        'scrum_time': action.scrum_time
      };
      p[action.pid].sprints[action.sid] = sprint;
      var notInSp = p[action.pid].stories.filter(
        function(value){
          if(value.sprint_id !== action.sid){
            return true;
          }
          else {
            return false;
          }
        }
      );
      var nextID = (notInSp.length !== 0) ? notInSp[notInSp.length -1]._id + 1 : 0;
      for(var i = 0; i < action.stories.length; i++){
        let story = {
          '_id': (nextID+i),
          'title': action.stories[i].title,
          'description': action.stories[i].description,
          'sprint_id': action.sid,
          'tasks': action.stories[i].tasks.map(
            (e, i) => { let t = {
                '_id': i,
                'status': 'UNASSIGNED',
                'assignedTo': null,
                'description': e.description,
                'history': [{
                  fromStatus: null,
                  toStatus: 'UNASSIGNED',
                  modifiedTime: Date.now(),
                  modifiedUser : 0
                }],
                'attachments': null
              };
              return t;
            }
          ).filter((e) =>{
    				if(e.description === null || e.description === '' || typeof e.description === 'undefined'){
    					return false;
    				}
    				else{
    					return true;
    				}
    			})
        };
        action.stories[i] = story;
      }
      p[action.pid].stories = notInSp.concat(action.stories);
      return p;
		default: //just returning state for now
			return state;
	}
};

export default projects;
