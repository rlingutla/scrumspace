import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput, Row, Col, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import Ionicon from 'app/shared/components/Ionicon';
import { connect } from 'react-redux';
import TaskTypes from 'app/shared/constants/taskTypes';
import TaskStatus from 'Project/shared/TaskStatus';
import MultiSelect from 'app/shared/components/MultiSelect';
import Select from 'react-select';

const AssignedMember = (props) => {
	return(
		<span>{props.first_name} {props.last_name} </span>
	);
};

class TaskDetailModal extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			description: {
				value: props.task.description,
				editing: false
			},
			assigned_to: this.props.task.assigned_to || [],
			blocked_by: this.props.task.blocked_by || []
		};
	}

	setAssigned_to(members) {
		this.setState({
			assigned_to: members
		});
		this.props.task.assignUsers(this.props.task.project_id, this.props.task.story_id, this.props.task._id, members);
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
			let task = Object.assign({}, this.props.task, {description: e.target.value.trim()});
			// update the task
			this.props.task.updateTask(task.project_id, task.story_id, task._id, null, e.target.value.trim());
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

	handleBlockedChange(tasks){
		this.setState({
			blocked_by: tasks
		});
		this.props.task.assignBlocking(this.props.task.project_id, this.props.task.story_id, this.props.task._id, tasks);
	}

	//filter out already assigned users
	filterAssignedList(option,filter){
		let user = this.props.task.assigned_to.find((user) => (user._id === option._id));
		return (user) ? false : true;
	}

	render(){
		return (
			<div className={'task-detail ' + this.props.status}>
				<Modal show={this.props.isModalOpen} onHide={(e) => this.props.changeModal(e)} className={'task-detail ' + this.props.task.status}>
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
					<Modal.Body style={{ paddingTop: 0 }} className="select-support">
						<TaskStatus status={this.props.task.status} />
						<br/>
						<Row className="left-right-align">
							<Col xs={8}>
								{(this.props.task.status === 'BLOCKED') ? (
									<div>
										<h5>Blocked By:</h5>
										<Select multi
										    name="blockingTasks"
										    value={this.state.blocked_by}
										    options={this.props.tasks}
										    labelKey="description"
										    valueKey="_id"
										    onChange={this.handleBlockedChange.bind(this)}/>
									</div>
								):null}
								<hr />
								<h5>Assigned To:</h5>
								<MultiSelect className="form-control" 
									collection="users"
									labelKey="display_name" 
									valueKey="_id" 
									updateState={(members) => this.setAssigned_to(members)} 
									filterOption={this.filterAssignedList.bind(this)}
									initialState={this.state.assigned_to}/>
							</Col>
							<Col xs={4} style={{textAlign:'right'}}>
								<ButtonGroup vertical>
									<Button disabled>Take Task</Button>
									<Button disabled bsStyle="danger">Delete Task</Button>
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
	let tasks = stateProps
	.projects.find((proj) => proj._id === ownProps.project_id)
	.stories.find((story) => story._id === ownProps.story_id)
	.tasks;

	let theTask = stateProps
	.projects.find((proj) => proj._id === ownProps.project_id)
	.stories.find((story) => story._id === ownProps.story_id)
	.tasks.find((task) => task._id === ownProps._id);
	return Object.assign(
		{ isModalOpen: ownProps.isModalOpen, changeModal: ownProps.changeModal, updateTask: ownProps.updateTask }, 
		{ task: theTask }, 
		{ tasks },
		dispatchProps
	);
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