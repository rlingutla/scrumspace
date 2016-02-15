import React from 'react';
// import TopNav from '../topNav';
import ProjectNav from './projectNav';

/* Project details on a particular project*/
class ProjectDetails extends React.Component {
	render() {
		return (
			<div id="content">
				{/*<TopNav view="Project XYZ"/>*/}
				<ProjectNav/>
				<div className="content">
					<div className="project-info container-fluid">
						<div className="state-details">
							<h4>Here's where scrum board would go for project {this.props.params.id}</h4>
						</div>
					</div>
				</div>
			</div>
    )
  }
}

export default ProjectDetails;