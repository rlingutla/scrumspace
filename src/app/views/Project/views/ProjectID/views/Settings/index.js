import React from 'react';
import MultiSelect from 'app/shared/components/MultiSelect';
import {Button, Row, Col } from 'react-bootstrap';

export default class Settings extends React.Component {
	constructor(props){
		super(props);
	}

	setMembers(members) {
		this.setState({
			users: members
		});
	}

	render() {
		return (
			<div className="content">
				<Col md={2}>
				</Col>

				<Col md={8}>
					<div className="panel-group">
						<div className="panel panel-primary">
							<div className="panel-heading">
								<h4>Settings </h4> </div>
								<div className="panel-body">
								<Row>
										<Col md={3}>
											<div className="form-group">
												<label for="usr">Title</label>
												<input type="text" className="form-control" id="usr" placeholder="change title"> </input>
											</div>
										</Col>

											<Col md={9}>

											</Col>





									</Row>




									<Row>

										<Col md={5}>
									<form>
										<MultiSelect collection="users" labelKey="display_name" valueKey="_id" updateState={(members) => this.setMembers(members)}/>
									</form>
								</Col>


									<Col md={7}>
									</Col>



									</Row>


								</div>
								<div className="panel-footer settings-foot">
									<button type="save" className="btn btn-success pull-right save" data-toggle="modal" data-target="#myModal1"> Delete Project</button>
								</div>
							</div>
							<Col md={2}>
							</Col>
						</div>
					</Col>
				</div>
		);
	}
}