import React from 'react';
import ProjectAvatar from './Avatar';
import NavTabBar from './Tabs/NavTabBar';


const ProjectNav = (props) => {
	return (
		<div id="project-nav" className="navbar navbar-fixed-top">
			<div className="row left-right-align">
				<div className="col-md-8 project-details">
					<ProjectAvatar />
					<div className="detail-text">
						<h1>{props.title}<span name="project-state">, {props.status}</span></h1>
						<h4>
							<span name="sprint-start-date">February 8th</span> - <span name="sprint-end-date">February 22</span>
						</h4>
					</div>
				</div>
				<div className="col-md-4">
					
				</div>
			</div>
			<NavTabBar active-tab={props['active-tab']} tab-change={props['tab-change']} />
		</div>
	);
};

export default ProjectNav;