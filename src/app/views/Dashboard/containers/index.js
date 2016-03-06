import React from 'react';
import { connect } from 'react-redux';

function isInSprint (project) {
	return project.status === 'sprint';
}

function isActionable(task) {
	return task.status === 'DOING' || task.status === 'BLOCKED';
}

function setActionableTasks(project) {
	project.actionableTasks = project.stories.map((e) => {
		return e.tasks;
	}).reduce((a, b) => a.concat(b).filter(isActionable));
}

const mapStateToProps = (state) => {
	return state;
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	let projects = stateProps.projects.filter(isInSprint);
	projects.forEach(setActionableTasks);
	return Object.assign({}, {
		projects
	});
}

// maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default (Dashboard) => {
	return connect(
	  mapStateToProps,
	  mapDispatchToProps,
	  mergeProps
	)(Dashboard);
};