import React from 'react';

const ProjectAvatar = (props) => {
	var avStyle = {
		backgroundImage: 'url(' + props.imgsrc + ')',
		backgroundSize: 'cover',
		backgroundPosition: 'top center'
	};

	return <div className="project-avatar" style={avStyle}></div>;
};

export default ProjectAvatar;
