import React from 'react';
import TimeTable from './TimeTable';
import StoryPanel from './StoryPanel';

export default class SprintPlan extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
      <div className="content tab-offset container">
        <h2 id="settings">Sprint Planning</h2>
        <div className="panel-group">
          <TimeTable/>
          <StoryPanel/>
        </div>
      </div>
		);
	}
}
