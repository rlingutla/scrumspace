import React from 'react';
import ActivityFeedItem from './ActivityFeedItem';
import Panel from '../shared/Panel';
import { connect } from 'react-redux';

const activities = (tasks) => {
	// set reference to task on history (TODO, IS this unclean?, use computed properties?)
	var allActivities = [];

	tasks.forEach((task) => {
		task.history.forEach((history) => {
			// if(history.type === 'MOVED'){
				history.task = {
					description: task.description
				};
				allActivities.push(history);
			// }
		});
	});

	return allActivities
	.sort((a, b) => b.modifiedTime - a.modifiedTime);
};

const ActivityFeed = (props) => {
	var data = activities(props.tasks);
	return (
		<div className="col-md-6 col-lg-6">
			<Panel title="Activity">
				{(data.length > 0) ? 
					data.map((history, i) => <ActivityFeedItem {...props} activity={history} key={i}></ActivityFeedItem>):
					<span>No Recent Activity</span>
				}
			</Panel>
		</div>
	);
};


//redux
const mapStateToProps = (state) => {
	let users = {};
	state.projects.forEach((proj) => {
		proj.users.forEach((user) => users[user._id] = user);
	});
	return Object.assign({}, state, {users});
};

const mapDispatchToProps = (dispatch) => {return {}};

function mergeProps(stateProps, dispatchProps, ownProps) {
	let taskIndex = {};
	let project = stateProps.projects.find((project) => ownProps.project_id === project._id);

	// project.stories.reduce((prev, curr) => prev.tasks.concat(curr.tasks)).forEach((task) => tasks[task._id] = task);
	project.stories.forEach((story, i) => {
		story.tasks.forEach((task, j) => taskIndex[task._id] = { story: i, task: j });
	});

	return Object.assign({}, stateProps, ownProps, {taskIndex});
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ActivityFeed);