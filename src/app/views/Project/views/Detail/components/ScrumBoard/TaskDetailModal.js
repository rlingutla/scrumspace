import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput } from 'react-bootstrap';
import { connect } from 'react-redux';
import TaskTypes from '../../../../../../constants/taskTypes';
import TaskStatus from '../../../../shared/TaskStatus';


export default class TaskDetailModal extends React.Component{

	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div className={"task-detail " + this.props.status}>
				<Modal show={this.props.isModalOpen} onHide={(e) => this.props.changeModal(e)} className={"task-detail " + this.props.status}>
					<Modal.Header closeButton>
						<Modal.Title>
							<span className="task_id">{this.props._id} </span> 
							{this.props.description}
							<span className="task-story">, from story {this.props.story_id}</span>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<TaskStatus status={this.props.status} />
						<br></br>
						<div className="row left-right-align">
							<div className="col-md-6">
								<b>Assigned To</b>
								<br></br>
								<ul>
									<button type="button" className="btn btn-default">
										<span className="glyphicon glyphicon-trash"></span>
									</button>
								</ul>
								<input type="text" className="form-control" id="inputMember" placeholder="Add Member"/>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}
