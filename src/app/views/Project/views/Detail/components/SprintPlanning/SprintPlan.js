import React from 'react';
import TimeTable from './TimeTable';
import StoryPanel from './StoryPanel';

const TaskFactory = () => {
	return {
		title: '',
		description: ''
	}
};

const StoryPanelFactory = () => {
	return {
		title: '',
		description: '',
		tasks: [TaskFactory()]
	}
};

export default class SprintPlan extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			start_date: '',
			end_date: '',
			scrum_time: '',
			stories: [StoryPanelFactory()]
		};

	}

	//all the state is managed at the highest level
	//change = signal, e = event, args[0] = story, args[1] = task
	handleChange(change, e, args){
		var storyList = this.state.stories;
		switch(change){
			case 'time-name':
				this.setState({name: e.target.value});
				break;
			case 'time-scrum':
				this.setState({scrum_time: e.target.value});
				break;
			case 'time-start':
				this.setState({start_date: e.target.value});
				break;
			case 'time-end':
				this.setState({end_date: e.target.value});
				break;
			case 'story-name':
				storyList[args[0]].title = e.target.value;
				this.setState({stories: storyList});
				break;
			case 'story-desc':
				storyList[args[0]].description = e.target.value;
				this.setState({stories: storyList});
				break;
			case 'task-name':
				storyList[args[0]].tasks[args[1]].title = e.target.value;
				this.setState({stories: storyList});
				break;
			case 'task-desc':
				storyList[args[0]].tasks[args[1]].description = e.target.value;
				this.setState({stories: storyList});
				break;
			case 'new-task':
				storyList[args[0]].tasks.push(TaskFactory());
				this.setState({stories: storyList});
				break;
			case 'new-panel':
				this.setState({stories: this.state.stories.concat([StoryPanelFactory()])});
				break;
			case 'remove-story':
				storyList.splice(args[0], 1);
				this.setState({stories: storyList});
				break;
			case 'remove-task':
				storyList[args[0]].tasks.splice(args[1], 1);
				this.setState({stories: storyList});
				break;
			case 'save':
				//CODE FOR SAVING HERE
				break;
			default:
				console.log('error');
		}
	}

	//This gets infor for a planned future sprint, if there is one.
	nextSprintInfo(sprintID){
		sprintID = sprintID + 1; //increment sprintID +1 to see what's being planned for the next sprint
		if(this.props.stories[sprintID] === null){
			return null;
		}
		return this.props.stories.filter(
			function(value){
				if(value.sprint_id === sprintID){
					return true;
				}
				else {
					return false;
				}
			}
		);
	}


	render(){
		var SprintID = this.props.current_sprint;
		var nextSprintInfo = this.nextSprintInfo(SprintID); //THIS ACTUALLY WORKS
		//Code to change of the state of THIS if there is stuff in nextSprintInfo HERE
		return (
      <div className="content tab-offset container">
        <h2 id="settings">Sprint Planning</h2>
        <div className="panel-group">
          <TimeTable name={this.state.name} scrumtime={this.state.scrum_time} startdate={this.state.start_date} enddate={this.state.end_date} handleChange={this.handleChange.bind(this)}/>
					{
						this.state.stories.map((e,i,array) =>	{
								return (
									<StoryPanel key={i} panNumber={i + 1} last={i + 1 === array.length} isOnly={array.length === 1} story={e} handleChange={this.handleChange.bind(this)}/>
								);
							})
					}
        </div>
      </div>
		);
	}
}
