import React from 'react';
import Nav from './Nav';
import Tab from './Tabs/Tab';
import Board from './Board';

/* Project details on a particular project*/
class Project extends React.Component {
	constructor(props) {
		super(props);
		
		//initialize tabs to Board view
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
			<div>
				{/* Renders project detail view, passes project details down as props */}
				<Nav active-tab={this.state.activeTab} tab-change={this.onTabChange} {...this.props}/>
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

export default Project;