import React from 'react';
import BasePanel from './BasePanel';

export default (props) => {
	return (
		<BasePanel>
			{/* The below styles make the panel a fixed size + scrollable.*/}
			<div className="panel-body">
				<div style={{height: '20%'}}>
					<div style={{textAlign: 'center', borderRadius: '3px 3px 0 0', height: '72px', textAlign: 'center'}}>
						<h4>{props.title}</h4>
					</div>
				</div>
				<div style={{height: '80%', width: '100%', overflowY: 'auto'}}>
					{props.children}
				</div>
			</div>
		</BasePanel>
	);
};

