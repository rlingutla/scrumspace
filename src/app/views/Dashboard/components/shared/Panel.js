import React from 'react';

export default (props) => {
	return (
		<div className="panel panel-default">
			<div style={{height: '380px', overflow: 'hidden'}}>
				{/* The below styles make the panel a fixed size + scrollable.*/}
				<div style={{height: '100%', width: '100%', overflow: 'auto'}}>
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