import React from 'react';
import TopNav from '../../shared/components/TopNav';
import { User } from './components';

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
						<div className="panel panel-primary">
							<div className="panel-heading">
								<h4><span className="glyphicon glyphicon-lock"></span> Privacy:</h4>
							</div>
							<div className="panel-body">
								<div className="row">
									<div className="col-md-6">
										<div className="form-group">
											<label for="current-password">Current Password:</label>
											<input className="form-control" id="current-password" placeholder="Enter current password" type="current-password" />
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<label for="new-password">New Password:</label>
											<input className="form-control" id="last-name" placeholder="Enter new password" type="new-password" />
										</div>
									</div>
								</div>
							</div>
							<div className="panel-footer settings-foot">
								<button className="btn btn-success pull-right save" type="save">Save</button>
							</div>
						</div>
						<div className="panel panel-primary">
							<div className="panel-heading">
								<h4><span className="glyphicon glyphicon-folder-open"></span> Projects:</h4>
							</div>
							<div className="panel-body">
								<div className="row project-search">
									<div className="col-md-9"></div>
									<div className="col-md-3">
										<div className="form-group" style={{display: 'inline'}}>
											<div className="input-group">
												<input className="form-control" placeholder="Search Projects" type="search projects" />
												<span className="input-group-addon">
													<span className="glyphicon glyphicon-search" >
													</span>
												</span>
											</div>
										</div>
									</div>
								</div>
									<div className="row myproj">
										<div className="col-md-9">
											<div className="col-md-9">
												<p className="project-name">Project 1</p>
											</div>
										</div>
										<div className="col-md-3">
											<span className="pull-right"><button className="btn btn-default b-options" type="submit">
											<span className="pull-right">view</span>
											<button className="btn btn-default b-options" type="submit">edit</button> 
											<button className="btn btn-default b-options" type="submit">delete</button></button></span>
										</div>
									</div>
									<div className="row myproj">
										<div className="col-md-9">
											<div className="col-md-9">
												<p className="project-name">Project 2</p>
											</div>
										</div>
										<div className="col-md-3">
											<span className="pull-right">
												<button className="btn btn-default b-options" type="submit">
												<span className="pull-right">view</span> 
												<button className="btn btn-default b-options" type="submit">edit</button>
												<button className="btn btn-default b-options" type="submit">delete</button></button>
											</span>
										</div>
									</div>
									<div className="row myproj">
										<div className="col-md-9">
											<div className="col-md-9">
												<p className="project-name">Project 3</p>
											</div>
										</div>
										<div className="col-md-3">
											<span className="pull-right">
											<button className="btn btn-default b-options" type="submit">
											<span className="pull-right">view</span>
											<button className="btn btn-default b-options" type="submit">edit</button>
											<button className="btn btn-default b-options" type="submit">delete</button></button></span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="panel panel-primary">
							<div className="panel-heading">
								<h4><span className="glyphicon glyphicon-list"></span> External Settings:</h4>
							</div>
							<div className="panel-body">
								<div className="row external-b">
									<div className="col-md-3">
										<p className="external-p">Enable/Disable Google Hangouts</p>
									</div>
									<div className="col-md-9">
										<span className="pull-right"><button className="btn btn-default b-options" type="submit">
										<span className="pull-right">Enable</span>
										<button className="btn btn-default b-options" type="submit">Disable</button></button></span>
									</div>
								</div>
								<div className="row external-b">
									<div className="col-md-3">
										<p className="external-p">Enable/Disable Github Notifications</p>
									</div>
									<div className="col-md-9">
											<span className="pull-right"><button className=
											"btn btn-default b-options" type=
											"submit"><span className=
											"pull-right">Enable</span>
											<button className=
											"btn btn-default b-options" type=
											"submit">Disable</button></button></span>
									</div>
								</div>
								<div className="row external-b">
									<div className="col-md-3">
										<p className="external-p">Enable/Disable
										Email Notifications</p>
									</div>
									<div className="col-md-9">
										<span className="pull-right"><button className="btn btn-default b-options" type="submit"><span className="pull-right">Enable</span>
										<button className="btn btn-default b-options" type="submit">Disable</button></button></span>
									</div>
								</div>
							</div>
						</div>
					</div>
			</div>
		</div>
	);
};