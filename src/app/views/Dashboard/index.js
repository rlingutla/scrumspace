import React from 'react';
import { connect } from 'react-redux';
import Container from './containers';

import TopNav from '../../shared/components/TopNav';
import {
	Project,
	Statistics
} from './components';

const Dashboard = (props) => {
	return (
		<div id="content">
			<TopNav view="Dashboard"/>
			<Statistics projects={props.projects}/>
			{ props.projects.map((project, i) => <Project key={i} project={project} />)}
		</div>
	);
};

export default Container(Dashboard);