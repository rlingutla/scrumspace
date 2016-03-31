import React from 'react';
import TopNav from 'app/shared/components/TopNav';
import Wrapper from 'app/shared/components/Wrapper';

import { UserSettings, Privacy } from './components';
import Container from './containers';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state= {};
		Object.assign(this.state, {
			oldPassword: '',
			newPassword: '',
			...props.user
		});
	}

	updateState(event, property) {
		this.state[property] = event.target.value;
		this.setState(this.state);
	}

	render() {
		var state = this.state; 
		return (
			<div id="content">
				<TopNav view='Settings'/>
				<Wrapper>
					<div className="panel-group">
						<UserSettings saveMethod={() => this.props.putAndChangeSettings(state, [Object.keys(this.props.user)])} updateState={(e, type) => this.updateState(e, type)} {...state} />
						<Privacy saveMethod={() => this.props.putAndChangeSettings(Object.assign({ oldPassword: state.oldPassword, newPassword: state.newPassword, _id: state._id}), ['password'])} updateState={(e, type) => this.updateState(e, type)} {...state} />
					</div>
				</Wrapper>
			</div>
		);
	}
}

export default Container(Settings);