import React from 'react';
import Nav from './components/Nav';
import Tab from './components/Tabs/Tab';
import Board from './components/Board';

/* Project details on a particular project*/
class ProjectDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0
		};
		this.onTabChange = this.onTabChange.bind(this);
	}
	
	onTabChange(tabID) {
		this.setState({ activeTab: tabID });
	}

	render() {
		return (
			<div id="content">
				<Nav active-tab={this.state.activeTab} tab-change={this.onTabChange} />
				<div id="tab-container">
					<Tab tab-id={0} active-tab={this.state.activeTab}>
						<Board />
					</Tab>
					<Tab tab-id={1} active-tab={this.state.activeTab}>
						Tab2
					</Tab>
				</div>
			</div>
    	);
  	}
}

export default ProjectDetails;