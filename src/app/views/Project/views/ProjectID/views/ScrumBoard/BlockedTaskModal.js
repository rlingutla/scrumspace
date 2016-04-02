import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput } from 'react-bootstrap';
import { connect } from 'react-redux';
import TaskTypes from 'app/shared/constants/taskTypes';
import MultiSelect from 'app/shared/components/MultiSelect';
import { getCurrentTasks } from 'app/shared/utils/utils';
import Select from 'react-select';

import TaskStatus from 'Project/shared/TaskStatus';


class BlockedTaskModal extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			blockingTasks: []
		};
	}

	setUsers(users){
		this.setState({users});
	}

	assignHandler(value){
		if (this.state.blockingTasks.length > 0) {
			//TODO: blockingTasks has objects, needs IDs
			this.props.callback(this.state.blockingTasks, this.props.target, this.props.task);
		}
	}

	handleChange(values){
		this.setState({ blockingTasks: values });
	}

	render(){
		return (
			<Modal show={this.props.isModalOpen} onHide={(e) => this.props.hideModal(e)} className={'task-detail ' + this.props.status}>
				<Modal.Header closeButton>
					<Modal.Title>Assign a Blocking Task</Modal.Title>
				</Modal.Header>
				<Modal.Body className="select-support">
					<Select multi
					    name="blockingTasks"
					    value={this.state.blockingTasks}
					    options={this.props.tasks}
					    labelKey="description"
					    valueKey="_id"
					    onChange={this.handleChange.bind(this)}/>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={(e) => this.props.hideModal(e)}>Cancel</Button>
					<Button bsStyle="danger" disabled={this.state.blockingTasks.length < 1} onClick={(e) => this.assignHandler()}>Assign and Move Task</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}


//redux
const mapStateToProps = (state) => {
	return state;
};
function mapDispatchToProps(){
  return {};
};
function mergeProps(stateProps, dispatchProps, ownProps) {
	let tasks = stateProps
	.projects.find((proj) => proj._id === ownProps.project_id)
	.stories.find((story) => story._id === ownProps.story_id)
	.tasks;

	return Object.assign({}, ownProps, { tasks });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(BlockedTaskModal);
