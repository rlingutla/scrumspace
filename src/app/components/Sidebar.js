import React from 'react';
import { Link }  from 'react-router';  
import { ResetDatabase } from '../mock_server/database';

export default () => {
	return (
		<div id="sidebar">
			<div id="project-selector">
				<ul>
					<li>
						<Link activeClassName="selected" to="/dashboard"><span className="glyphicon glyphicon-tasks"></span></Link>
					</li>
					<li>
						<Link activeClassName="selected" to="/project/"><span className="glyphicon glyphicon-blackboard"></span></Link>
					</li>					
					<li>
						<Link activeClassName="selected" to="/settings"><span className="glyphicon glyphicon-cog"></span></Link>
					</li>
					<li>
						<Link activeClassName="selected" to="/statistics"><span className="glyphicon glyphicon-stats"></span></Link>
					</li>
					<li>
						<ResetDatabase />
					</li>
				</ul>
			</div>
		</div>
	);
};