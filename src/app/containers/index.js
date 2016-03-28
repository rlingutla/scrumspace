import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return state;
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	return Object.assign({}, ownProps, {
		loading: stateProps.loading
	});
}

// maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default (App) => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(App);