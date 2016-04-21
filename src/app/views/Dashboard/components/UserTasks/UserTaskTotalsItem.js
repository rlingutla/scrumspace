import React from 'react';
import taskTypes from 'app/shared/constants/taskTypes';

const tileStyle = (color, key) =>  {
	// (key) ? 'borderTopRightRadius' : 'borderTopLeftRadius'
	var borderRadius = (key) ? '0 3px 0 0' : '3px 0 0 0';
	return {
		backgroundColor: color, 
		width: '50%',
		height: '72px',
		display: 'inline-block',
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: '15px',
		borderRadius: borderRadius
	};
};

export default (props) => {
	return (
		<div style={tileStyle(taskTypes[props.status].color, props.borderRadiusKey)}>
			<div style={{paddingTop: '15px', paddingBottom: '15px'}}>
				<div>{props.total}</div>
				<div>{props.status}</div>
			</div>
		</div>
	);
};