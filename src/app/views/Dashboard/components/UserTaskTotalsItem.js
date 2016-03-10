import React from 'react';
import taskTypes from '../../../constants/taskTypes_refactor';

const tileStyle = (color) =>  {
	return {
		backgroundColor: color, 
		width: '33%',
		display: 'inline-block',
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: '15px'
	};
};

export default (props) => {
	return (
		<div style={tileStyle(taskTypes[props.status].color)}>
			<div style={{paddingTop: '15px', paddingBottom: '15px'}}>
				<div>{props.total}</div>
				<div>{props.status}</div>
			</div>
		</div>
	);
};