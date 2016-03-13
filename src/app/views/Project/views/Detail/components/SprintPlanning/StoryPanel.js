import React from 'react';
import Task from './Task';


//For some reason my linter says there is a semicolen missing... I can't find it.
export default class StoryPanel extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		//debugger;
		return (
      <div className="panel panel-primary">
        <div className="panel-heading">
        {
          (this.props.isOnly) ? null : <button type="button" className="close" onClick={(e) => this.props.handleChange('remove-story', e, [this.props.panNumber -1])}>&times;</button>
        }
          <h4><span className="glyphicon glyphicon-book"></span> Story {this.props.panNumber}</h4>
        </div>
        <div className="panel-body">
          <div className="row story-panel">
            <div className="col-md-6">
              <div className="story-input sat-pad">
                <label>Enter a Story</label>
                <input type="text" className="form-control strech-input" placeholder="Something you want to get done!"
                value={this.props.story.title} onChange={(e) => this.props.handleChange('story-name', e, [this.props.panNumber -1])}
                />
              </div>
            </div>
          </div>
          <div className="row story-panel">
            <div className="col-md-6">
              <div className="task-detail-input sat-pad">
                <label>Enter Story Details</label>
                <textarea className="form-control strech-input" rows="6" placeholder="Enter Story Details"
                value={this.props.story.description} onChange={(e) => this.props.handleChange('story-desc', e, [this.props.panNumber -1])}
                />
              </div>
            </div>
						{
							this.props.story.tasks.map((e,i,array) =>	{
									return (
										<Task key={i} taskNumber={i + 1} isOnly={array.length === 1} panNumber={this.props.panNumber} handleChange={this.props.handleChange} task={e}/>
									);
								})
						}
          </div>
        </div>
        <div className="panel-footer sprint-footer">
          <div className="btn-group">
            <button type="button" className="btn btn-default pull-left no-side-margin" onClick={(e) => this.props.handleChange('new-task', e, [this.props.panNumber -1])}>
              <span className="glyphicon glyphicon-list"></span> Add New Task
						</button>

						{
							(this.props.last) ? <button type="button" className="btn btn-default pull-left no-side-margin" onClick={(e) => this.props.handleChange('new-panel', e, [this.props.panNumber -1])}>
	              <span className="glyphicon glyphicon-plus"></span> Add New Story
	            </button> : null
						}
          </div>
					{
						(this.props.last) ? <button type="button" className="btn btn-success pull-right no-side-margin" onClick={(e) => this.props.handleChange('save', e, [this.props.panNumber -1])}>
             <span className="glyphicon glyphicon-ok"></span> Done
          	</button> : null
					}
        </div>
      </div>
		);
	}
}
