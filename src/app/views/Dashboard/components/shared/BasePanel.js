import React from 'react';

export default (props) => {

	return (
		<div className="panel panel-default">
			<div style={{height: '380px', overflow: 'hidden'}}>
				{props.children}
			</div>
		</div>
	);
};