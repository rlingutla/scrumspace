import React from 'react';
import ProjectAvatar from './Avatar';
import NavTabBar from './Tabs/NavTabBar';
import { daysDifference, verboseServerTime, getCurrentSprint } from 'app/shared/utils/utils';
import Ionicon from 'app/shared/components/Ionicon';
import { Row, Col, Glyphicon, Button } from 'react-bootstrap';
import { Link }  from 'react-router';
import { getProjectStatus, ProjectStatus } from '../../../shared/ProjectStatus';


const ProjectNav = (props) => {
	let projectStatusObj = getProjectStatus(props);

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
							{currentSprint ? 
								<span>
									<span name="project-state">, {currentSprint.name}</span>
								</span>:null
							}
						</h1>
						{currentSprint ? 
							<h4>
								<span name="sprint-start-date">{verboseServerTime(currentSprint.start_date)}</span> - 
								<span name="sprint-end-date">{verboseServerTime(projectStatusObj.end_date)}</span>
							</h4>
						:null}
						<div style={{fontSize: '14px', marginTop: '8px'}}><ProjectStatus style={{fontSize: '14px'}} {...props} /></div>
					</div>
				</div>
			</Row>
			<NavTabBar _id={props._id} active-tab={props['active-tab']} />
		</div>
	);
};

export default ProjectNav;
