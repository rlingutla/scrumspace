import React from 'react';
import ProjectAvatar from './Avatar';
import NavTabBar from './Tabs/NavTabBar';
import { daysDifference } from '../../../../../shared/utils/utils';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import { Link }  from 'react-router';


const ProjectNav = (props) => {
	return (
		<div id="project-detail" className="navbar navbar-fixed-top">
			{/*}<div className="row left-right-align">
				<div className="col-md-8 project-details">
					<ProjectAvatar imgsrc={props.avatar}/>
					<div className="detail-text">
						<h1>{props.title}<span name="project-state">, {props.status}</span></h1>
						<h4>
							<span name="sprint-start-date">February 8th</span> - <span name="sprint-end-date">February 22</span>
						</h4>
					</div>
				</div>
				<div className="col-md-4">

				</div>
			</div> */}
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
						<h4>
							<span name="sprint-start-date">February 8th</span> - <span name="sprint-end-date">February 22</span>
						</h4>
					</div>
				</div>
			</Row>
			<NavTabBar active-tab={props['active-tab']} tab-change={props['tab-change']} />
		</div>
	);
};

export default ProjectNav;
