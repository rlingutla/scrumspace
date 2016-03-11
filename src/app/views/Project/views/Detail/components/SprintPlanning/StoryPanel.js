import React from 'react';
import Task from './Task';


//For some reason my linter says there is a semicolen missing... I can't find it.
export default class StoryPanel extends React.Component {
	constructor(props){
		super(props);
    this.state = { name: '', details: ''};
	}

  //since there are two inputs... there needs to be two functions
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleDetailChange(e) {
    this.setState({ details: e.target.value });
  }

	render() {
		return (
      <div className="panel panel-primary">
        <div className="panel-heading">
        {
          (this.props.isOnly) ? null : <button type="button" className="close">&times;</button>
        }
          <h4><span className="glyphicon glyphicon-book"></span> Story {this.props.panNumber}</h4>
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
						{
							this.props.story.tasks.map((e,i,array) =>	{
									return (
										<Task taskNumber={i + 1} isOnly={array.length === 1} />
									);
								})
						}
          </div>
        </div>
        <div className="panel-footer sprint-footer">
          <div className="btn-group">
            <button type="button" className="btn btn-default pull-left no-side-margin" onClick={(e) => this.props.handleAddNewTask(this.props.panNumber -1)}>
              <span className="glyphicon glyphicon-list"></span> Add New Task
						</button>

						{
							(this.props.last) ? <button type="button" className="btn btn-default pull-left no-side-margin">
	              <span className="glyphicon glyphicon-plus"></span> Add New Story
	            </button> : null
						}
          </div>
					{
						(this.props.last) ? <button type="button" className="btn btn-success pull-right no-side-margin">
             <span className="glyphicon glyphicon-ok"></span> Done
          	</button> : null
					}
        </div>
      </div>
		);
	}
}
