import React from 'react';
import Ionicon from 'app/shared/components/Ionicon';
import { connect } from 'react-redux';
import { putStory } from '../../../../../../actions/';
import Textarea from 'react-textarea-autosize';


class Story extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			title: {
				value: props.title,
				editing: false
			},
			description: {
				value: props.description,
				editing: false
			}
		}
	}

	toggleEdit(target, value){
		let edit = Object.assign({}, this.state[target], { editing: value });
		this.setState({
			[target]: edit
		});
	}

	handleBlur(target, e){
		if(e.target.value){
			let value = e.target.value;
			this.toggleEdit(target, false);

			// TODO: not working
			value = (value.charAt(value.length - 1) === '\n') ? value.substring(0,value.length - 1):value;

			let story = Object.assign({}, this.props, {[target]: value});
			//update the story
			this.props.updateStory(this.props.project_id, story);
		}
		
	}

	handleChange(target, e){
		let changed = Object.assign({}, this.state[target], { value: e.target.value });
		this.setState({
			[target]: changed
		});
	}

	handleKeyDown(target, e){
		switch(e.keyCode){
			//enter key pressed
			case 13:
				if(!e.shiftKey){
					e.target.blur();
					this.handleBlur(target, e);
				}
		}
	}

	render(){
		return (
			<div className="user-story collapse1 collapse in">
		        <div className="">
		            <div className="heading">
		                <div className="row left-right-align">
		                    <div className="col-md-9"><a>{this.props.id}</a></div>
		                    <div className="col-md-3">
		                        <div className="control"></div>
		                    </div>
		                </div>
		            </div>
		            <div className="body">
		                {(this.state.title.editing) ? 
		                	<input className="form-control" autoFocus 
		                		onChange={(e) => this.handleChange('title', e)} 
		                		value={this.state.title.value} 
		                		onBlur={(e) => this.handleBlur('title', e)}
		                		onKeyDown={(e) => this.handleKeyDown('title', e)}
		                	/>
		                	:<h5 className="editable" onClick={(e) => this.toggleEdit('title', true)}>{this.state.title.value}</h5>
		                }
		                {(this.state.description.editing) ? 
		                	
		                	<Textarea className="form-control" autoFocus 
		                		onChange={(e) => this.handleChange('description', e)} 
		                		value={this.state.description.value} 
		                		onBlur={(e) => this.handleBlur('description', e)}
		                		onKeyDown={(e) => this.handleKeyDown('description', e)}/>
		                	:<ul className="editable" onClick={(e) => this.toggleEdit('description', true)}>{this.state.description.value.split("\n").map((desc, i) => <li key={i}>{desc}</li>)}</ul>
		                }
		                
		            </div>
		        </div>
			</div>
		);
	}
}

//redux
const mapStateToProps = (state) => {
	return state;
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	return Object.assign({}, ownProps, dispatchProps);
}

//maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
	return {
		updateStory: (project_id, updatedStory) => {
			dispatch(putStory(project_id, updatedStory));
		}
	};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Story);
