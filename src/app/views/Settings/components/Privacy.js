import React from 'react';

export default (props) => {
	return (
		<div className="panel-body">
			<div className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label>Old Password:</label>
							<input className="form-control" id="old-password"placeholder="old password" type="Old password" />
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label > New Password:</label>
						<input className="form-control" id="new-password" placeholder="new password" type="last-name"/>
					</div>
				</div>
				
			</div>
		</div>
	);
};
