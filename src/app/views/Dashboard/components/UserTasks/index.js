import React from 'react';
import UserTaskTotals from './UserTaskTotals';
import Task from './Task';

export default (props) => {
	return (
		<div className="row">
			<div className="panel panel-default">
				<div style={{minHeight: '380px'}}>
					<div className="panel-body">
						<div className="dashboard-summary">
							<h4>Your Tasks</h4>
							<div className="row">
								<UserTaskTotals tasks={props.tasks} types={['DOING', 'BLOCKED']} />
							</div>
							{ props.tasks.map((e, i) => {
								return <Task key={i} id={e._id} status={e.status} description={e.description} />;
							}) 
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};