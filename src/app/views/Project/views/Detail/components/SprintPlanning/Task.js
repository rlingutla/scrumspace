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
          (this.props.isOnly) ? null : <button type="button" className="close">&times;</button>
        }
        <div className="task-detail-input sat-pad">
          <label>Enter Task Details</label>
          <textarea className="form-control strech-input" rows="6" placeholder="Enter Task Information"
          value={this.state.details} onChange={(e) => this.handleDetailChange(e)}
          />
        </div>
      </div>
		);
	}
}
