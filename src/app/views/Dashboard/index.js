import React from 'react';
import { connect } from 'react-redux';

import TopNav from '../../shared/components/TopNav';
import {
	Project,
	Statistics
} from './components';

const isInSprint = (project) => {
	return project.status === 'sprint';
};

const mapStateToProps = (state) => {
	return state;
};

const mergeProps = (state, dispatchProps, ownProps) => {
	let projects = state.projects.filter(isInSprint);
	return Object.assign({}, {
		projects
	});
};

// maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {};
};

const Container = (component) => {
	return connect(
	  mapStateToProps,
	  mapDispatchToProps,
	  mergeProps
	)(component);
};

const Dashboard = (props) => {
	return (
		<div id="content">
			<TopNav view="Dashboard"/>
			{ props.projects.map((project, i) => <Project key={i} project={project} />) }
		</div>
	);
};

export default Container(Dashboard);