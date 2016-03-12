import React from 'react';
import ItemTypes from '../../../../../../constants/itemTypes';
import { changeTaskState } from '../../../../../../actions/';

import { DropTarget } from 'react-dnd';

const taskTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    debugger;
    return true;
  },

  hover(props, monitor, component) {

  },

  drop(props, monitor, component) {
    // Obtain the dragged item
    const item = monitor.getItem();
    item.moveTask(item.project_id, item.story_id, item._id, props.type.title);
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
			<td id={this.props.id} className={isOver ? 'hovering':'' }>
        <div id="task-container">
				  {this.props.children}
        </div>
			</td>
		)
	}
}

export default DropTarget(ItemTypes.TASK, taskTarget, collect)(TaskBin);