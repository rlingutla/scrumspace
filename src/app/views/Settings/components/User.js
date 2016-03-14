import React from 'react';

export default (props) => {
	return (
		<div className="panel-body">
			<div className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label>First Name:</label>
						<input className="form-control" text="text" onChange={(e) => props.updateState(e, 'first_name')} value={props.first_name} placeholder="John"/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label>Last Name:</label>
						<input className="form-control" text="text" onChange={(e) => props.updateState((e, 'last_name'))} value={props.last_name} placeholder="Smith"/>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label>Email address:</label>
						<input className="form-control" value={props.email} onChange={(e) => props.updateState(e, 'email')} placeholder="john.smith@company.com"/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label>User Name:</label>
						<input className="form-control" placeholder="jhsmith" onChange={(e) => props.updateState(e, 'display_name')} value={props.display_name}/>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label>Old Password:</label>
							<input className="form-control" value={props.password} onChange={(e) => props.updateState(e, 'password')} placeholder="Old Password" />
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label>New Password:</label>
						<input className="form-control" value={props.password} onChange={(e) => props.updateState(e, 'password')} placeholder="New Password"/>
					</div>
				</div>
			</div>
		</div>
	);
};
