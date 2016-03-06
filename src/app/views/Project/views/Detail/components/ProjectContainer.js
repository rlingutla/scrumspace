import { connect } from 'react-redux';
import Project from './Project';
import _ from 'underscore';

//initial project

/*
	maps redux state to component props
	passes full projects object to mergeProps
*/
const mapStateToProps = (state) => {
	return state;
}

// pulls out current project from projects object, pushes to props
function mergeProps(stateProps, dispatchProps, ownProps) {
	return stateProps.projects[ownProps.id] || {};
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