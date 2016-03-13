import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return state;
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return stateProps;
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