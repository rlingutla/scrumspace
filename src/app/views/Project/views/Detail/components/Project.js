import React from 'react';
import Nav from './Nav';
import Tab from './Tabs/Tab';
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
		// if project data not loaded yet
		if (Object.keys(this.props).length < 1){
			return null;
		}
		return (
			<div>
				{/* Renders project detail view, passes project details down as props */}
				<Nav active-tab={this.state.activeTab} tab-change={this.onTabChange} {...this.props}/>
				<div id="tab-container">
					{this.props.children}
				</div>
			</div>
    	);
  	}
}

//redux
const mapStateToProps = (state) => {
	return state;
};

// pulls out current project from projects object, pushes to props
function mergeProps(stateProps, dispatchProps, ownProps) {
	// todo get rid of this:
	var projects = stateProps.projects || [];
	let project = projects.find((proj) => {
		return proj._id === ownProps.id;
	});

	return Object.assign({...project}, {...ownProps});
}

//maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Project);
