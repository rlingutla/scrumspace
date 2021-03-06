import React from 'react';
import Task from 'Project/shared/Task';
import TaskTypes from 'app/shared/constants/taskTypes';
import Story from './Story';
import TaskBin from './TaskBin';

import { connect } from 'react-redux';

export default class StoryRow extends React.Component {
	constructor(props) {
		super(props);
	}

	getTaskArray(type){
		let taskArr = [];
		this.props.story.tasks.forEach((task) => {
			if(task.status === type.title) taskArr.push(task);
		});
		return taskArr;
	}

	render() {
		return (
			<tr>
				<td id="story-container">
					<Story {...this.props.story} project_id={this.props.project_id} />
				</td>
				<TaskBin users={this.props.users} container="task-container" type={TaskTypes.UNASSIGNED} story_id={this.props.story_id} project_id={this.props.project_id}>
					{this.getTaskArray(TaskTypes.UNASSIGNED).map((task, i) => {
						return <Task task_id={task._id} {...this.props} key={i} />;
					})}
				</TaskBin>
				<TaskBin users={this.props.users} container="doing-container" type={TaskTypes.DOING} story_id={this.props.story_id} project_id={this.props.project_id}>
					{this.getTaskArray(TaskTypes.DOING).map((task, i) => {
						return <Task task_id={task._id} {...this.props} key={i} {...task}/>;
					})}
				</TaskBin>
				<TaskBin users={this.props.users} container="blocked-container" type={TaskTypes.BLOCKED} story_id={this.props.story_id} project_id={this.props.project_id}>
					{this.getTaskArray(TaskTypes.BLOCKED).map((task, i) => {
						return <Task task_id={task._id} {...this.props} key={i} {...task} />;
					})}
				</TaskBin>
				<TaskBin users={this.props.users} container="done-container" type={TaskTypes.DONE} story_id={this.props.story_id} project_id={this.props.project_id}>
					{this.getTaskArray(TaskTypes.DONE).map((task, i) => {
						return <Task task_id={task._id} {...this.props} key={i} {...task} />;
					})}
				</TaskBin>
			</tr>
		);

	}

}

// //redux
// const mapStateToProps = (state) => {
// 	return state;
// };

// function mergeProps(stateProps, dispatchProps, ownProps) {
// 	//do our nasty search
// 	let theStory = stateProps
// 	.projects.find((proj) => proj._id === ownProps.project_id)
// 	.stories.find((story) => story._id === ownProps.story_id);

// 	return Object.assign(theStory, ownProps, dispatchProps);
// }

// //maps any actions this component dispatches to component props
// const mapDispatchToProps = (dispatch) => {
// 	return {};
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
//   mergeProps
// )(StoryRow);
