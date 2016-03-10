import React from 'react';
import TimeTable from './TimeTable';
import StoryPanel from './StoryPanel';

export default class SprintPlan extends React.Component {
	constructor(props){
		super(props);
		this.state = props.data;
	}

	sprintInfo(sprintID){
		sprintID = sprintID + 1; //increment sprintID +1 to see what's being planned for the next sprint
		this.state.stories.filter(
			function(value){
				if(value._id === sprintID){
					return true;
				}
				else {
					return false;
				}
			}
		);
	}


	render(){
		var SprintID = this.state.current_sprint;
		var SprintInfo = sprintInfo(SprintID);
		return (
      <div className="content tab-offset container">
        <h2 id="settings">Sprint Planning</h2>
        <div className="panel-group">
          <TimeTable/>
					<StoryPanel number={1} notOnly={false}/>
        </div>
      </div>
		);
	}
}
