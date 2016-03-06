import React from 'react';
import Task from './Task';


export default (props) => {
	let tasks = props.project.actionableTasks;
	return (
		<div className="row">
			<div className="col-md-10 col-md-offset-1">
				<div className="panel panel-default scrum-board">
					<div className="panel-body">
						<div className="row vertical-align">
							<div className="col-md-3 dashboard-header">
								<span>Actionable Items <span className="badge">{tasks.length}</span></span>
							</div>
							<div className="col-md-2 col-md-offset-2">
								<h4 className="text-center">{props.project.title}</h4>
							</div>
						</div>
						{ tasks.map((e, i) => <Task key={i} description={e.description} />) }
					</div>
				</div>
			</div>
		</div>
	);
};