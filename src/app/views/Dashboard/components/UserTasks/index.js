import React, { Component } from 'react';
import UserTaskTotals from './UserTaskTotals';
import Task from './Task';
import BasePanel from '../shared/BasePanel';

export default class UserTasks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAssignedTasks: true
		};
	}

	changeState(bool) {
		this.state.showAssignedTasks = bool;
		this.setState(this.state);
	}

	render() { 
		return (
			<div className="col-md-6 col-lg-6">
				<BasePanel >
					<div style={{borderBottom: '1px solid #E0E0E0', paddingBottom: '8px', paddingTop: '8px', height: '56px', paddingLeft: '25px', paddingRight: '25px'}}>
						<ul className="nav nav-tabs project-nav" role="tablist">
							<span style={{float: 'left', textAlign: 'center', width: '50%'}}>
								<li role='presentation' className={(this.state.showAssignedTasks) ? 'active' : ''} onClick={(e) => this.changeState(true)}>
									<a style={{padding: '0 0 0 0'}}><h4>Assigned Tasks</h4></a>
								</li>
							</span>
							<span style={{float: 'left', textAlign: 'center', width: '50%'}}>
								<li role='presentation' className={(!this.state.showAssignedTasks) ? 'active' : ''} onClick={(e) => this.changeState(false)}>
									<a style={{padding: '0 0 0 0'}}><h4>Actionable Tasks</h4></a>
								</li>
							</span>
						</ul>
					</div>
					<div style={{paddingLeft: '25px', paddingRight: '25px', height: '80%', width: '100%', overflowY: 'auto'}}>
						{ 
							this.props.tasks
							.filter((task) => {
								return (this.state.showAssignedTasks) ? (task.status !== 'UNASSIGNED') : (task.status === 'UNASSIGNED');
							}).map((e, i) => {
								return <Task key={i} id={e._id} status={e.status} description={e.description} />;
							}) 
						}
					</div>
				</BasePanel>
			</div>
		);
	}
}