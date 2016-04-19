import React from 'react';
import Panel from '../shared/Panel';

function countTasksOfType(tasks, status) {
	return tasks.reduce((prev, curr) => {
	  return (curr.status === status) ? prev + 1: prev;
	}, 0);
}

export default (props) => {
	return (
		<div className="col-md-6 col-lg-6">
			<Panel title="Project Status">
				<div className="">
					<div className="row">
						<div style={{textAlign: 'center'}} className='col-lg-6 col-md-6'>
							<h1>{props.daysLeft}</h1>
							<h2> days left</h2>
						</div>
						<div style={{textAlign: 'center'}} className='col-lg-6 col-md-6'>
							<h1>{countTasksOfType(props.tasks, 'BLOCKED')}</h1>
							<h2> blocked tasks</h2>
						</div>	
					</div>
					<div style={{textAlign: 'center'}} className='row'>
						<div className="col-lg-6 col-md-6">
							<h1>{countTasksOfType(props.tasks, 'UNASSIGNED')}</h1>
							<h2> unassigned tasks</h2>
						</div>
						<div style={{textAlign: 'center'}} className="col-lg-6 col-md-6">
							<h1>{countTasksOfType(props.tasks, 'DOING')}</h1>
							<h2>doing tasks</h2>
						</div>					
					</div>
				</div>
			</Panel>
		</div>
	);
};