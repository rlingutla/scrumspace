import React from 'react';
import { Link }  from 'react-router';  

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
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
							<Link activeClassName="selected" to="/project/new"><span className="glyphicon glyphicon-plus"></span></Link>
						</li>						
						<li>
							<Link activeClassName="selected" to="/statistics"><span className="glyphicon glyphicon-stats"></span></Link>
						</li>
					</ul>
				</div>
			</div>
    	);
  	}
}

export default Sidebar;