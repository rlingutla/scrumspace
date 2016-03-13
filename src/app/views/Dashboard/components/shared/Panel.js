import React from 'react';

export default (props) => {
	return (
		<div className="row">
			<div className="panel panel-default">
				<div style={{minHeight: '380px'}}>
					<div className="panel-body">
						<div style={{textAlign: 'center'}}>
							<h4>{props.title}</h4>
							{props.children}
						</div>
					</div>
				</div>
			</div>
		</div>	
	);
};