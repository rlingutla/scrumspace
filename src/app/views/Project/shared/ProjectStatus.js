import React from 'react';

export default (props) => {
	return (
		<div className={'project-status ' + props.status}>
			{props.status}
		</div>
	);
};