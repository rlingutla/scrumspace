import React from 'react';
import TopNav from '../../shared/components/TopNav';
import { User, Projects, Privacy, Panel, ExternalSettings } from './components';
import { connect } from 'react-redux';

export default () => {
	return (
		<div id="content">
			<TopNav view='Settings'/>
			<div className="content container-fluid">
				<div className="container">
					<div className="panel-group">

						<Panel heading="User Settings" glyphicon="user">
									<User />
						</Panel>

						<Panel heading="Privacy" glyphicon="lock" saveMethod={() => null}>
							<Privacy />
						</Panel>

						<Panel heading="Projects" glyphicon="folder-open">
							<Projects />
						</Panel>

						<Panel heading="External Settings" glyphicon="gear">
							<ExternalSettings />
						</Panel>

					</div>
				</div>
			</div>
		</div>
	);
};
