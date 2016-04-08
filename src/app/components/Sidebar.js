import React from 'react';
import { Link }  from 'react-router';
import { ResetDatabase } from '../server_calls/index';
import Ionicon from '../shared/components/Ionicon';

export default () => {
	return (
		<div id="sidebar">
			<div id="project-selector">
				<ul>
					<li>
						<Link activeClassName="selected" to="/dashboard"><Ionicon icon="ion-ios-pie" /></Link>
					</li>
					<li>
						<Link activeClassName="selected" to="/project/"><Ionicon icon="ion-easel"/></Link>
					</li>
					<li>
						<Link activeClassName="selected" to="/settings"><Ionicon icon="ion-ios-gear"/></Link>
					</li>
					<li>
						<Link activeClassName="selected" to="/statistics"><Ionicon icon="ion-stats-bars"/></Link>
					</li>
					<li>
						<ResetDatabase />
					</li>
				</ul>
			</div>
		</div>
	);
};
