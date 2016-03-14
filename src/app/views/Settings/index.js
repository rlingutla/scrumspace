import React from 'react';
import TopNav from '../../shared/components/TopNav';
import { User, Projects, Privacy, Panel, ExternalSettings } from './components';
import { connect } from 'react-redux';
import Container from './containers';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...props.user
		};
	}

	updateState(event, property) {
		this.state[property] = event.target.value;
		this.setState(this.state);
	}

	render() {
		return (
			<div id="content">
				<TopNav view='Settings'/>
				<div className="container">
					<div className="panel-group">
						<Panel heading="User Settings" glyphicon="user">
							<User updateState={(e, type) => this.updateState(e, type)} saveMethod={() => null} {...this.state} />
						</Panel>
					</div>
				</div>
			</div>
		);
	}
}

export default Container(Settings);
	