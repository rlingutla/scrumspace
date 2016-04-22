import React from 'react';
import MultiSelect from 'app/shared/components/MultiSelect';
import { Modal, Button, Row, Col, Input } from 'react-bootstrap';
import { putProjectUpdates, removeProject } from '../../../../../../actions/';
import Wrapper from 'app/shared/components/Wrapper';
import Container from '../../containers';
import { connect } from 'react-redux';
import { sendXHRPromise } from '../../../../../../server_calls/index';
import { Async as AsyncSelect } from 'react-select';

class Settings extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			deleteModal: false,
			changeModal: false,
			title: props.title,
			project_id: props._id,
			users: props.users,
			githubRepo: '',
			githubOwner: ''
		};
	}

	handleChange(e){
		e.preventDefault();

		let value = e.target.value;
		let field = e.target.attributes.name.nodeValue;

		let updObj = {};
		updObj[field] = value;
		this.setState(updObj);
	}

	handleGRChange(e){
		e.preventDefault();

		let value = e.target.value;
		let field = e.target.attributes.name.nodeValue;

		let updObj = {};
		updObj[field] = value;
		this.setState(updObj);
	}

	deleteProj(){
		this.toggleDModal(false);
		this.props.removeProjectAct(this.state.project_id);
	}

	saveChanges(){
		this.toggleCModal(false);
		let members = this.state.users.map((user) => user._id);
		this.props.updateProject(this.state.project_id,this.state.title, members, this.state.githubRepo, this.state.githubOwner);
	}

	getUserOptions(input){
		return sendXHRPromise('GET', `/api/user/search?searchStr=${input}&key=display_name`, undefined).then((response) => {
			return {options: response.data};
		});
	}

	setMembers(members) {
		this.setState({
			users: members
		});
	}

	toggleDModal(state){
		this.setState({deleteModal: state});
	}

	toggleCModal(state){
		this.setState({changeModal: state});
	}

	render() {
		return (
			<div>
				{/* Delete Project Modal */}
				<Modal show={this.state.deleteModal} onHide={(e) => this.toggleDModal(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Delete Project?</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Are you sure you want to delete {this.props.title}?</p>
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="danger" onClick={(e) => this.deleteProj(e)}>Delete</Button>
						<Button onClick={(e) => this.toggleDModal(false)}>Close</Button>
					</Modal.Footer>
				</Modal>

				{/* Save Project Changes Modal */}
				<Modal show={this.state.changeModal} onHide={(e) => this.toggleCModal(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Save Changes</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Are you sure you want to save these changes?</p>
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="success" onClick={(e) => this.saveChanges(e)}>Save Changes</Button>
						<Button onClick={(e) => this.toggleCModal(false)}>Close</Button>
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
											<Col md={4}>
												<div className="form-group">
													<label for="usr">Project Title</label>
													<Input type="text" className="form-control" name="title" id="usr" value={this.state.title} placeholder="Enter new project title" onChange={(e) => this.handleChange(e)}/>
												</div>
											</Col>
											<Col md={4}>
												<div className="form-group">
													<label for="usr">Users (only <b>add</b> new users)</label>
													{/*<MultiSelect collection="users" labelKey="display_name" valueKey="_id" updateState={(members) => this.setMembers(members)}/>*/}
													<AsyncSelect
														multi
													    name="form-field-name"
													    loadOptions={this.getUserOptions.bind(this)}
													    labelKey="display_name"
													    valueKey="_id"
													    onChange={(members) => this.setMembers(members)}
													    value={this.state.users}
													/>
												</div>
											</Col>
											<Col md={4}>
												<div className="form-group">
													<label for="usr">Git Stats Connection</label>
															<Input type="text"  name="githubRepo" id="usr" value={this.state.githubRepo} placeholder="Enter github repo name associated with the project" onChange={(e) => this.handleChange(e)}/>
													<Input type="text"  name="githubOwner" id="usr"  value={this.state.githubOwner} placeholder="Enter github username of repo owner" onChange={(e) => this.handleChange(e)}/>
											  </div>
											</Col>
										</Row>
									</form>
								</div>
								<div className="panel-footer settings-foot">
									<Button type="button" bsStyle="danger" className="pull-right" onClick={(e) => this.toggleDModal(true)}>Delete Project</Button>
									<Button type="button" bsStyle="success" className="pull-right" onClick={(e) => this.toggleCModal(true)}>Save Changes</Button>
								</div>
							</div>
						</div>
					</Wrapper>
				</div>
			</div>
		);
	}
}


// TODO FIGURE OUT WHAT TO DO HERE.
const mapStateToProps = (state, props) => {
  return state;
};

// pulls out current project from projects object, pushes to props
function mergeProps(stateProps, dispatchProps, ownProps) {
	// todo get rid of this:
	var projects = stateProps.projects || [];
	var project;
	project = projects.find((proj) => {
		return proj._id === ownProps.params.id;
	});
	return Object.assign({...project}, {...ownProps}, {...dispatchProps});
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateProject: (project_id,title, users, githubRepo, githubOwner) => {
			dispatch(putProjectUpdates(project_id,title,users,githubRepo, githubOwner));
		},
  	removeProjectAct: (project_id) => {
  		dispatch(removeProject(project_id));
  	}
  };
};

export default connect(mapStateToProps, mapDispatchToProps,mergeProps)(Settings);
