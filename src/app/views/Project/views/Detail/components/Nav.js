import React from 'react';
import ProjectAvatar from './Avatar';
import NavTabBar from './Tabs/NavTabBar';
import { daysDifference, verboseServerTime, getCurrentSprint } from '../../../../../shared/utils/utils';
import Ionicon from '../../../../../shared/components/Ionicon';
import { Row, Col, Glyphicon, Button } from 'react-bootstrap';
import { Link }  from 'react-router';


const ProjectNav = (props) => {
	let currentSprint = getCurrentSprint(props);

	return (
		<div id="project-detail" className="navbar navbar-fixed-top">
			<Row className="project-top-nav left-right-align">
				<Col xs={6}>
					<Link to="/project" className="nav-link"><Ionicon icon="ion-ios-arrow-back"/> Projects</Link>
				</Col>
				<Col xs={6}></Col>
			</Row>
			<Row className="row center-align">
				<div className="project-detail-content">
					<ProjectAvatar imgsrc={props.avatar}/>
					<div className="detail-text">
						<h1>
							{props.title}
							{currentSprint ? <span name="project-state">, {currentSprint.name}</span>:null}
						</h1>
						{currentSprint ? 
							<h4>
								<span name="sprint-start-date">{verboseServerTime(currentSprint.start_date)}</span> - 
								<span name="sprint-end-date">{verboseServerTime(currentSprint.end_date)}</span>
							</h4>
						:null}
					</div>
				</div>
			</Row>
			<NavTabBar active-tab={props['active-tab']} tab-change={props['tab-change']} />
		</div>
	);
};

export default ProjectNav;
