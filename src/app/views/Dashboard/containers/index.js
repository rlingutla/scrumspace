import { connect } from 'react-redux';

const isInSprint = (project) => {
	return project.status === 'sprint';
};

const mapStateToProps = (state) => {
	let projects = state.projects.filter(isInSprint);
	debugger;
	return Object.assign({}, {
		projects
	});
};

const mergeProps = (state, dispatchProps, ownProps) => {
	return state;
};

// maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default (component) => {
	return connect(
	  mapStateToProps,
	  mapDispatchToProps,
	  mergeProps
	)(component);
};