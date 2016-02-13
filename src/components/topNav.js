import React from 'react';

class TopNav extends React.Component {
	render () {
		const view = this.props.view || "SCRUMSPACE-DEFAULT";
		return (
			<nav className="navbar navbar-fixed-top navbar-default">
				<div className="container-fluid">
					<div className="nav-left">
						<a className="navbar-brand" href="/">{view}</a>
					</div>
					<div className="nav-right">
						<div className="dropdown">
							<button aria-expanded="true" aria-haspopup="true" className="btn btn-default dropdown-toggle" data-toggle="dropdown" id="dropdownMenu1" type="button"><span className="glyphicon glyphicon-option-vertical"></span></button>
							<ul aria-labelledby="dropdownMenu1" className="dropdown-menu dropdown-menu-right">
								<li>
									<a href="settings.html">Settings</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		)
	}
}

module.exports = TopNav;