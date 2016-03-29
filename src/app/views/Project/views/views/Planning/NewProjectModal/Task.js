import React from 'react';

export default class Task extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="col-md-6">
				{
				(this.props.isOnly) ? null : <button type="button" className="close" onClick={(e) => this.props.handleTask('delete', this.props.index)}>&times;</button>
				}
				<div className="task-detail-input sat-pad">
					<label>Enter Task Details</label>
					<textarea className="form-control strech-input" rows="6" placeholder="Enter Task Information"
					value={this.props.data.description} onChange={(e) => this.props.handleTask('change', this.props.index, e)}
					/>
				</div>
			</div>
		);
	}
}
