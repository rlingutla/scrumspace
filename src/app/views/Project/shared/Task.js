import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button } from 'react-bootstrap';
import TaskDetailModal from '../views/views//ScrumBoard/TaskDetailModal';
import AssignUserModal from '../views/views/ScrumBoard/AssignUserModal';

import ItemTypes from '../../../constants/itemTypes';
import TaskTypes from '../../../constants/taskTypes';

import { connect } from 'react-redux';
import _ from 'underscore';

import { DragSource } from 'react-dnd';

import { updateTask } from '../../../actions/';

const taskSource = {
	beginDrag(props){
		return props;
	},
	endDrag(props, monitor, component){
		if(monitor.didDrop()){
			let task = monitor.getDropResult();
			let item = monitor.getItem();
		}
	}
};

function collect(connect, monitor){
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}

class Task extends React.Component {
	constructor(props) {
		super(props);

		this.state = { 
			isModalOpen: false,
			assignUserModal: false
		};
	}

	changeModal(){
		let modal = !this.state.isModalOpen;
		this.setState({ isModalOpen: modal});
	}

	hideUserAssignModal(){
		this.setState({assignUserModal: false});
	}

	getTaskStyle(status){
		return { borderColor: TaskTypes[status].color };
	}

	render() {
		const {connectDragSource, id, onMove, isDragging, ...props} = this.props;

		if (isDragging){
			return (
				<div>
					<div className="task draggingSource"></div>
				</div>
			);
		}

		let theTask = (
			<div>
				<AssignUserModal isModalOpen={this.state.assignUserModal} hideModal={(e) => this.hideUserAssignModal(e)}/>
				<div className="task" onClick={(e) => this.changeModal(e)} style={this.getTaskStyle(this.props.status)}>
				    <TaskDetailModal {...this.props} changeModal={(e) => this.changeModal(e)} isModalOpen={this.state.isModalOpen} />
				    <div className="body">{this.props.description}</div>
				    <div className="footer" style={{padding: '5px 0'}}>
				        <div className="row left-right-align">
				            {/* <div style={{float:'left'}}><a>{this.props._id}</a></div> */}
				            <div style={{float:'right'}}>
				            	{this.props.assignedTo ? 
				            		this.props.assignedTo.map((user, i) => 
				            			<span key={i} className="avatar" style={{backgroundImage: `url(${user.avatar_url})`}}></span>
				            		):null
				            	}
				            </div>
				        </div>
				    </div>
				</div>
			</div>
		);

		return connectDragSource(theTask, {dropEffect: 'move'});
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
	.tasks.find((task) => task._id === ownProps.task_id);
	return Object.assign(theTask, 
		{ 
			project_id: ownProps.project_id, 
			story_id: ownProps.story_id, 
			_id: ownProps.task_id, 
			users: ownProps.users  //TODO: can we take this out?
		}, 
		dispatchProps);
}

//maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {
  	updateTask: (project_id, story_id, task) => {
  		// dispatch(changeTaskState(project_id, story_id, task_id, toType));
  		dispatch(updateTask(project_id, story_id, task));
  	}
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DragSource(props => ItemTypes.TASK + '_' + props.story_id, taskSource, collect)(Task));
