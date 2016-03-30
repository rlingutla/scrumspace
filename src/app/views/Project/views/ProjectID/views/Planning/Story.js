import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from 'app/shared/constants/itemTypes';

const storySource = {
  beginDrag(props){
    return props;
  },
  endDrag(props, monitor, component){
    //do something? maybe??????
  }
};

function collect(connect, monitor){
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

//This story may be in a sprint, or not
class Story extends React.Component {
  constructor(props){
		super(props);
    this.state = this.props;
	}

	render() {
    const {connectDragSource, isDragging, ...props} = this.props;

		return connectDragSource(
      <div className="planning-story col-md-3" style={{cursor: 'pointer'}}>
        <div className="panel panel-default" data-toggle="modal" data-target="#myModal ">
          <div className="panel-heading">
            <button type="button" className="close" onClick={e => this.props.handleRemove('story', this.props.data)}>&times;</button>
						{this.props.data.title}
					</div>
          <div className="panel-body" onClick={e => this.props.handleEdit('story', this.props.data)}>
            <p>{this.props.data.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default DragSource(ItemTypes.STORY, storySource, collect)(Story);
