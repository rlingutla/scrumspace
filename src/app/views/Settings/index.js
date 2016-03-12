import React from 'react';
import TopNav from '../../shared/components/TopNav';
import { User, Projects, Privacy, panel, ExternalSettings } from './components';
import { connect } from 'react-redux';

const Panel = (props) => {
	return (
		<div className="panel panel-primary">
			<div className="panel-heading">
				<h4><span className={'glyphicon glyphicon-' + props.glyphicon}></span> {props.heading}:</h4>
			</div>
			<div className="panel-body">
				{props.children}
			</div>
			{
				(props.saveMethod) ? <div className="panel-footer settings-foot">
				<button className="btn btn-success pull-right save" type="save">Save</button>
			</div> : null
		}
	</div>
);
};


export default () => {
	return (
		<div id="content">
			<TopNav view='Settings'/>
			<div className="content container-fluid">
				<div className="container">
					<div className="panel-group">

						<Panel heading="User Settings" glyphicon="user" saveMethod={() => null}>
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
