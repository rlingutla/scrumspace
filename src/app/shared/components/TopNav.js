import React from 'react';

const TopNav = (props) => {
	const view = props.view || '';
	return (
		<nav id="top-nav" className="navbar navbar-fixed-top navbar-default">
			<div className="container-fluid">
				<div className="nav-left">
					<a className="navbar-brand">{view}</a>
				</div>
				<div className="nav-right">
					{props.children}
				</div>
			</div>
		</nav>
	);
};

export default TopNav;