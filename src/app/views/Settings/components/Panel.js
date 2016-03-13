import React from 'react';

export default (props) => {
	return (
		<div className="panel panel-primary">
			<div className="panel-heading">
				<h4><span className={'glyphicon glyphicon-' + props.glyphicon}></span> {props.heading}:</h4>
			</div>
			<div className="panel-body">
				{props.children}
			</div>
			{
				(props.saveMethod) ?
				<div className="panel-footer settings-foot">
					<button className="btn btn-success pull-right save" type="save">Save</button>
				</div> : null
			}
		</div>
		);
};
