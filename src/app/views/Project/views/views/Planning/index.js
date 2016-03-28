import React, { Component } from 'react';
import Backlog from './Backlog';
import SprintRow from './SprintRow';
import NewSprintModal from './NewSprintModal';
import NewStoryModal from './NewProjectModal/NewStoryModal';
import Container from './containers';

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

class PlanView extends Component {
  constructor(props){
		super(props);
		this.state ={
			storyModal: [false, StoryFactory()], //the object at the ladder end of this array is what gets written to the server.
			sprintModal: [false, SprintFactory()] //the object at the ladder end of this array is what gets written to the server.
		};
	}

	handleNew(value) {
		if(value === 'sprint'){
			this.updateState('sprintModal', [true, SprintFactory()]);
		}
		else if (value === 'story') {
			this.updateState('storyModal', [true, StoryFactory()]);
		}
	}

	handleRemove(value, item){
		if (value === 'sprint'){
			//redux!!!!!
		} else if (value === 'story') {
			//redux!!!!!
		}
	}

	getSprintByID(id){
		for(var i in this.props.sprints){
			if(this.props.sprints[i]._id === id){
				return this.props.sprints[i];
			}
		}
		console.log('houston we have a problem');
	}
	getStoryByID(id){
		for(var i in this.props.stories){
			if(this.props.stories[i]._id === id)
				return this.props.stories[i];
		}
		console.log('Mayday Mayday!');
	}

	handleEdit(value, item){ //these will have an ID...
		//modify to search for item from list of sprints by id.
		if (value === 'sprint'){
			this.updateState('sprintModal', [true, this.getSprintByID(item._id)]);
		} else if (value === 'story') {
			this.updateState('storyModal', [true, this.getStoryByID(item._id)]);
		}
	}

	save(signal, data){
		debugger;
		switch (signal) {
			case 'story':
				let model = {
					project:  this.props._id,
					title: data.title,
					description: data.description,
					tasks: data.tasks,
					time: data.scrum_time
				};
				if(typeof data._id !== 'undefined')
					model.story = data._id;
				this.props.saveThis('NEW_STORY', model);
				break;
			case 'sprint':
				let model1 ={
					project: this.props._id,
					name: data.name,
					duration: data.duration,
					time: data.scrum_time
				};
				if(typeof data._id !== 'undefined')
					model1.sprint = data._id;
				this.props.saveThis('NEW_SPRINT', model1);
				break;
			default:
				console.log('I am Crying');
		}
		//redux!
	}

	handleTask(signal, task, e){
		this.state.storyModal[0] = true;
		switch (signal) {
			case 'change':
				this.state.storyModal[1]['tasks'][task].description = e.target.value;
				break;
			case 'add':
				if(this.state.storyModal[1]['tasks'][this.state.storyModal[1]['tasks'].length-1].description === ''){
					return;
				}
				this.state.storyModal[1]['tasks'] = this.state.storyModal[1]['tasks'].concat([{description: ''}]);
				break;
			case 'delete':
				this.state.storyModal[1]['tasks'].splice(task, 1);
				break;
		}
		this.setState(this.state);
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
				<NewStoryModal isOpen={this.state.storyModal[0]} data={this.state.storyModal[1]} handleTask={this.handleTask.bind(this)}
					updateState={this.updateState.bind(this)} save={this.save.bind(this)} changeModal={this.changeStoryModal.bind(this)}/>
        <div className="panel-group">
          <Backlog updateState={this.updateState.bind(this)} handleNew={this.handleNew.bind(this)}
						handleEdit={this.handleEdit.bind(this)} handleRemove={this.handleRemove.bind(this)}
						stories={(this.props.stories || []).filter(
							function(value){
								if(value.sprint_id === null)
									return true;
								else
									return false;
							}
						)}/>
						{/* todo, can above this.props.stories filter ternary be removed? and below .sprints*/}
				{
					(this.props.sprints || []).map( (e, i) => {
						if (/*e.start_date !== null/**/true){ //need to add and time greater than today
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

export default Container(PlanView);
