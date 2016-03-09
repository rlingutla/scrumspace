import React from 'react';
import Task from './Task';

//For some reason my linter says there is a semicolen missing... I can't find it.
export default class StoryPanel extends React.Component {
	constructor(props){
		super(props);
    this.state = { data: props.data, name: '', details: ''};
	}

  //since there are two inputs... there needs to be two functions
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleDetailChange(e) {
    this.setState({ details: e.target.value });
  }


	render(){
		return (
      <div className="panel panel-primary">
        <div className="panel-heading">
        {
          (this.props.notOnly) ? <button type="button" className="close">&times;</button> : null
        }
          <h4><span className="glyphicon glyphicon-book"></span> Story {this.props.number}</h4>
        </div>
        <div className="panel-body">
          <div className="row story-panel">
            <div className="col-md-6">
              <div className="story-input sat-pad">
                <label>Enter a Story</label>
                <input type="text" className="form-control strech-input" placeholder="Something you want to get done!"
                value={this.state.name} onChange={(e) => this.handleNameChange(e)}
                />
              </div>
            </div>
          </div>
          <div className="row story-panel">
            <div className="col-md-6">
              <div className="task-detail-input sat-pad">
                <label>Enter Story Details</label>
                <textarea className="form-control strech-input" rows="6" placeholder="Enter Story Details"
                value={this.state.details} onChange={(e) => this.handleDetailChange(e)}
                />
              </div>
            </div>
            <Task notOnly={false}/>
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
