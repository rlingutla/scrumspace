import React from 'react';
import ActivityFeedItem from './ActivityFeedItem';

const parseActivityFeedData = (tasks) => {
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
	var data = parseActivityFeedData(props.tasks); // TODO: implement scrolling to slice.
	return (
		<div className="row">
			<div className="panel panel-default">
				<div className="panel-container">
					<div className="panel-body">
						<div className="dashboard-summary">
							<h4>Activity Feed</h4>
							<div className="row">
								<div className="col-md-12">
									{
										data.map((history, i) => <ActivityFeedItem activity={history} key={i}></ActivityFeedItem>)
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>	
	);
};