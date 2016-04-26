import React from 'react';

const Ionicon = (props) => {
	return (
		<i style={props.style} className={'icon ' + props.icon}></i>
	);
};

export default Ionicon;