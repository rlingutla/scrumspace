import React from 'react';
import taskTypes from 'app/shared/constants/taskTypes';
import moment from 'moment';
import TaskStatus from 'Project/shared/TaskStatus';
import Ionicon from 'app/shared/components/Ionicon';
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
				<span style={{marginTop: '8px', display: 'inline-block'}}>
					{(history.type === 'MOVED') ? 
						<span>
							<TaskStatus status={history.payload.from_status} />
							<Ionicon style={{margin: '0 10px'}} icon="ion-ios-arrow-right"/>
							<TaskStatus status={history.payload.to_status} />
							</span>:null
					}
					{(history.type === 'ASSIGNED') ? 
						history.payload.users.map((user, i) => {
							user = props.users[user];
							let avStyle = {backgroundImage: `url(${user.avatar_url})`, border: '1px solid #E6E6E6', marginRight: '5px'};
							return <span key={i} className="avatar" style={avStyle} />
						}):null
					}
					{(history.type === 'BLOCKING') ? 
						history.payload.tasks.map((task_id, i) => {
							let ind = props.taskIndex[task_id];
							let taskStyle = {padding: '2px 10px', background: 'white', border: '1px solid #E0E0E0', display: 'inline-block', color: '#686868', marginBottom: '8px', marginRight: '10px', borderRadius: 0 };

							return <span style={taskStyle} key={i}>S{ind.story}-T{ind.task}</span>;
						}):null
					}
				</span>
			</div>
		</div>
	);
};