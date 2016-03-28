import React from 'react';
import Backlog from './Backlog';
import SprintRow from './SprintRow';
import NewSprintModal from './NewSprintModal';

const SprintFactory = () => {
	return {
		duration: '',
		name: '',
		scrum_time: '',
		start_date: null
	};
};

const StoryFactory = () => {
	return {
		description: '',
		tasks: [{
			_id: null,
			description: ''
		}],
		title: '',
		sprint_id: null
	};
};

export default class PlanView extends React.Component {
  constructor(props){
		super(props);
		this.state ={
			sprints: this.props.sprints,
			stories: this.props.stories,
			storyModal: [false, null],
			sprintModal: [false, null]
		};
	}

	handleNew(value){
		if(value === 'sprint'){
			this.updateState('sprintModal', [true, SprintFactory()]);
		}
		else if (value === 'story') {
			this.updateState('sprintModal', [true, StoryFactory()]);
		}
	}

	handleRemove(value, item){
		if(value === 'sprint'){
			//redux!!!!!
		}
		else if (value === 'story') {
			//redux!!!!!
		}
	}

	handleEdit(value, item){
		if(value === 'sprint'){
			//redux!
		}
		else if (value === 'story') {
			//redux!
		}
	}

	save(){

	}

	updateState(property, value, e){
		if(property === 'storyModal'){
			this.state.storyModal[0] = true;
			this.state.storyModal[1]['value'] = e.target.value;
		}
		if(property === 'sprintModal'){
			this.state.storyModal[0] = true;
			this.state.storyModal[1]['value'] = e.target.value;
		}
		else{
			this.state[property] = (e === null) ? value : e.target.value;
		}
		this.setState(this.state);
	}

	render() {
		return (
      <div className="container">
				{/* Modal fun will go here */}
				<NewSprintModal show={this.state.sprintModal[0]} data={this.state.sprintModal[1]}
					updateState={this.updateState.bind(this)} save={this.save.bind(this)}/>
        <div className="panel-group">
          <Backlog updateState={this.updateState.bind(this)} handleNew={this.handleNew.bind(this)}
						handleEdit={this.handleEdit.bind(this)} handleRemove={this.handleRemove.bind(this)}
						stories={this.props.stories.filter(
							function(value){
								if(value.sprint_id === null)
									return true;
								else
									return false;
							}
						)}/>
				{
					this.props.sprints.map( (e, i) => {
						if(e.start_date !== null){
							return (
								<SprintRow key={i} data={e} updateState={this.updateState.bind(this)}
									handleEdit={this.handleEdit.bind(this)} handleRemove={this.handleRemove.bind(this)}
									isOnly={this.props.sprints.length === 1}
									stories={this.props.stories.filter(
										function(value){
											if(value.sprint_id === e._id)
												return true;
											else
												return false;
										}
									)}
								/>
						);}
					})
				}
        </div>
      </div>
    );
  }
}
