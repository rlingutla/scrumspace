import React from 'react';
import ActivityFeedItem from './ActivityFeedItem';
import Panel from '../shared/Panel';

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

export default (props) => {
	var data = activities(props.tasks);
	return (
		<div className="col-md-6 col-lg-6">
			<Panel title="Activity">
				{
					data.map((history, i) => <ActivityFeedItem activity={history} key={i}></ActivityFeedItem>)
				}
			</Panel>
		</div>
	);
};