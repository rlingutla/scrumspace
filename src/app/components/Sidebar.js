import React from 'react';
import { Link }  from 'react-router';  

const Sidebar = () => {
	return (
		<div id="sidebar">
			<div id="project-selector">
				<ul>
					<li>
						<Link to="/project/detail/1"><span className="glyphicon glyphicon-blackboard"></span></Link>
					</li>
					<li>
						<Link to="/project/new"><span className="glyphicon glyphicon-plus"></span></Link>
					</li>						
					<li>
						<Link to="/statistics"><span className="glyphicon glyphicon-stats"></span></Link>
					</li>
				</ul>
			</div>
		</div>
	)
};

export default Sidebar;