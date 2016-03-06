import React from 'react';
import ProjectItem from './ProjectItem';
import { Grid, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import _ from 'underscore';

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

//redux
const mapStateToProps = (state) => {
	return {
		//convert projects dict to array and map to component's state
		projects: _.values(state.projects) 
	}
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

const ProjectListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectList);

export default ProjectListContainer;