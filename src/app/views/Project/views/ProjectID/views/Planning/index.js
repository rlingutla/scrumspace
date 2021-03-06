import React, { Component } from 'react';
import Backlog from './Backlog';
import SprintRow from './SprintRow';
import NewSprintModal from './NewSprintModal';
import NewStoryModal from './NewProjectModal/NewStoryModal';
import Container from './containers';
import _ from 'underscore-contrib';
//DnD stuff
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
		} else if (value === 'story') {
			this.updateState('storyModal', [true, StoryFactory()]);
		}
	}

	handleRemove(value, item){
		var model;
		switch (value) {
			case 'sprint':
				model ={
					project: this.props._id,
					sprint_id: item._id
				};
				this.props.saveThis('REMOVE_SPRINT', model);
				break;
			case 'story':
				if(item.sprint_id === null){
					model ={
						project: this.props._id,
						story_id: item._id
					};
					this.props.saveThis('REMOVE_STORY', model);
				}
				else
					this.save('story' , item, null);
				break;
			default:
				logger('Tom Brady is the best ever.');
		}
	}

	getSprintByID(id){
		for (var i in this.props.sprints){
			if (this.props.sprints[i]._id === id){
				return this.props.sprints[i];
			}
		}
		logger('houston we have a problem');
	}
	getStoryByID(id){
		for (var i in this.props.stories){
			if (this.props.stories[i]._id === id)
				return this.props.stories[i];
		}
		logger('Mayday Mayday!');
	}

	handleEdit(value, item){ //these will have an ID...
		//modify to search for item from list of sprints by id.
		if (value === 'sprint'){
			this.updateState('sprintModal', [true, _.snapshot(this.getSprintByID(item._id))]);
		} else if (value === 'story') {
			this.updateState('storyModal', [true, _.snapshot(this.getStoryByID(item._id))]);
		}
	}

	save(signal, data, target) {

		var model;
		switch (signal) {
			case 'story':
				model = {
					project:  this.props._id,
					title: data.title,
					description: data.description,
					tasks: data.tasks,
					sprint_id: (typeof target === 'undefined') ? data.sprint_id : target
				};
				if (typeof data._id !== 'undefined') {
					model.story_id = data._id;
					this.props.saveThis('UPDATE_STORY', model);
				}
				else
					this.props.saveThis('NEW_STORY', model);
				if(typeof target === 'undefined')
					this.changeStoryModal();
				break;
			case 'sprint':
				model = {
					project: this.props._id,
					name: data.name,
					duration: data.duration,
					time: data.scrum_time
				};
				if (typeof data._id !== 'undefined') {
					model.sprint_id = data._id;
					this.props.saveThis('UPDATE_SPRINT', model);
				}
				else
					this.props.saveThis('NEW_SPRINT', model);
				if(typeof target === 'undefined')
					this.changeSprintModal();
				break;
			default:
				logger('I am Crying');
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
				/*if(this.state.storyModal[1]['tasks'][this.state.storyModal[1]['tasks'].length-1].description === ''){
					return;
				} */
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
		} else if(property === 'sprintModal' && typeof e !== 'undefined'){
			this.state.sprintModal[0] = true;
			this.state.sprintModal[1][value] = e.target.value;
		} else{
			this.state[property] = (e === null || typeof e === 'undefined') ? value : e.target.value;
		}
		this.setState(this.state);
	}

	changeSprintModal(){
    this.state.sprintModal = [!this.state.sprintModal[0], this.state.sprintModal[1]];
		this.setState(this.state);
	}

	changeStoryModal(){
    this.state.storyModal = [!this.state.storyModal[0], this.state.storyModal[1]];
		this.setState(this.state);
	}

	render() {
		return (
		<div id="project-planning" className="container" style={{paddingTop: '15px'}}>
			<NewSprintModal isOpen={this.state.sprintModal[0]} data={this.state.sprintModal[1]}
				updateState={this.updateState.bind(this)} save={this.save.bind(this)} changeModal={this.changeSprintModal.bind(this)}/>
			<NewStoryModal isOpen={this.state.storyModal[0]} data={this.state.storyModal[1]} handleTask={this.handleTask.bind(this)}
				updateState={this.updateState.bind(this)} save={this.save.bind(this)} changeModal={this.changeStoryModal.bind(this)}/>
			<div className="panel-group">
				<Backlog updateState={this.updateState.bind(this)} handleNew={this.handleNew.bind(this)}
							handleEdit={this.handleEdit.bind(this)} handleRemove={this.handleRemove.bind(this)}
							 save={this.save.bind(this)} stories={(this.props.stories || []).filter(
								function(value){
									if(value.sprint_id === null)
										return true;
									else
										return false;
								}
							)}/>
							{/* todo, can above this.props.stories filter ternary be removed? and below .sprints*/}
				{
					(this.props.sprints || []).map( (e, i, array) => {
						return (
							<SprintRow key={i} data={e} updateState={this.updateState.bind(this)} save={this.save.bind(this)}
								handleEdit={this.handleEdit.bind(this)} handleRemove={this.handleRemove.bind(this)}
								stories={this.props.stories.filter((value) => value.sprint_id === e._id)} current_sprint={this.props.current_sprint}
								startSprint={this.props.startSprint} project_id={this.props._id} project={this.props}
							/>
						);
					})
				}
			</div>
		</div>
    );
  }
}
export default Container(DragDropContext(HTML5Backend)(PlanView));
// export default Container(PlanView);
