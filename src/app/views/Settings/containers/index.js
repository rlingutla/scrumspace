import { connect } from 'react-redux';
import { putAndChangeSettings } from '../actions';

const mapStateToProps = (state) => {
	return state;
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return Object.assign({
		...stateProps
	}, dispatchProps);
};

// maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
	return {
		putAndChangeSettings: (data, propertiesToUpdate) => {
			dispatch(putAndChangeSettings(data, propertiesToUpdate));
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