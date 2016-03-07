import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button } from 'react-bootstrap';
import ItemTypes from '../../../constants/itemTypes';

import { connect } from 'react-redux';
import _ from 'underscore';

import { DragSource } from 'react-dnd';

import { changeTaskState } from '../../../actions/';


const taskSource = {
	beginDrag(props){
		console.log("start draggin!", props);

		return props;
	}
}

function collect(connect, monitor){
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
};

class Task extends React.Component {
	constructor(props) {
		super(props);

		this.state = { modal: false };

		//give functions access to class this
		this.openDetail = this.openDetail.bind(this);
		this.closeDetail = this.closeDetail.bind(this);
	}

	openDetail(){
		this.setState({ modal: true });
	}
	closeDetail(){
		this.setState({ modal: false });
	}

	render() {
		const {connectDragSource, id, onMove, isDragging, ...props} = this.props;

		if(isDragging){
			return (
				<div>
					<div className="task draggingSource"></div>
				</div>
			);
		}

		return connectDragSource(
			<div>
				<div className="task" onClick={this.openDetail}>
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
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	//do our nasty search
	let theTask = stateProps
	.projects.find((proj) => proj._id == ownProps.project_id)
	.stories.find((story) => story._id == ownProps.story_id)
	.tasks.find((task) => task._id == ownProps._id);

	return Object.assign(theTask, ownProps, dispatchProps);
}

//maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {
  	moveTask: (project_id, story_id, task_id, toType) => {
  		dispatch(changeTaskState(project_id, story_id, task_id, toType));
  	}
  };
}

const TaskContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DragSource(ItemTypes.TASK, taskSource, collect)(Task));

export default TaskContainer;