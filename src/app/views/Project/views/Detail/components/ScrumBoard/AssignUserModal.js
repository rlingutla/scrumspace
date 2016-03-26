import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput } from 'react-bootstrap';
import { connect } from 'react-redux';
import TaskTypes from '../../../../../../constants/taskTypes';
import TaskStatus from '../../../../shared/TaskStatus';


export default class AssignUserModal extends React.Component{

	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div>
				<Modal show={this.props.isModalOpen} onHide={(e) => this.props.changeModal(e)} className={"task-detail " + this.props.status}>
					<Modal.Header closeButton>
						<Modal.Title>Title</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						The Body
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}
