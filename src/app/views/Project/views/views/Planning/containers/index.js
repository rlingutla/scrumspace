import { connect } from 'react-redux';
import { postProjectPlan } from '../../../../../../actions/';

//redux
const mapStateToProps = (state) => {
	return state;
};

// pulls out current project from projects object, pushes to props
function mergeProps(stateProps, dispatchProps, ownProps) {
	// todo get rid of this:
	var projects = stateProps.projects || [];
	let project = projects.find((proj) => {
		return proj._id === parseInt(ownProps.params.id, 10);
	});
	return Object.assign({...project}, {...ownProps});
}

//maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
	return {
		saveThis: (signal, data) => {
			dispatch(postProjectPlan(signal, data));
		}
	};
};


export default (component) => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(component);
