import React from 'react';
import ActivityFeedItem from './ActivityFeedItem';
import BasePanel from '../shared/BasePanel';

const activities = (tasks) => {
	// set reference to task on history (TODO, IS this unclean?, use computed properties?)
	var allActivities = [];

	tasks.forEach((task) => {
		task.history.forEach((history) => {
			history.task = {
				description: task.description
			};
			allActivities.push(history);
			}
		);
	});

	return allActivities
	.sort((a, b) => b.modifiedTime - a.modifiedTime);
};

export default (props) => {
	var data = activities(props.tasks);
	return (
		<div className="col-md-6 col-lg-6">
			<BasePanel>
				<div style={{height: '20%'}}>
					<div style={{borderRadius: '3px 3px 0 0', backgroundColor: '#2996cc', height: '72px', padding: '15px', textAlign: 'center'}}>
						<h4 style={{color: 'white'}}>Activity Feed</h4>
					</div>
				</div>
				<div style={{paddingLeft: '15px', paddingRight: '15px', height: '80%', width: '100%', overflowY: 'auto'}}>
					{
						data.map((history, i) => <ActivityFeedItem activity={history} key={i}></ActivityFeedItem>)
					}
				</div>
			</BasePanel>
		</div>
	);
};