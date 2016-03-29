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
					{
						this.props.stories.map( (e, i, array) =>{
							return(
								<Story key={i} index={i} data={e} last={i === array.length -1} handleRemove={this.props.handleRemove} isOnly= {array.length === 1}
									updateState={this.props.updateState} handleEdit={this.props.handleEdit}/>
							);
						})
					}
        </div>
    );
  }
}
