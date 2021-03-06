import { connect } from 'react-redux';
import { postProjectPlan, putStartSprint } from '../../../../../../../actions/';

//redux
const mapStateToProps = (state) => {
	return state;
};

// pulls out current project from projects object, pushes to props
function mergeProps(stateProps, dispatchProps, ownProps) {
	// todo get rid of this:
	var projects = stateProps.projects || [];
	let project = projects.find((proj) => {
		return proj._id === ownProps.params.id;
	});
	return Object.assign({...project}, {...ownProps}, {...dispatchProps});
}

//maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
	return {
		saveThis: (signal, data) => {
			dispatch(postProjectPlan(signal, data));
		},
		startSprint: (project_id, sprint_id) => {
			dispatch(putStartSprint(project_id, sprint_id));
		}
	};
};

export default (component) => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(component);
