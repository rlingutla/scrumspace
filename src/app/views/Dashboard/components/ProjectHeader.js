import React from 'react';
import { Link }  from 'react-router';  

export default (props) => {
	return (
		<div className="state-details">
			<div className="row">
				<div className="col-md-6">
					<Link activeClassName="selected" to={'/project/detail/' + props.id}>
						<h4>{props.title}</h4>
					</Link>
				</div>
			</div>
		</div>
	);
};