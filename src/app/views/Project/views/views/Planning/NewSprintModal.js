import React, { Component } from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput } from 'react-bootstrap';

export default class NewSprintModal extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="sprint-modal">
				<Modal show={this.props.isOpen} onHide={this.props.changeModal}>
				    <Modal.Header closeButton>
						<Modal.Title>
							<span className="task_id">Sprint</span>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="row">
							<div className="col-md-4">
								<div className="left-date-input">
									<label>Sprint Name</label>
									<input type="text" className="form-control strech-input" placeholder="Name of Sprint"
									value={this.props.data.name} onChange={(e) =>this.props.updateState('sprintModal', 'name', e)}
									/>
								</div>
							</div>
							<div className="col-md-4">
								<div className="left-date-input">
									<label>Scrum Time</label>
									<input type="text" className="form-control strech-input" placeholder="Time of Scrum"
									value={this.props.data.scrum_time} onChange={(e) => this.props.updateState('sprintModal', 'scrum_time', e)}
									/>
								</div>
							</div>
							<div className="col-md-4">
								<div className="left-date-input">
									<label>Duration</label>
									<input type="text" className="form-control strech-input" placeholder="Enter Duration"
									value={this.props.data.duration} onChange={(e) => this.props.updateState('sprintModal', 'duration', e)}
									/>
								</div>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<button type="button" className="btn btn-default" data-dismiss="modal" onClick={(e) => this.props.save('sprint', this.props.data)}>Done</button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}
