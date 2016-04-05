import React from 'react';
import Story from './Story';
import { ButtonGroup, Button } from 'react-bootstrap';
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
		let sprint_state_class = (this.props.data._id === this.props.current_sprint) ? 'active':'planning';

		return connectDropTarget(
			<div className={`panel panel-primary ${sprint_state_class}`}>
				<div className="panel-heading">
					{
					(this.props.data._id === this.props.current_sprint) ? null:
					<button type="button" className="close" onClick={(e) => this.props.handleRemove('sprint', this.props.data)}>&times;</button>
					}
					<h4 style={{display: 'inline-block'}}>{this.props.data.name} ({sprint_state_class})</h4> 
				</div>
				<div className="panel-body" style={isOver ? {background: '#E8E8E8',borderWidth: '1px', borderStyle: 'dashed', borderColor: '#A9A9A9', minHeight: '120px'}:{minHeight: '120px'}}>
					<div className="row">
						{(this.props.stories.length > 0) ?
							this.props.stories.map( (e, i, array) =>{
								return(
									<Story key={i} index={i} data={e} last={i === array.length -1} handleRemove={this.props.handleRemove} isOnly= {array.length === 1}
									updateState={this.props.updateState} handleEdit={this.props.handleEdit}/>
								);
							}):<div style={{textAlign: 'center', padding: '30px 15px 15px 15px'}}>Sprint is empty. Add stories by dragging them from your Backlog.</div>
						}
					</div>
				</div>
				<div className="panel-footer">
					<div style={{textAlign: 'right'}}>
					    {(this.props.current_sprint === null) ? <Button className="save" bsStyle="success" onClick={(e) => this.props.startSprint(this.props.project_id, this.props.data._id)}>Start Sprint</Button>:null}
					    <Button className="save" bsStyle="warning" onClick={e => this.props.handleEdit('sprint', this.props.data)}>Edit Sprint</Button>
					</div>
				</div>
			</div>
    );
  }
}

export default DropTarget(ItemTypes.STORY, storyTarget, collect)(SprintRow);
