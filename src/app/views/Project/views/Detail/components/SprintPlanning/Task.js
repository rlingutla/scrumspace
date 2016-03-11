import React from 'react';

export default class Task extends React.Component {
	constructor(props){
		super(props);
    this.state = { data: props.data, name: '', details: ''};
	}

  //since there are two inputs... there needs to be two functions
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleDetailChange(e) {
    this.setState({ details: e.target.value });
  }

	render(){
		return (
      <div className="col-md-6">
        {
          (this.props.isOnly) ? null : <button type="button" className="close">&times;</button>
        }
        <div className="task-main-input sat-pad">
          <label>Enter a Task</label>
          <input type="text" className="form-control strech-input" placeholder="Task Name"
           value={this.state.name} onChange={(e) => this.handleNameChange(e)}
           />
        </div>
        <div className="task-detail-input sat-pad">
          <label>Enter Task Details</label>
          <textarea className="form-control strech-input" rows="3" placeholder="Enter Task Details"
          value={this.state.details} onChange={(e) => this.handleDetailChange(e)}
          />
        </div>
      </div>
		);
	}
}
