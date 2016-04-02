import React from 'react';
import Story from './Story';
//DnD
import ItemTypes from 'app/shared/constants/itemTypes';

import { DropTarget } from 'react-dnd';

const storyTarget = {
	canDrop(props, monitor) {
		let item = monitor.getItem();
		return true;
	},

	hover(props, monitor, component) {},
	drop(props, monitor, component) {
	  let item = monitor.getItem();
	  props.save('move-story', item.data, props.data._id);
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

//This row represents a "sprint"
class SprintRow extends React.Component {
  constructor(props){
		super(props);
	}

	render() {
		const { isOver, canDrop, connectDropTarget } = this.props;

		return connectDropTarget(
      <div className="panel panel-primary">
        <div className="panel-heading">
					{
						(this.props.isCurrentSprint) ? null : <button type="button" className="close" onClick={(e) => this.props.handleRemove('sprint', this.props.data)}>&times;</button>
					}

          <h4 style={{cursor: 'pointer'}} onClick={e => this.props.handleEdit('sprint', this.props.data)}>{this.props.data.name}</h4> </div>
        <div className="panel-body" style={isOver ? {background: '#E8E8E8',borderWidth: '1px', borderStyle: 'dashed', borderColor: '#A9A9A9', minHeight: '120px'}:{minHeight: '120px'}}>
          <div className="row">
						{
							this.props.stories.map( (e, i, array) =>{
								return(
									<Story key={i} index={i} data={e} last={i === array.length -1} handleRemove={this.props.handleRemove} isOnly= {array.length === 1}
										updateState={this.props.updateState} handleEdit={this.props.handleEdit}/>
								);
							})
						}
          </div>
        </div>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.STORY, storyTarget, collect)(SprintRow);
