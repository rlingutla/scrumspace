import React from 'react';

export default (props) => {
	return (
		<div>
			<div key={props.key} className="task" onClick={props.openDetail}>
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