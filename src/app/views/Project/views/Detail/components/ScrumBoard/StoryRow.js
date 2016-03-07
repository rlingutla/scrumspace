import React from 'react';
import TaskContainer from '../../../../shared/Task';
import TaskTypes from '../../../../../../constants/taskTypes';
import Story from './Story';
import TaskBin from './TaskBin';

import { connect } from 'react-redux';

class StoryRow extends React.Component {
	constructor(props) {
		super(props);
	}

	getTaskArray(type){
		let taskArr = [];
		this.props.tasks.forEach((task) => {
			if(task.status == type) taskArr.push(task);
		});
		return taskArr;
	}

	render() {
		return (
			<tr>
				<td id="story-container">
					<Story id={this.props.story_id} title={this.props.title} description={this.props.description} />
				</td>
				<TaskBin id="task-container" type={TaskTypes.UNASSIGNED}>
					{this.getTaskArray(TaskTypes.UNASSIGNED).map((task, i) => {
						return <TaskContainer task_id={task._id} {...this.props} key={i} />
					})}
				</TaskBin>
				<TaskBin id="doing-container" type={TaskTypes.DOING}>
					{this.getTaskArray(TaskTypes.DOING).map((task, i) => {
						return <TaskContainer task_id={task._id} {...this.props} key={i} {...task}/>
					})}
				</TaskBin>
				<TaskBin id="blocked-container" type={TaskTypes.BLOCKED}>
					{this.getTaskArray(TaskTypes.BLOCKED).map((task, i) => {
						return <TaskContainer task_id={task._id} {...this.props} key={i} {...task} />
					})}
				</TaskBin>
				<TaskBin id="done-container" type={TaskTypes.DONE}>
					{this.getTaskArray(TaskTypes.DONE).map((task, i) => {
						return <TaskContainer task_id={task._id} {...this.props} key={i} {...task} />
					})}
				</TaskBin>
			</tr>	
		);
		
	}

}

//redux
const mapStateToProps = (state) => {
	return state;
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	//do our nasty search
	let theStory = stateProps
	.projects.find((proj) => proj._id == ownProps.project_id)
	.stories.find((story) => story._id == ownProps.story_id);

	return Object.assign(theStory, ownProps, dispatchProps);
}

//maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {};
}

const StoryRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(StoryRow);

export default StoryRowContainer;