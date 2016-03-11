import React from 'react';
import ProjectAvatar from './Avatar';
import NavTabBar from './Tabs/NavTabBar';
import { daysDifference, verboseServerTime, getCurrentSprint } from '../../../../../shared/utils/utils';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import { Link }  from 'react-router';


const ProjectNav = (props) => {
	return (
		<div id="project-detail" className="navbar navbar-fixed-top">
			<Row className="project-top-nav left-right-align">
				<Col xs={6}>
					<Link to="/project" className="nav-link"><Glyphicon glyph="chevron-left" /> Projects</Link>
				</Col>
				<Col xs={6}></Col>
			</Row>
			<Row className="row center-align">
				<div className="project-detail-content">
					<ProjectAvatar imgsrc={props.avatar}/>
					<div className="detail-text">
						<h1>{props.title}<span name="project-state">, {props.status}</span></h1>
						{(props.current_sprint) ? 
							<h4>
								<span name="sprint-start-date">
									{verboseServerTime(getCurrentSprint(props).start_date)}
								</span> - 
								<span name="sprint-end-date">
									{verboseServerTime(getCurrentSprint(props).end_date)}
								</span>
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
