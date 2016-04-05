import React from 'react';
import Panel from '../Panel';

// redux stuff, please see save method
export function saveMethod(userId, cb) {
  sendXHR('PUT', '/user/' + userId , (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export default (props) => {
	return (
		<Panel heading="User Settings" glyphicon="user" saveMethod={props.saveMethod}>
			<div className="panel-body">
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label>First Name:</label>
							<input className="form-control" text="text" onChange={(e) => props.updateState(e, 'first_name')} value={props.first_name}/>
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<label>Last Name:</label>
							<input className="form-control" text="text" onChange={(e) => props.updateState(e, 'last_name')} value={props.last_name}/>
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
			</div>
		</Panel>
	);
};
