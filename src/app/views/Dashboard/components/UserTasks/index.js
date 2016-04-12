import React from 'react';
import UserTaskTotals from './UserTaskTotals';
import Task from './Task';
import BasePanel from '../shared/BasePanel';

export default (props) => {
	return (
		<div className="col-md-6 col-lg-6">
			<BasePanel >
				<div style={{height: '20%'}}>
					<UserTaskTotals tasks={props.tasks} types={['DOING', 'BLOCKED']} />
				</div>
				<div style={{paddingLeft: '15px', paddingRight: '15px', height: '80%', width: '100%', overflowY: 'auto'}}>
					{ 
						props.tasks.map((e, i) => {
							return <Task key={i} id={e._id} status={e.status} description={e.description} />;
						}) 
					}
				</div>
			</BasePanel>
		</div>
	);
};