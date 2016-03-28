import { connect } from 'react-redux';

//redux
const mapStateToProps = (state) => {
	return state;
};

// pulls out current project from projects object, pushes to props
function mergeProps(stateProps, dispatchProps, ownProps) {
	// todo get rid of this:
	debugger;
	var projects = stateProps.projects || [];
	let project = projects.find((proj) => {
		return proj._id === parseInt(ownProps.params.id);
	});
	debugger;
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
