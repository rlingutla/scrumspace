import React from 'react';
import Panel from '../Panel';

export default (props) => {
	return (
		<Panel heading="Privacy" glyphicon="lock" saveMethod={props.saveMethod}>
			<div className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label>Old Password:</label>
							<input className="form-control" type="password" value={props.oldPassword} onChange={(e) => props.updateState(e, 'oldPassword')} placeholder="Old Password" />
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label>New Password:</label>
						<input className="form-control" type="password" value={props.newPassword} onChange={(e) => props.updateState(e, 'newPassword')} placeholder="New Password"/>
					</div>
				</div>
			</div>
		</Panel>
	);
};