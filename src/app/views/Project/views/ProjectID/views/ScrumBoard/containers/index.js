import { connect } from 'react-redux';
import { populateProjectEntities } from 'app/shared/utils/utils';

//redux
const mapStateToProps = (state) => {
	return state;
};

// pulls out current project from projects object, pushes to props
function mergeProps(stateProps, dispatchProps, ownProps) {
	var projects = stateProps.projects || []; // todo get rid of this:

	let project = projects.find((proj) => {
		return proj._id === parseInt(ownProps.params.id, 10);
	});

	let populatedProject = populateProjectEntities(project);

	return Object.assign({...populatedProject}, {...ownProps});
}

//maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default (component) => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(component);