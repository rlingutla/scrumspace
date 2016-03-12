import React from 'react';

export default class User extends React.Component {
	constructor(props)
	{
		super(props);
		this.state ={
			data: 'Initial data'
		};
		this.updateState = this.updateState.bind(this);
	}
	updateState(e)
	{
		this.setState({data:e.target.value});
	}
	render() {
		return (
			<div className="panel-body">
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label>First Name:</label> <input className="form-control" id="first-name"placeholder="John" type="first-name" />
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<label >Last Name:</label>
							<input className="form-control" id="last-name" placeholder="Smith" type="last-name"/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label for="email">Email address:</label> <input className="form-control" id="email" placeholder="john.smith@company.com" type="email" />
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<label for="email">User Name:</label>
							<input className="form-control" id="user-name" placeholder="jhsmith" type="user-name"/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
