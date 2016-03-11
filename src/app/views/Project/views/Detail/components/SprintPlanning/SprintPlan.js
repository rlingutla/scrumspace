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
		console.log(SprintID);
		var SprintInfo = this.sprintInfo(SprintID); //THIS WORKS
		console.log(SprintInfo);
		return (
      <div className="content tab-offset container">
        <h2 id="settings">Sprint Planning</h2>
        <div className="panel-group">
          <TimeTable/>
					{
						(SprintInfo.length <= 0) ? <StoryPanel number={1} notOnly={false}/> : null
					}
        </div>
      </div>
		);
	}
}
