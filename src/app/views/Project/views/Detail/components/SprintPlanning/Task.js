import React from 'react';

export default class Task extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
      <div className="col-md-6">
        <button type="button" className="close">&times;</button>
        <div className="task-main-input sat-pad">
          <label>Enter a Task</label>
          <input type="text" className="form-control strech-input" placeholder="Task Name"/>
        </div>
        <div className="task-detail-input sat-pad">
          <label>Enter Task Details</label>
          <textarea className="form-control strech-input" rows="3" placeholder="Enter Task Details"></textarea>
        </div>
      </div>
		);
	}
}
