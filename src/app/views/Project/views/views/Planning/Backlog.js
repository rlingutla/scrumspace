import React from 'react';
import StoryWrapper from './StoryWrapper';

//Holds stories not tied to a sprint
export default class Backlog extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h4>Backlog </h4>
				</div>
				<div className="panel-body">
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
