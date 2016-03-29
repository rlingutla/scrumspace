import React from 'react';
import { Link } from 'react-router';

class NavTab extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<li role="presentation" className={(this.props['active-tab'] === this.props['tab-id']) ? 'active':null}>
				<Link activeClassName="selected" to={'/project/'+ this.props.projectID + '/' + this.props['tab-id']}>
					{this.props.name}
				</Link>
			</li>
		);
	}
}

export default NavTab;
