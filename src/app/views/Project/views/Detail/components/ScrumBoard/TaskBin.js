import React from 'react';
import ItemTypes from '../../../../../../constants/itemTypes';
import TaskTypes from '../../../../../../constants/taskTypes';

import { DropTarget } from 'react-dnd';

const taskTarget = {
	canDrop(props, monitor) {
		const item = monitor.getItem();
		return true;
	},

	hover(props, monitor, component) {

	},

	drop(props, monitor, component) {
		//check if dropping in correct story (not working)
		if(component.props.story_id !== props.story_id) return false;

		// Obtain the dragged item
		const item = monitor.getItem();

		// create new task object with updated status
		let updatedTask = Object.assign({}, item, {status: props.type.title})

		//component.props.container has dropped target
		item.moveTask(item.project_id, item.story_id, updatedTask);
		return { moved: true };
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
	}

	render(){
		const { isOver, canDrop, connectDropTarget } = this.props;

		return connectDropTarget(
			<td id={this.props.id}>
				<div>
					<div id="task-container" style={isOver ? {borderStyle: 'dashed', borderColor: '#A9A9A9'}:null}>
						{this.props.children}
					</div>
				</div>
			</td>
		);
	}
}

export default DropTarget(props => ItemTypes.TASK+"_"+props.story_id, taskTarget, collect)(TaskBin);