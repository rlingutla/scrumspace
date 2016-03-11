import React from 'react';
import TimeTable from './TimeTable';
import StoryPanel from './StoryPanel';

const StoryPanelFactory = () => {
	return {
			tasks: [TaskFactory()]
	}
};

const TaskFactory = () => {
	return {
			name: '',
			details: ''
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
		//alert('')
		var stories = this.state.storyPanels
		this.storyPanels(panelID).tasks.push(TaskFactory());
		this.setState({storyPanels: stories});
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
		console.log(this.state.storyPanels);
		return (
      <div className="content tab-offset container">
        <h2 id="settings">Sprint Planning</h2>
        <div className="panel-group">
          <TimeTable/>
					{
						this.state.storyPanels.map((e,i,array) =>	{
								return (
									<StoryPanel panNumber={i + 1} last={i + 1 === array.length} isOnly={array.length === 1} story={e} handleAddNewTask={(e) => this.handleAddNewTask}/>
								);
							})
					}
        </div>
      </div>
		);
	}
}
