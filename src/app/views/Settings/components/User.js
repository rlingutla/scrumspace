import React from 'react';

export default class User extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="panel-body">
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label>First Name:</label>
							<input className="form-control" text="text" onChange={(e) => this.props.updateState(e, 'first_name')} value={this.props.first_name} placeholder="John"/>
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<label>Last Name:</label>
							<input className="form-control" text="text" onChange={(e) => this.props.updateState((e, 'last_name'))} value={this.props.last_name} placeholder="Smith"/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label>Email address:</label>
							<input className="form-control" value={this.props.email} onChange={(e) => this.props.updateState(e, 'email')} placeholder="john.smith@company.com"/>
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<label>User Name:</label>
							<input className="form-control" placeholder="jhsmith" onChange={(e) => this.props.updateState(e, 'display_name')} value={this.props.display_name}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
