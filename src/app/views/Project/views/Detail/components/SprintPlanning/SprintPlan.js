import React from 'react';
import TimeTable from './TimeTable';
import StoryPanel from './StoryPanel';

const TaskFactory = () => {
	return {
			name: '',
			details: ''
	}
};

const StoryPanelFactory = () => {
	return {
			tasks: [TaskFactory()]
	}
};

export default class SprintPlan extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: props.data,
			storyPanels: [
				StoryPanelFactory()
			]
		};

	}

	handleAddNewTask(panelID){
		var stories = this.state.storyPanels;
		stories[panelID].tasks.push(TaskFactory());
		this.setState({storyPanels: stories});
	}


	//change = signal, e = event, args[0] = story, args[1] = task
	handleChange(change, e, args){
		switch(change){
			case 'story-name':
				break;
			case 'story-desc':
				break;
			case 'task-name':
				break;
			case 'task-desc':
				break;
			case 'new-task':
				var newTaskPanel = this.state.storyPanels;
				newTaskPanel[args[0]].tasks.push(TaskFactory());
				this.setState({storyPanels: newTaskPanel});
				break;
			case 'new-panel':
				this.setState({storyPanels: this.state.storyPanels.concat([StoryPanelFactory()])});
				break;
			default:
				console.log('error');
		}
	}

	//This gets infor for a planned future sprint, if there is one.
	sprintInfo(sprintID){
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
		var SprintInfo = this.sprintInfo(SprintID); //THIS ACTUALLY WORKS
		debugger;
		return (
      <div className="content tab-offset container">
        <h2 id="settings">Sprint Planning</h2>
        <div className="panel-group">
          <TimeTable/>
					{
						this.state.storyPanels.map((e,i,array) =>	{
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
