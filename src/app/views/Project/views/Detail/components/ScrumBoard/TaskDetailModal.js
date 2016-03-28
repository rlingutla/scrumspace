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

class TaskDetailModal extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			description: {
				value: props.task.description,
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
			let task = Object.assign({}, this.props.task, {[target]: e.target.value.trim()});
			// update the task
			this.props.updateTask(task.project_id, task.story_id, task);
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
				<Modal show={this.props.isModalOpen} onHide={(e) => this.props.changeModal(e)} className={"task-detail " + this.props.task.status}>
					<Modal.Header closeButton>
						<Modal.Title>
							{/*<span className="task_id">{this.props.task._id} </span>*/}
							{(this.state.description.editing) ?
								<input className="form-control" autoFocus
									onChange={(e) => this.handleChange('description', e)}
									value={this.state.description.value}
									onBlur={(e) => this.handleBlur('description', e)}
									onKeyDown={(e) => this.handleKeyDown('description', e)}
									style={{width: 'auto'}}/>
								:<span className="editable" onClick={(e) => this.toggleEdit('description', true)}>{this.props.task.description}</span>
							}
							<span className="task-story">, from story {this.props.task.story_id}</span>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body style={{ paddingTop: 0 }}>
					<TaskStatus status={this.props.task.status} />
					<br/>
					<Row>
						<Col xs={8}>
							<Row>
							<h4>Assigned To:</h4>
							{this.props.task.assignedTo.map((user,i) => {
								return (
									<ButtonGroup key={i}>
										<Button><AssignedMember {...user} /></Button>
										<Button><strong>X</strong></Button>
									</ButtonGroup>
								);
							})}
							<br></br>
							<div className="input-group">
								<span className="input-group-addon" id="basic-addon1"> <span className="glyphicon glyphicon-plus"></span></span>
								<MultiSelect className="form-control" aria-describedby="basic-addon1" collection="users"
									labelKey="display_name" valueKey="_id" updateState={(members) => this.setAssignedTo(members)}/>
								</div>
							</Row>
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

//redux
const mapStateToProps = (state) => {
	return state;
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	//do our nasty search
	let theTask = stateProps
	.projects.find((proj) => proj._id === ownProps.project_id)
	.stories.find((story) => story._id === ownProps.story_id)
	.tasks.find((task) => task._id === ownProps._id);
	return Object.assign({ isModalOpen: ownProps.isModalOpen, changeModal: ownProps.changeModal, updateTask: ownProps.updateTask }, {task: theTask}, dispatchProps);
}

//maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(TaskDetailModal);