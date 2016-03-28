import React from 'react';
import { Link }  from 'react-router';  

// TODO: vertically center this
var avatarStyle = {
	display: 'inline-block',
    maxWidth: '80px',
    maxHeight: '80px'
};


export default (props) => {
	return (
		<div className="row" style={{marginTop: '15px'}}>
			<div className="col-md-12 col-lg-12">
				<div className="panel panel-default" style={{float: 'left', display: 'inline-block', height: '100px', width: '100%'}}>
					<div className="panel-body" style={{ width: '100%'}}>
						{/* Image wrapper */}
						<div style={{position: 'relative', float: 'left'}}>
							<img style={avatarStyle} src={props.avatar} />
						</div>
						<Link style={{float: 'left', marginLeft: '10px'}} activeClassName="selected" to={'/project/detail/' + props.id}>
							<h3>{props.title}</h3>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);


};