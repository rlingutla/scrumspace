import React from 'react';
import { Link }  from 'react-router';
import { ResetDatabase } from '../server_calls/index';
import Ionicon from '../shared/components/Ionicon';
import { logout } from './Authentication';

export default () => {
	return (
		<div id="sidebar">
			<div id="project-selector">
				<ul>
					<li title="Dashboard">
						<Link activeClassName="selected" to="/dashboard"><Ionicon icon="ion-ios-pie" /></Link>
					</li>
					<li title="Project">
						<Link activeClassName="selected" to="/project/"><Ionicon icon="ion-easel"/></Link>
					</li>
					<li title="Settings">
						<Link activeClassName="selected" to="/settings"><Ionicon icon="ion-ios-gear"/></Link>
					</li>
					<li title="Statistics">
						<Link activeClassName="selected" to="/statistics"><Ionicon icon="ion-stats-bars"/></Link>
					</li>
					<li title="Logout">
						<a title="Logout" onClick={(e) => logout()}><Ionicon icon="ion-android-cancel"/></a>
					</li>
					<li title="Reset DB">
						<ResetDatabase />
					</li>
				</ul>
			</div>
		</div>
	);
};
