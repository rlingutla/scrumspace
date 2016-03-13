import React from 'react';
import UserTaskTotals from './UserTaskTotals';
import Task from './Task';
import Panel from '../shared/Panel';

export default (props) => {
	return (
		<Panel title='Your Tasks'>
			<UserTaskTotals tasks={props.tasks} types={['DOING', 'BLOCKED']} />
			{ 
				props.tasks.map((e, i) => {
					return <Task key={i} id={e._id} status={e.status} description={e.description} />;
				}) 
			}
		</Panel>
	);
};