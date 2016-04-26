import React from 'react';
import { Link }  from 'react-router';  

// TODO: vertically center this
// var avatarStyle = {
// 	display: 'inline-block',
//     maxWidth: '80px',
//     maxHeight: '80px'
// };
var avatarStyle = {
	backgroundSize: 'cover',
	backgroundPosition: 'top center',
	width: '60px',
	height: '60px',
	display: 'inline-block'
}


export default (props) => {
	return (
		<div style={{marginTop: '30px'}}>
			<h3>{props.title}</h3>
			<hr />
			{/*<div className="col-md-12 col-lg-12">
				<div className="panel panel-default" style={{float: 'left', display: 'inline-block', height: '100px', width: '100%'}}>
					<div className="panel-body" style={{ width: '100%'}}>
						<div style={Object.assign({...avatarStyle}, {backgroundImage: `url(${props.avatar})`})} />
						<Link style={{marginLeft: '10px'}} activeClassName="selected" to={'/project/' + props.id}>
							<h3>{props.title}</h3>
						</Link>
					</div>
				</div>
			</div> */}
		</div>
	);


};