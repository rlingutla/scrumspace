import React from 'react';
import Nav from './Nav';
import Tab from './Tabs/Tab';
import BoardView from './BoardView';

import { connect } from 'react-redux';
import _ from 'underscore';

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
						<BoardView {...this.props} />
					</Tab>
					<Tab tab-id={1} active-tab={this.state.activeTab}>
						Tab2
					</Tab>
				</div>
			</div>
    	);
  	}
}

//redux
const mapStateToProps = (state) => {
	return state;
}

// pulls out current project from projects object, pushes to props
function mergeProps(stateProps, dispatchProps, ownProps) {
	return stateProps.projects.find((proj) => {
		if(proj._id == ownProps.id) return true
	});
}

//maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {};
}

const ProjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Project)

export default ProjectContainer;