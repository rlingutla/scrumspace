import React from 'react';
import taskTypes from 'app/shared/constants/taskTypes';
import moment from 'moment';
import TaskStatus from 'Project/shared/TaskStatus';
import Ionicon from 'app/shared/components/Ionicon';
import Avatar from 'Project/views/ProjectID/components/Avatar';

const style = (borderColor) => {
	return {
		margin: '10px, 0px', 
		border: '1px solid ' + borderColor,
		backgroundColor: borderColor,
	    borderRadius: '3px',
		width: '100%',
		paddingTop: '20px',
		paddingBottom: '20px',
		paddingLeft: '5px',
		paddingRight: '5px',
		marginBottom: '10px'
	};
};

const getStatusString = (from_status, to_status) => {
	if (!from_status) {
		return ' was created.';
	} else {
		return 'was moved from ' + from_status + ' to ' + to_status + '.';
	}
};

/*
<div style={style(taskTypes[history.payload.to_status].color)}>
	<span>{history.task.description} {getStatusString(history.payload.from_status, history.payload.to_status)}</span>
</div>
*/


export default (props) => {
	const history = props.activity;
	return (
		<div style={{padding: '10px 0', borderBottom: '1px solid #F3F3F3'}}>
			<div style={{display: 'flex', fontSize: '16px'}}>
				<span style={{flexGrow: 1}}>{history.task.description}</span>
				<span name="history_date" style={{flexGrow: 1, textAlign: 'right'}}>{(new moment(history.modified_time)).format('hh:mmA MM/DD')}</span>
			</div>
			<div>
				<span name="history_type" style={{textDecoration: 'underline', color: '#9F9F9F', marginRight: '15px'}}>{history.type.toLowerCase()}:</span>
				{(history.type === 'MOVED') ? 
					<span style={{marginTop: '8px', display: 'inline-block'}}>
						<TaskStatus status={history.payload.from_status} />
						<Ionicon style={{margin: '0 10px'}} icon="ion-ios-arrow-right"/>
						<TaskStatus status={history.payload.to_status} />
					</span>:null
				}
				{(history.type === 'ASSIGNED') ? 
					<span> testing assigned </span>:null
				}
			</div>
		</div>
	);
};