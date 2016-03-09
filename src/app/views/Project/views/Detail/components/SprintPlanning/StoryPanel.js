import React from 'react';
import Task from './Task';

export default class StoryPanel extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <button type="button" className="close">&times;</button>
          <h4><span className="glyphicon glyphicon-book"></span> Story 1</h4>
        </div>
        <div className="panel-body">
          <div className="row story-panel">
            <div className="col-md-6">
              <div className="story-input sat-pad">
                <label>Enter a Story</label>
                <input type="text" className="form-control strech-input" placeholder="Something you want to get done!"/>
              </div>
            </div>
          </div>
          <div className="row story-panel">
            <div className="col-md-6">
              <div className="task-detail-input sat-pad">
                <label>Enter Story Details</label>
                <textarea className="form-control strech-input" rows="6.1" placeholder="Enter Story Details"></textarea>
              </div>
            </div>
            <Task/>
          </div>
        </div>
        <div className="panel-footer sprint-footer">
          <div className="btn-group">
            <button type="button" className="btn btn-default pull-left no-side-margin">
              <span className="glyphicon glyphicon-list"></span> Add New Task
            </button>
            <button type="button" className="btn btn-default pull-left no-side-margin">
              <span className="glyphicon glyphicon-plus"></span> Add New Story
            </button>
          </div>
          <button type="button" className="btn btn-success pull-right no-side-margin">
            <span className="glyphicon glyphicon-ok"></span> Done
          </button>
        </div>
      </div>
		);
	}
}
