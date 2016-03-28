import React from 'react';
import Backlog from './Backlog';
import SprintRow from './SprintRow';
import NewSprintModal from './NewSprintModal';
import NewStoryModal from './NewProjectModal/NewStoryModal';

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
			storyModal: [false, StoryFactory()],
			sprintModal: [false, SprintFactory()]
		};
	}

	handleNew(value){
		if(value === 'sprint'){
			this.updateState('sprintModal', [true, SprintFactory()]);
		}
		else if (value === 'story') {
			this.updateState('storyModal', [true, StoryFactory()]);
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

	handleEdit(value, item){ //these will have an ID...

		if(value === 'sprint'){
			this.updateState('sprintModal', [true, item]);
		}
		else if (value === 'story') {
			this.updateState('storyModal', [true, item]);
		}
	}

	save(signal, data){
		switch (signal) {
			case 'sprint':

				break;
			case 'story':
				this.storyModal[1].tasks = data.tasks;
				break;
			default:

		}
		//redux!
	}

	updateState(property, value, e){
		if(property === 'storyModal' && typeof e !== 'undefined'){
			this.state.storyModal[0] = true;
			this.state.storyModal[1][value] = e.target.value;
		}
		else if(property === 'sprintModal' && typeof e !== 'undefined'){
			this.state.sprintModal[0] = true;
			this.state.sprintModal[1][value] = e.target.value;
		}
		else{
			this.state[property] = (e === null || typeof e === 'undefined') ? value : e.target.value;
		}
		this.setState(this.state);
	}

	changeSprintModal(){
    this.state.sprintModal = [!this.state.sprintModal[0], this.state.sprintModal[1]];
		this.setState(this.State);
	}

	changeStoryModal(){
    this.state.storyModal = [!this.state.storyModal[0], this.state.storyModal[1]];
		this.setState(this.State);
	}

	render() {
		return (
      <div className="container">
				<NewSprintModal isOpen={this.state.sprintModal[0]} data={this.state.sprintModal[1]}
					updateState={this.updateState.bind(this)} save={this.save.bind(this)} changeModal={this.changeSprintModal.bind(this)}/>
				<NewStoryModal isOpen={this.state.storyModal[0]} data={this.state.storyModal[1]}
					updateState={this.updateState.bind(this)} save={this.save.bind(this)} changeModal={this.changeStoryModal.bind(this)}/>
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
						if(e.start_date !== null){ //need to add and time greater than today
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
