import React from 'react';
import { Link }  from 'react-router';  

// DONT DELETE THIS LINE AFTER! NEED TO STICK IT BACK IN
// modal body style="background-color:white !important;"

class App extends React.Component {
	render() {
		return (
			<div id="app">
				<div id="sidebar">
					<div id="project-selector">
						<ul>
							<li>
								<Link to="project"><span className="glyphicon glyphicon-blackboard"></span> </Link>
							</li>
							<li>
								<Link to="project/new"><span className="glyphicon glyphicon-plus"></span> </Link>
							</li>						
							<li><Link to="statistics"><span className="glyphicon glyphicon-stats"></span></Link></li>
						</ul>
					</div>
				</div>
				<div>{this.props.children}</div>
			</div>
		)
	}
}

module.exports = App;