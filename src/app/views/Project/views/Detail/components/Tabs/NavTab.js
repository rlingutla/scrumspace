import React from 'react';
import { Link } from 'react-router';

class NavTab extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			active: this.props['active-tab'] === this.props['tab-id']
		};

	}

	clickHandler(){
		this.props['tab-change'](this.props['tab-id']);
		this.setState({ active: true });
	}

	render() {
		return (
			<li onClick={(e) => this.clickHandler()} role="presentation" className={(this.props['active-tab'] === this.props['tab-id']) ? 'active':null}>
				<Link activeClassName="selected" to={'/project/'+ this.props.projectID + '/' + this.props.name}>
					{this.props.name}
				</Link>
			</li>
		);
	}
}

export default NavTab;
