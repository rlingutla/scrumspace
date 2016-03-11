import React from 'react';
import TimeTable from './TimeTable';
import StoryPanel from './StoryPanel';

const storyPanelFactory = () => {
	return {

	}
};

export default class SprintPlan extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: props.data,
			storyPanels: [
				storyPanelFactory()
			]
		};

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
		return (
      <div className="content tab-offset container">
        <h2 id="settings">Sprint Planning</h2>
        <div className="panel-group">
          <TimeTable/>
					{
						this.state.storyPanels.map((e,i) =>	{
								return (
									<StoryPanel panNumber={i} last={true} isOnly={true} />
								);
							})
					}
        </div>
      </div>
		);
	}
}
