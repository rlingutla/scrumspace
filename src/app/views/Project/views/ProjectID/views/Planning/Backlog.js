import React from 'react';
import StoryWrapper from './StoryWrapper';

//DnD
import ItemTypes from 'app/shared/constants/itemTypes';
import { DropTarget } from 'react-dnd';

const storyTarget = {
	canDrop(props, monitor) {
		const item = monitor.getItem();
		return true;
	},

	hover(props, monitor, component) {},
	drop(props, monitor, component) {
		//debugger;
	  let item = monitor.getItem();
	  props.save('move-story', item.data, null);
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

//Holds stories not tied to a sprint
class Backlog extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		const { isOver, canDrop, connectDropTarget } = this.props;

		return connectDropTarget(
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h4>Backlog </h4>
				</div>
				<div className="panel-body" style={isOver ? {background: '#E8E8E8', borderWidth: '1px', borderStyle: 'dashed', borderColor: '#A9A9A9', minHeight: '120px'}:{minHeight: '120px'}}>
					<StoryWrapper handleRemove={this.props.handleRemove} updateState={this.props.updateState} handleEdit={this.props.handleEdit} stories={this.props.stories}/>
				</div>
				<div className="panel-footer settings-foot">
					<button type="save" onClick={(e) => this.props.handleNew('story')} className="btn btn-success pull-right save">New Story</button>
					<button type="save" onClick={(e) => this.props.handleNew('sprint')} className="btn btn-success pull-right save">New Sprint</button>
				</div>
			</div>
		 );
	}
}

export default DropTarget(ItemTypes.STORY, storyTarget, collect)(Backlog);
