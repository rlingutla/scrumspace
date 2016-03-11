import React from 'react';

const parseActivityFeedData = (tasks) => {
	// set reference to task on history (TODO, IS this unclean?)
	tasks.forEach((task) => {
		task.history.forEach((history) => {
			history.task = task;
		});
	});
	return tasks.map((task) => task.history)
	.reduce((a, b) => a.concat(b))
	.sort((a, b) => a.modifiedTime - b.modifiedTime);
};

export default (props) => {
	const data = parseActivityFeedData(props.tasks);
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
										data.map((history, i) => {
											var date = new Date(history.modifiedTime);
											return <p key={i}>{new Array( (new Date(history.modifiedTime)).getMonth() + 1, (new Date(history.modifiedTime)).getDate() + 1, 'user:', history.modifiedUser, history.task.status).join(' ')}</p>
										})
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>	
	)
}


