import React from 'react';
import TopNav from '../topNav';

/* ProjectMaster for all user projects*/
class ProjectMaster extends React.Component {
	render() {
		return (
			<div id="content">
				<TopNav view="Your Projects"/>
				<div className="content">
					<div className="project-info container-fluid">
						<div className="state-details">
							<h4>List out all projects the user is a part of.</h4>
						</div>
					</div>
				</div>
			</div>
    )
  }
}

module.exports = ProjectMaster;