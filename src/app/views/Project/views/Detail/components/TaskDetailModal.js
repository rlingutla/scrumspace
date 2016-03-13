import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput } from 'react-bootstrap';
import { connect } from 'react-redux';
export default class TaskDetailModal extends React.Component{

	constructor(props) {
		super(props);
	}

	render(){
		return <div></div>;
	}
	//DISABLED
	fakeRender(){
		return (
			<Modal show={this.props.isModalOpen} onHide={(e) => this.props.changeModal(e)}>
				<Modal.Header closeButton>
					<Modal.Title>{this.props._id}: {this.props.description}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h3><b> Story {this.props._id}</b></h3>
					<h4><p>{this.props.description}</p></h4>
					<br></br>
					<div className="row left-right-align">
						<div className="col-md-6">
							<b>Status</b>
							<br></br>
							{this.props.status}
							<br></br>
							<br></br>
						</div>
						<div className="col-md-6">
							<b>Assigned To</b>
							<br></br>
							{/* TODO, make multiple users assignable. */}
							<ul >
								<span>{(this.props.assignedTo > -1) ? this.props.users[this.props.assignedTo].display_name : "No assigned users"}</span>
								<button type="button" class="btn btn-default">
									<span className="glyphicon glyphicon-trash"></span>
								</button>
							</ul>
							<input type="text" className="form-control" id="inputMember" placeholder="Add Member"/>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			);
		}
	}
