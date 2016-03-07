import React from 'react';
import ItemTypes from '../../../../../../constants/itemTypes';
import { changeTaskState } from '../../../../../../actions/';

import { DropTarget } from 'react-dnd';

const taskTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    // return canMakeChessMove(item.fromPosition, props.position);
    return true;
  },

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // // You can access the coordinates if you need them
    // const clientOffset = monitor.getClientOffset();

    // // You can check whether we're over a nested drop target
    // const isJustOverThisOne = monitor.isOver({ shallow: true });

    // // You will receive hover() even for items for which canDrop() is false
    // const canDrop = monitor.canDrop();
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();
    
    item.moveTask(item.project_id, item.story_id, item._id, props.type); //get type

    // You can do something with it
    // ChessActions.movePiece(item.fromPosition, props.position);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
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
				{this.props.children}
			</td>
		)
	}
}

export default DropTarget(ItemTypes.TASK, taskTarget, collect)(TaskBin);