import React from 'react';
import StoryWrapper from './StoryWrapper';

//This row represents a "sprint"
export default class SprintRow extends React.Component {
  constructor(props){
		super(props);
	}

	render() {
		return (
      <div className="panel panel-primary">
        <div className="panel-heading">
					{
						(this.props.isOnly) ? null : <button type="button" className="close" onClick={(e) => this.props.handleRemove('sprint', this.props.data)}>&times;</button>
					}
          <h4 onClick={e => this.props.handleEdit('sprint', this.props.data)}>{this.props.data.name}</h4> </div>
        <div className="panel-body">
          <StoryWrapper handleRemove={this.props.handleRemove} updateState={this.props.updateState} handleEdit={this.props.handleEdit} stories={this.props.stories}/>
        </div>
      </div>
    );
  }
}
