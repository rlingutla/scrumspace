import React from 'react';

export default class Task extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
      <div className="col-md-6">
        {
          (this.props.isOnly) ? null : <button type="button" className="close" onClick={(e) => this.props.handleChange('remove-task', e, [this.props.panNumber -1, this.props.taskNumber -1])}>&times;</button>
        }
        <div className="task-main-input sat-pad">
          <label>Enter a Task</label>
          <input type="text" className="form-control strech-input" placeholder="Task Name"
           value={this.props.task.title} onChange={(e) => this.props.handleChange('task-name', e, [this.props.panNumber -1, this.props.taskNumber -1])}
           />
        </div>
        <div className="task-detail-input sat-pad">
          <label>Enter Task Details</label>
          <textarea className="form-control strech-input" rows="3" placeholder="Enter Task Details"
          value={this.props.task.description} onChange={(e) => this.props.handleChange('task-desc', e, [this.props.panNumber -1, this.props.taskNumber -1])}
          />
        </div>
      </div>
		);
	}
}
