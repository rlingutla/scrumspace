import React from 'react';

export default class User extends React.Component {

	constructor(props)
	{
		super(props);

		this.state ={
			data: 'Name'
		};
		this.updateState = this.updateState.bind(this);
	}
	updateState(e)
	{
		this.setState({data:e.target.value});
	}
	render() {
		return (
			<div className="panel-body">
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label>First Name:</label> <input type = "text" input className="form-control" id="first-name"
 							value = {this.state.data}   onChange = {this.updateState} placeholder ={this.state.data} type="first-name" />

					</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<label >Last Name:</label>
							<input className="form-control" id="last-name" placeholder="" type="last-name"/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label for="email">Email address:</label> <input className="form-control" id="email" placeholder="" type="email" />
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<label for="email">User Name:</label>
							<input className="form-control" id="user-name" placeholder="" type="user-name"/>
				</div>
					</div>
				</div>

						<h4> First Name:{this.state.data}</h4>





				<div className="panel-footer settings-foot">
					<button className="btn btn-success pull-right save" type="save">Save</button>
				</div>
			</div>

		);
	}
}
