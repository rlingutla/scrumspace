import React from 'react';

export default (props) => {
	return (
		<div className="panel panel-default panel-dashboard" style={{borderRadius: 0}}>
			<div style={{overflow: 'hidden'}}>
				{props.children}
			</div>
		</div>
	);
};