import { connect } from 'react-redux';
import { putAndChangeSettings } from '../actions';

const mapStateToProps = (state) => {
	return state;
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return stateProps;
};

// maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
	debugger;
	return {
		putAndChangeSettings: (data) => {
			dispatch(putAndChangeSettings(data));
		}
	};
};

export default (component) => {
	return connect(
	  mapStateToProps,
	  mapDispatchToProps,
	  mergeProps
	)(component);
};