import { connect } from 'react-redux';


// TODO: this should likely be a computed property... don't love this. 
// Also the querying happing in Project... no good.
const isActionable = (task) => {
	return task.status === 'DOING' || task.status === 'BLOCKED';
};

const isInSprint = (project) => {
	return project.status === 'sprint';
};

const mapStateToProps = (state) => {
	var projects = [];
	if (state.projects.constructor === Array) {
		projects = state.projects.filter(isInSprint);
	}
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