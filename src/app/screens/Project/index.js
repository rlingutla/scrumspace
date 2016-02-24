import React from 'react';

/* This is a wrapper component; seems necessary in react-router.*/
const Project = () => {
	return (
		<div>
			{this.props.children}
		</div>
	);
};

export default Project;