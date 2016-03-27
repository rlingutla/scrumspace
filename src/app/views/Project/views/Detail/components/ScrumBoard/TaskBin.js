import React from 'react';
import ItemTypes from '../../../../../../constants/itemTypes';
import TaskTypes from '../../../../../../constants/taskTypes';

import { DropTarget } from 'react-dnd';
import AssignUserModal from './AssignUserModal';

const moveHandler = (item, target) => {
	return new Promise((resolve, reject) => {
		//moving from UNASSIGNED
		if(item.status === TaskTypes.UNASSIGNED.title && target.props.type !== TaskTypes.UNASSIGNED){
			if(item.assignedTo.length < 1){
				target.setState({ 
					assignUserModal: Object.assign({}, 
						target.state.assignUserModal, 
						{visible: true, task: item, target: target.props.type.title})
				})
				return resolve(false);
			}
		}

		return resolve(true);
    });	
}

const taskTarget = {
	canDrop(props, monitor) {
		const item = monitor.getItem();
		return true;
	},

	hover(props, monitor, component) {

	},

	drop(props, monitor, component) {
		// if(component.props.story_id !== props.story_id) return false;

		// Obtain the dragged item
		const item = monitor.getItem();

		moveHandler(item, component).then((canDrop) => {
			if(canDrop){
				// create new task object with updated status
				let updatedTask = Object.assign({}, item, {status: props.type.title})

				//component.props.container has dropped target
				item.moveTask(item.project_id, item.story_id, updatedTask);
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
			}
		};
	}

	toggleUserAssignModal(visible){
		this.setState({
			assignUserModal: Object.assign({}, this.state.assignUserModal, {visible: visible})
		});
	}

	assignUsersAndMove(users, target, task){
		let updatedTask = Object.assign({}, task, {
			assignedTo: users,
			status: target
		});

		task.moveTask(task.project_id, task.story_id, updatedTask);
		this.toggleUserAssignModal(false);
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
					hideModal={() => this.toggleUserAssignModal(false)}
					callback={(users,target,task) => this.assignUsersAndMove(users,target,task)}
					target={this.state.assignUserModal.target}
					task={this.state.assignUserModal.task}/>
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