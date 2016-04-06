import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

//redux
const mapStateToProps = (state) => {
	return state;
};

// pulls out current project from projects object, pushes to props
function mergeProps(stateProps, dispatchProps, ownProps) {
	// todo get rid of this:
	var projects = stateProps.projects || [];

	let project = projects.find((proj) => {
		return proj._id === parseInt(ownProps.params.id,10);
	});

	// If project doesn't exist (TODO, make a modal to let people's know)
	if (!project) {
		browserHistory.push('/project/');
	}

	return Object.assign({...project}, {...ownProps});
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
