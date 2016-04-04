import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput } from 'react-bootstrap';
import { connect } from 'react-redux';
import TaskTypes from 'app/shared/constants/taskTypes';
import MultiSelect from 'app/shared/components/MultiSelect';

import TaskStatus from 'Project/shared/TaskStatus';


export default class AssignUserModal extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			users: []
		};
	}

	setUsers(users){
		this.setState({users});
	}

	assignHandler(){
		if (this.state.users.length > 0) {
			this.props.callback(this.state.users, this.props.target, this.props.task);
		}
	}

	render(){
		return (
			<Modal show={this.props.isModalOpen} onHide={(e) => this.props.hideModal(e)} className={'task-detail ' + this.props.status}>
				<Modal.Header closeButton>
					<Modal.Title>Assign a User</Modal.Title>
				</Modal.Header>
				<Modal.Body className="select-support">
					<MultiSelect users={this.props.users} labelKey="display_name" valueKey="_id" updateState={(users) => this.setUsers(users)}/>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={(e) => this.props.hideModal(e)}>Cancel</Button>
					<Button bsStyle="primary" disabled={this.state.users.length < 1} onClick={(e) => this.assignHandler()}>Assign and Move Task</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
