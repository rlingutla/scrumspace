import React from 'react';

export default (props) => {
	return (
		<div className="panel-body">
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