import React from 'react';
import BasePanel from './BasePanel';

export default (props) => {
	return (
		<BasePanel>
			{/* The below styles make the panel a fixed size + scrollable.*/}
			<div style={{paddingRight: '25px', paddingLeft: '25px', paddingTop: '8px'}}>
				<h4 style={{borderBottom: '1px solid #E0E0E0', paddingBottom: '15px'}}>{props.title}</h4>
			</div>
			<div style={{height: '80%', width: '100%', overflowY: 'auto'}}>
				<div style={{paddingRight: '25px', paddingLeft: '25px', paddingTop: '15px', paddingBottom: '15px'}}>
					{props.children}
				</div>
			</div>
		</BasePanel>
	);
};




