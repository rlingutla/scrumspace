import React from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import TaskTypes from '../../../../../constants/taskTypes';

class ProjectProgressBar extends React.Component {
	constructor(props) {
		super(props);
	}

	countType(taskType){
		let total = 0, typeCount = 0;

		this.props.stories.forEach((story) => {
			story.tasks.forEach((task) => {
				if(task.status == taskType) ++typeCount;
				++total;
			});
		});
		let calc = Math.floor((typeCount/total)*100);
		return calc;
	}


	render(){
		return (
			<div>
				<div className="row left-right-align progress-bar-details">
				    <div className="col-md-6"><strong>1/7</strong> Tasks Complete</div>
				    <div className="col-md-6"><strong>5</strong> Days Left of Sprint</div>
				</div>
				<ProgressBar>
					<ProgressBar bsStyle="info" now={this.countType(TaskTypes.UNASSIGNED)} key={1} />
					<ProgressBar bsStyle="warning"now={this.countType(TaskTypes.DOING)} key={2} />
					<ProgressBar bsStyle="danger" now={this.countType(TaskTypes.BLOCKED)}key={3} />
					<ProgressBar bsStyle="success" now={this.countType(TaskTypes.DONE)}key={4} />
				</ProgressBar>
			</div>
		);
	}
};

//redux
const mapStateToProps = (state) => {
	return state;
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	let project = stateProps.projects.find((proj) => proj._id == ownProps.project_id);
	return Object.assign(project, ownProps, dispatchProps);
}

//maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {};
}

const ProjectProgressBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ProjectProgressBar);

export default ProjectProgressBarContainer;