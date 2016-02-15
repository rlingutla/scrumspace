import React from 'react';
// import TopNav from '../topNav';
import ProjectNav from './projectNav';

/* Project details on a particular project*/
class ProjectDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0
		}

		this.onTabChange = this.onTabChange.bind(this);
	}

	onTabChange(tabID) {
		this.setState({ activeTab: tabID });
		console.log("TAB CHANGED", tabID);
	}

	render() {
		return (
			<div id="content">
				{/*<TopNav view="Project XYZ"/>*/}
				<ProjectNav active-tab={this.state.activeTab} tab-change={this.onTabChange} />
				<div className="content">
					<div className="project-info container-fluid">
						<div className="state-details">
							<h4>Heres where scrum board would go for project {this.props.params.id}</h4>
						</div>
					</div>
				</div>
			</div>
    	)
  	}
}

export default ProjectDetails;