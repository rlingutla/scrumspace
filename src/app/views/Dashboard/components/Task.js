import React from 'react';

export default (props) => {
	var color = 'white'; // this is error ? TODO: HANDLE THIS?
	switch(props.status) {
		case 'DOING':
			color = '#FFEC9F';
			break;
		case 'BLOCKING':
			color = '#FF9F9F';
			break;
		case 'BLOCKED':
			color = '#656565';
	}
	return (
		<div>
			<div key={props.key} style={{ borderColor: color }} className={"task "} onClick={props.openDetail}>
				<div className="heading">
					<div className="row left-right-align">
						<div className="col-md-6"><a>{props.id}</a></div>
						<div className="col-md-6"></div>
					</div>
				</div>
				<div className="body">{props.description}</div>
			</div>
		</div>
	);
};