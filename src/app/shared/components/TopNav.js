import React from 'react';
import { Glyphicon, Button } from 'react-bootstrap';

const TopNav = (props) => {
	const view = props.view || 'SCRUMSPACE-DEFAULT';
	return (
		<nav id="top-nav" className="navbar navbar-fixed-top navbar-default">
			<div className="container-fluid">
				<div className="nav-left">
					<a className="navbar-brand" href="/">{view}</a>
				</div>
				<div className="nav-right">
					<Button>Create Project <Glyphicon glyph="plus" /></Button>
				</div>
			</div>
		</nav>
	);
};

export default TopNav;