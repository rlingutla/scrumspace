import React from 'react';
import TaskContainer from '../../../../shared/Task';
import TaskTypes from '../../../../../../constants/taskTypes';
import Story from './Story';
import TaskBin from './TaskBin';

export default class StoryRow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: true,
			tasks: this.organizeTasks(props.details.tasks)
		};
	}

	organizeTasks(tasks){
		let taskObj = {
			'UNASSIGNED': [],
			'DOING': [],
			'BLOCKED': [],
			'DONE': []
		};

		tasks.forEach((task) => {
			//SORRY GUYS
			if(!(task.status !== 'UNASSIGNED' && task.status !== 'DOING' && task.status !== 'BLOCKED' && task.status !== 'DONE')){
				taskObj[task.status].push(task);
			}
		});

		return taskObj;
	}

	// filter tasks to categories
		// UNASSIGNED, DOING, BLOCKED, DONE

	render() {
		return (
			<tr>
				<td id="story-container">
					{/*<Story id={this.props.details.sprint_id} title={this.props.details.title} description={this.props.details.description} />*/}
				</td>
				<TaskBin id="task-container">
					{this.state.tasks[TaskTypes.UNASSIGNED].map((task, i) => {
						return <TaskContainer {...this.props} key={i} />
					})}
				</TaskBin>
				<TaskBin id="doing-container">
					{this.state.tasks[TaskTypes.DOING].map((task, i) => {
						return <TaskContainer {...this.props} key={i} {...task}/>
					})}
				</TaskBin>
				<TaskBin id="blocked-container">
					{this.state.tasks[TaskTypes.BLOCKED].map((task, i) => {
						return <TaskContainer {...this.props} key={i} {...task}/>
					})}
				</TaskBin>
				<TaskBin id="done-container">
					{this.state.tasks[TaskTypes.DONE].map((task, i) => {
						return <TaskContainer {...this.props} key={i} {...task}/>
					})}
				</TaskBin>
			</tr>	
		);
		
	}

}