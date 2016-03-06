import React from 'react';
import Sidebar from './components/Sidebar';

import TopNav from './shared/components/TopNav';
import { connect } from 'react-redux';

const App = (props) => {
	let children = null;
	if (!props.loading) {
		children = props.props.children;
	} 
	return (
		 <div>
			<Sidebar />
			<TopNav/>
			{children}
		</div>
	);
};


const mapStateToProps = (state) => {
	return state;
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	return {
		loading: stateProps.loading,
		props: ownProps
	};
}

// maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {};
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(App);

export default AppContainer;