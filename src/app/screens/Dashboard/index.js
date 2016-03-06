import React from 'react';
import TopNav from '../../shared/components/TopNav';
import { connect } from 'react-redux';
import {
	Project,
	StatisticsContainer
} from './components';

const Dashboard = () => {
	return (
		<div id="content">
			<TopNav view="Dashboard"/>
			<StatisticsContainer />
			<Project/>
		</div>
	);
};

const mapStateToProps = (state) => {
	return state;
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	return Object.assign({});
}

// maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {};
};

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Dashboard);

export default DashboardContainer;