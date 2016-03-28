import React from 'react';
import Story from './Story';

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
						(this.props.isOnly) ? null : <button type="button" className="close" onClick={(e) => this.props.handleChange('remove-story', e, [this.props.panNumber -1])}>&times;</button>
					}
          <h4>{this.props.data.name}</h4> </div>
        <div className="panel-body">
          <div className="row">
						{
							this.props.stories.map( (e, i, array) =>{
								return(
									<Story key={i} index={i} data={e} last={i === array.length -1} isOnly= {array.length === 1} updateState={this.props.updateState}/>
								);
							})
						}
          </div>
        </div>
      </div>
    );
  }
}
