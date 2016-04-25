import React from 'react';

export default (props) => {
	return (
		<div className="panel panel-default panel-dashboard" style={{borderRadius: 0}}>
			<div style={{/*maxHeight: '380px', */overflow: 'hidden'}}>
				{props.children}
			</div>
		</div>
	);
};