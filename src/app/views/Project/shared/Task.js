import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button } from 'react-bootstrap';
import TaskDetailModal from '../views/Detail/components/TaskDetailModal';

import ItemTypes from '../../../constants/itemTypes';
import TaskTypes from '../../../constants/taskTypes';

import { connect } from 'react-redux';
import _ from 'underscore';

import { DragSource } from 'react-dnd';

import { changeTaskState, putAndChangeTaskState } from '../../../actions/';


const taskSource = {
	beginDrag(props){
		return props;
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
			isModalOpen: false 
		};
	}

	changeModal(){
		let modal = !this.state.isModalOpen;
		this.setState({ isModalOpen: modal});
	}

	getTaskStyle(status){
		return { borderColor: TaskTypes[status].color };
	}

	render() {
		const {connectDragSource, id, onMove, isDragging, ...props} = this.props;
		const taskStyles = {

		};

		if (isDragging){
			return (
				<div>
					<div className="task draggingSource"></div>
				</div>
			);
		}

		return connectDragSource(
			<div>
				<div className="task" onClick={(e) => this.changeModal(e)} style={this.getTaskStyle(this.props.status)}>
				    <TaskDetailModal {...this.props} changeModal={(e) => this.changeModal(e)} isModalOpen={this.state.isModalOpen} />
				    <div className="heading">
				        <div className="row left-right-align">
				            <div className="col-md-6"><a>{this.props._id}</a></div>
				            <div className="col-md-6"></div>
				        </div>
				    </div>
				    <div className="body">{this.props.description}</div>
				</div>
			</div>,
			{dropEffect: 'move'}
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
	.tasks.find((task) => task._id === ownProps.task_id);
	return Object.assign(theTask, 
		{ 
			project_id: ownProps.project_id, 
			story_id: ownProps.story_id, 
			_id: ownProps.task_id, 
			users: ownProps.users 
		}, 
		dispatchProps);
}

//maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {
  	moveTask: (project_id, story_id, task_id, toType) => {
  		// dispatch(changeTaskState(project_id, story_id, task_id, toType));
  		dispatch(putAndChangeTaskState(project_id, story_id, task_id, toType));
  	}
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DragSource(ItemTypes.TASK, taskSource, collect)(Task));
