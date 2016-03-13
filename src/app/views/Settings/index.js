import React from 'react';
import TopNav from '../../shared/components/TopNav';
import { User, Projects, Privacy, Panel, ExternalSettings } from './components';
import { connect } from 'react-redux';
import Container from './Containers';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...props.user
		};
	}

	updateState(event, property) {
		debugger;
		this.state[property] = event.target.value;
		this.setState(this.state);
	}

	render() {
		return (
			<div id="content">
				<TopNav view='Settings'/>
				<div className="content container-fluid">
					<div className="container">
						<div className="panel-group">
							<Panel heading="User Settings" glyphicon="user">
								<User updateState={(e, type) => this.updateState(e, type)} {...this.state} />
							</Panel>
							<Panel heading="Privacy" glyphicon="lock" saveMethod={() => null}>
								<Privacy password={this.state.password} updateState={(e, type) =>this.updateState(e, type)}/>
							</Panel>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Container(Settings);
	