import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import TaskTypes from '../../../../../../constants/taskTypes';
import TaskStatus from '../../../../shared/TaskStatus';


const AssignedMember = (props) => {
	return(
		<span>{props.first_name} {props.last_name} </span>
	)
}

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
						<br/>
						<Row>
							<Col xs={8}>
								<h4>Assigned To:</h4>
								{this.props.assignedTo.map((user,i) => {
									return <AssignedMember key={i} {...user} />
								})}
							</Col>
							<Col xs={4} style={{textAlign:"right"}}>
								<Button>Take Task</Button>
								<Button bsStyle="danger">Delete Task</Button>
							</Col>
						</Row>
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}
