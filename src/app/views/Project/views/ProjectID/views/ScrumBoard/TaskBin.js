import React from 'react';
import ItemTypes from 'app/shared/constants/itemTypes';
import TaskTypes from 'app/shared/constants/taskTypes';
import moveHandler from './moveHandler';

import { DropTarget } from 'react-dnd';
import AssignUserModal from './AssignUserModal';
import BlockedTaskModal from './BlockedTaskModal';

const taskTarget = {
	canDrop(props, monitor) {
		const item = monitor.getItem();
		return true;
	},
	hover(props, monitor, component) {},
	drop(props, monitor, component) {
		// Obtain the dragged item
		const dragItem = monitor.getItem();

		moveHandler(dragItem, component).then((handleRes) => {
			if(handleRes.canMove){
				// create new task object with updated status
				let updatedTask = Object.assign({}, handleRes.task, {status: handleRes.target.title});
				updatedTask.updateTask(updatedTask.project_id, updatedTask.story_id, updatedTask);
				return { moved: true };
			}
			else return { moved: false };
		});
	}
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		isOverCurrent: monitor.isOver({ shallow: true }),
		canDrop: monitor.canDrop(),
		itemType: monitor.getItemType()
	};
}


class TaskBin extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			assignUserModal: {
				visible: false,
				target: null
			},
			blockedTaskModal: {
				visible: false,
				target: null
			}
		};
	}

	toggleModal(modalName, visible){
		this.setState({
			[modalName]: Object.assign({}, this.state.assignUserModal, {visible: visible})
		});
	}

	assignUsersAndMove(users, target, task){
		let updatedTask = Object.assign({}, task, {
			assignedTo: users, status: target.title
		});

		task.updateTask(task.project_id, task.story_id, updatedTask);
		this.toggleModal('assignUserModal', false);
	}

	assignBlockedAndMove(blockingTasks, target, task){
		let updatedTask = Object.assign({}, task, {
			blockedBy: blockingTasks, status: target.title
		});

		task.updateTask(task.project_id, task.story_id, updatedTask);
		this.toggleModal('blockedTaskModal', false);
	}

	render(){
		const { isOver, canDrop, connectDropTarget } = this.props;
		const containerStyle = {
			marginRight: '15px',
			display: 'inline-block',
			height: '100%',
			width: '90%'
		}

		return connectDropTarget(
			<td id={this.props.id}>
				<AssignUserModal 
					isModalOpen={this.state.assignUserModal.visible} 
					hideModal={() => this.toggleModal('assignUserModal',false)}
					callback={(users,target,task) => this.assignUsersAndMove(users,target,task)}
					target={this.state.assignUserModal.target}
					task={this.state.assignUserModal.task}/>
				<BlockedTaskModal 
					isModalOpen={this.state.blockedTaskModal.visible} 
					hideModal={() => this.toggleModal('blockedTaskModal',false)}
					callback={(blockingTasks, target, task) => this.assignBlockedAndMove(blockingTasks, target, task)}
					target={this.state.blockedTaskModal.target}
					task={this.state.blockedTaskModal.task}
					project_id={this.props.project_id}
					story_id={this.props.story_id}/>
				<div style={containerStyle}>
					<div id="task-container" style={isOver ? {borderStyle: 'dashed', borderColor: '#A9A9A9'}:null}>
						{this.props.children}
					</div>
				</div>
			</td>
		);
	}
}

export default DropTarget(props => ItemTypes.TASK+"_"+props.story_id, taskTarget, collect)(TaskBin);