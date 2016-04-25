import React from 'react';
import Panel from '../shared/Panel';
import ProjectProgressBar from 'Project/views/ProjectID/views/ScrumBoard/ProjectProgressBar';
import { colors } from 'app/shared/constants/theme';

function countTasksOfType(tasks, status) {
	return tasks.reduce((prev, curr) => {
	  return (curr.status === status) ? prev + 1: prev;
	}, 0);
}

export default (props) => {
	let metricStyle = {
		fontSize: '36px'
	};

	return (
		<div className="col-md-6 col-lg-6">
			<Panel title="Project Status">
				<ProjectProgressBar style={{marginRight: '-25px', marginLeft: '-25px'}} project_id={props.project_id} compact={true} />
				<div className="">
					<div className="row">
						<div style={{textAlign: 'left'}} className='col-xs-6'>
							<span style={Object.assign({...metricStyle}, {color: colors.blue})}>{props.daysLeft}</span> days left
						</div>
						<div style={{textAlign: 'left'}} className='col-xs-6'>
							<span style={Object.assign({...metricStyle}, {color: colors.red})}>{countTasksOfType(props.tasks, 'BLOCKED')}</span> blocked tasks
						</div>	
					</div>
					<div style={{textAlign: 'left'}} className='row'>
						<div className="col-xs-6">
							<span style={Object.assign({...metricStyle}, {color: colors.darkGray})}>{countTasksOfType(props.tasks, 'UNASSIGNED')}</span> unassigned tasks
						</div>
						<div style={{textAlign: 'left'}} className="col-xs-6">
							<span style={Object.assign({...metricStyle}, {color: colors.yellow})}>{countTasksOfType(props.tasks, 'DOING')}</span> doing tasks
						</div>					
					</div>
				</div>
			</Panel>
		</div>
	);
};