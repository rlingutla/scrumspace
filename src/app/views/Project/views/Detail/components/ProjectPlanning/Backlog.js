import React from 'react';
import Story from './Story';

//Holds stories not tied to a sprint
export default class Backlog extends React.Component {
  constructor(props){
		super(props);
	}

	render() {
		return (
      <div className="panel panel-primary">
        <div className="panel-heading">
					{
						(this.props.isOnly) ? null : <button type="button" className="close" onClick={(e) => this.props.handleChange('remove-story', e, [this.props.panNumber -1])}>&times;</button>
					}
          <h4>Backlog </h4> </div>
        <div className="panel-body">
          <div className="row">
						{
							this.props.stories.map( (e, i, array) =>{
								return(
									<Story key={i} data={e} last={i === array.length -1} isOnly={array.length === 1} updateState={this.props.updateState}/>
								);
							})
						}
          </div>
        </div>
        <div className="panel-footer settings-foot">
          <button type="save" onClick={this.props.handleNew('story')} className="btn btn-success pull-right save">New Story</button>
					<button type="save" onClick={this.props.handleNew('sprint')} className="btn btn-success pull-right save">New Sprint</button>
        </div>
      </div>
    );
  }
}
