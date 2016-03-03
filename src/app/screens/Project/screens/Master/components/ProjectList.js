import React from 'react';
import ProjectItem from './ProjectItem';
import { Grid, Row, Col } from 'react-bootstrap';

const ProjectList = (props) => {
	return (
		<div className="content">
			<div className="project-container">
				<Row className="show-grid"> 
					{props.projects.map((project, i) => {
						return (
							<Col xs={12} sm={6} md={4} key={i}>
								{/* pass down project object as props for ProjectItem */}
								<ProjectItem {...project}/>
							</Col>
						);
					})}
			    </Row>
			</div>
		</div>
	)
};

export default ProjectList;