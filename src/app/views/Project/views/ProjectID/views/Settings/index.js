import React from 'react';
import MultiSelect from 'app/shared/components/MultiSelect';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import Wrapper from 'app/shared/components/Wrapper';
import Container from '../../containers';

class Settings extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			deleteModal: false
		};
	}

	setMembers(members) {
		this.setState({
			users: members
		});
	}

	toggleModal(state){
		this.setState({deleteModal: state});
	}

	render() {
		return (
			<div>
				{/* Delete Project Modal */}
				<Modal show={this.state.deleteModal} onHide={(e) => this.toggleModal(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Delete Project?</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Are you sure you want to delete </p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={(e) => this.toggleModal(false)}>Close</Button>
						<Button bsStyle="danger">Delete</Button>
					</Modal.Footer>
				</Modal>

				<div className="content">
					<Wrapper>
						<div className="panel-group">
							<div className="panel panel-primary">
								<div className="panel-heading">
									<h4>Project Settings</h4> 
								</div>
								<div className="panel-body">
									<form>
										<Row>
											<Col md={6}>
												<div className="form-group">
													<label for="usr">Project Title</label>
													<input type="text" className="form-control" id="usr" value={this.props.title} placeholder="Your Project Title"/>
												</div>
											</Col>
											<Col md={6}>
												<div className="form-group">
													<label for="usr">Users</label>
													<MultiSelect collection="users" labelKey="display_name" valueKey="_id" updateState={(members) => this.setMembers(members)}/>
												</div>
											</Col>
										</Row>
									</form>
								</div>
								<div className="panel-footer settings-foot">
									<Button type="button" bsStyle="danger" className="pull-right" onClick={(e) => this.toggleModal(true)}>Delete Project</Button>
								</div>
							</div>
						</div>
					</Wrapper>
				</div>
			</div>
		);
	}
}

export default Container(Settings);