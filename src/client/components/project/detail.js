import React from 'react';
import ProjectNav from './projectNav';
import Tab from './tabs/tab';

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
				<ProjectNav active-tab={this.state.activeTab} tab-change={this.onTabChange} />
				<div id="tab-container">
					<Tab tab-id={0} active-tab={this.state.activeTab}>
						<div className="content">
							<div className="project-info container-fluid">
								<div className="state-details">
									<h4>Heres where scrum board would go for project {this.props.params.id}</h4>
								</div>
							</div>
						</div>
					</Tab>
					<Tab tab-id={1} active-tab={this.state.activeTab}>
						Tab2
					</Tab>
				</div>

				
			</div>
    	)
  	}
}

export default ProjectDetails;