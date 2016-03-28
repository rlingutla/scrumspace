import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput, Row, Col, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import TaskTypes from '../../../../../../constants/taskTypes';
import TaskStatus from '../../../../shared/TaskStatus';
import MultiSelect from '../../../../../../shared/components/MultiSelect';

const AssignedMember = (props) => {
	return(
		<span>{props.first_name} {props.last_name} </span>
	)
}

export default class TaskDetailModal extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			description: {
				value: props.description,
				editing: false
			}
		}
	}

	setAssignedTo(members) {
		this.setState({
			assignedTo: members
		});
	}

	toggleEdit(target, value){
		let edit = Object.assign({}, this.state[target], { editing: value });
		this.setState({
			[target]: edit
		});
	}

	handleBlur(target, e){
		if(e.target.value){
			this.toggleEdit(target, false);
			let story = Object.assign({}, this.props, {[target]: e.target.value.trim()});
			//update the story
			this.props.updateStory(this.props.project_id, story);
		}

	}

	handleChange(target, e){
		let changed = Object.assign({}, this.state[target], { value: e.target.value });
		this.setState({
			[target]: changed
		});
	}

	handleKeyDown(target, e){
		switch(e.keyCode){
			//enter key pressed
			case 13:
			if(!e.shiftKey){
				e.target.blur();
				this.handleBlur(target, e);
			}
		}
	}

	render(){

		return (
			<div className={"task-detail " + this.props.status}>
				<Modal show={this.props.isModalOpen} onHide={(e) => this.props.changeModal(e)} className={"task-detail " + this.props.status}>
					<Modal.Header closeButton>
						<Modal.Title>
							<span className="task_id">{this.props._id} </span>

							{(this.props.description) ?
								<input autoFocus
									onChange={(e) => this.handleChange('title', e)}
									value={this.props.description}
									onBlur={(e) => this.handleBlur('title', e)}
									onKeyDown={(e) => this.handleKeyDown('title', e)}
									/>
								:<h4 className="editable" onClick={(e) => this.toggleEdit('title', true)}>{this.props.description}</h4>
						}
						<span className="task-story">, from story {this.props.story_id}</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<TaskStatus status={this.props.status} />
					<br/>
					<Row>
						<Col xs={8}>

							<h5>Assigned To:</h5>
							{this.props.assignedTo.map((user,i) => {
								return (
									<Row >
									<ButtonGroup style={{paddingBottom:10}} >
										<Button ><AssignedMember key={i} {...user} /></Button>
										<Button ><strong>X</strong></Button>
								</ButtonGroup>
								</Row>
								);
							})}

							<div className="input-group">
								<span className="input-group-addon" id="basic-addon1"> <span className="glyphicon glyphicon-plus"></span></span>
								<MultiSelect className="form-control" aria-describedby="basic-addon1" collection="users"
									labelKey="display_name" valueKey="_id" updateState={(members) => this.setAssignedTo(members)}/>
								</div>

							</Col>

							<Col xs={4} style={{textAlign:"right"}}>
								<ButtonGroup vertical>
									<Button>Take Task</Button>
									<Button bsStyle="danger">Delete Task</Button>
								</ButtonGroup>
							</Col>

						</Row>
					</Modal.Body>
				</Modal>
			</div>
		);
	}

}
