import React from 'react';
import ProjectItem from './ProjectItem';

const ProjectList = (props) => {
	return (
		<div className="content">
			<div className="project-container">
				{
					props.projects.map((project, i) => {
						return (
							<ProjectItem key={i} {...project}/>
						);
					})
				}
			</div>
		</div>
	)
};

export default ProjectList;