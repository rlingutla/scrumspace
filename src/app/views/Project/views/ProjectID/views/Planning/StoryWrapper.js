import React from 'react';
import Story from './Story';

//This row represents a "sprint"
export default class StoryWrapper extends React.Component {
  constructor(props){
		super(props);
	}

	render() {
		return (
        <div className="row">
        	{(this.props.stories.length > 0) ?
        		this.props.stories.map( (e, i, array) =>{
        				return(
        					<Story key={i} index={i} data={e} last={i === array.length -1} handleRemove={this.props.handleRemove}
        						updateState={this.props.updateState} handleEdit={this.props.handleEdit}/>
        				);
        		}):<div style={{textAlign: 'center', padding: '30px 15px 15px 15px'}}>Backlog is empty. Create stories and sprints to start planning.</div>
        	}
        </div>
    );
  }
}
