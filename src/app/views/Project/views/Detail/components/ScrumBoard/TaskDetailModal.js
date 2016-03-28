import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput, Row, Col, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import Ionicon from '../../../../../../shared/components/Ionicon';
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
			},
			assignedTo: []
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

	addMembers(){
		let task = Object.assign({}, 
			this.props.task, 
			{assignedTo: [
				...this.props.task.assignedTo,
				...this.state.assignedTo
			]}
		);
		// update the task
		this.props.updateTask(task.project_id, task.story_id, task);
		this.setState({assignedTo: []})
	}

	removeMember(user){
		let task = Object.assign({}, 
			this.props.task, 
			//new assignedTo array with user removed
			{assignedTo: this.props.task.assignedTo.filter((member) => member._id !== user._id)}
		);
		// update the task
		this.props.updateTask(task.project_id, task.story_id, task);
	}

	//filter out already assigned users
	filterAssignedList(option,filter){
		let user = this.props.task.assignedTo.find((user) => (user._id === option._id));
		return (user) ? false:true;
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
						<Row className="left-right-align">
							<Col xs={8}>
								{(this.props.task.assignedTo.length > 0) ? 
									<div>
										<h5>Assigned To:</h5>
										{this.props.task.assignedTo.map((user,i) => {
											return (
												<ButtonGroup style={{paddingBottom: '10px', marginRight: '10px'}} key={i}>
													<Button className="fake"><AssignedMember {...user} /></Button>
													<Button style={{fontSize: '20px'}} onClick={(e) => this.removeMember(user)}>
														<span><Ionicon icon="ion-ios-close-empty"/></span>
													</Button>
												</ButtonGroup>
											);
										})}
										
									</div>:null}

									<hr />

								<MultiSelect className="form-control" 
									collection="users"
									labelKey="display_name" 
									valueKey="_id" 
									updateState={(members) => this.setAssignedTo(members)} 
									filterOption={this.filterAssignedList.bind(this)}/>
								<Button 
									disabled={this.state.assignedTo.length < 1}
									style={{marginTop: '10px'}} 
									bsStyle="primary" 
									onClick={(e) => this.addMembers(e)}>
									Add Members
								</Button>
							</Col>
							<Col xs={4} style={{textAlign:"right"}}>
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
	//do our nasty search
	let theTask = stateProps
	.projects.find((proj) => proj._id === ownProps.project_id)
	.stories.find((story) => story._id === ownProps.story_id)
	.tasks.find((task) => task._id === ownProps._id);
	return Object.assign(
		{ isModalOpen: ownProps.isModalOpen, changeModal: ownProps.changeModal, updateTask: ownProps.updateTask }, 
		{ task: theTask }, 
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