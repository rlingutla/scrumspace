import React from 'react';
    
// DONT DELETE THIS LINE AFTER! NEED TO STICK IT BACK IN
// modal body style="background-color:white !important;"

class App extends React.component {
	render() {
		return (
			<div>
				<div id="sidebar">
					<div id="project-selector">
						<ul>
							<li><a href="project/1"><span className="glyphicon glyphicon-blackboard"></span></a></li>
							<li><a className="#" data-toggle="modal" data-target="#myModal"><span className="glyphicon glyphicon-plus"></span></a></li>
							<li><a href="gitStats.html"><span className="glyphicon glyphicon-stats"></span></a></li>
						</ul>
					</div>
					<ul></ul>
				</div>
				{this.props.children}
			</div>
		)
	}
}

module.exports = App;