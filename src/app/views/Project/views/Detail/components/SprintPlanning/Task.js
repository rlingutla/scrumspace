import React from 'react';

export default class Task extends React.Component {
	constructor(props){
		super(props);
    this.state = { data: props.data};
	}

	render(){
		return (
      <div className="col-md-6">
        {
          (this.props.isOnly) ? null : <button type="button" className="close" onClick={(e) => this.props.handleChange('remove-task', e, [this.props.panNumber -1, this.props.taskNumber -1])}>&times;</button>
        }
        <div className="task-detail-input sat-pad">
          <label>Enter Task Details</label>
          <textarea className="form-control strech-input" rows="6" placeholder="Enter Task Information"
          value={this.props.task.description} onChange={(e) => this.props.handleChange('task-desc', e, [this.props.panNumber -1, this.props.taskNumber -1])}
          />
        </div>
      </div>
		);
	}
}
