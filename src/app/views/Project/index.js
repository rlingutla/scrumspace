import React from 'react';

/* This is a wrapper component; seems necessary in react-router.*/
const Project = (props) => {
	return (
		<div>
			{props.children}
		</div>
	);
};

export default Project;