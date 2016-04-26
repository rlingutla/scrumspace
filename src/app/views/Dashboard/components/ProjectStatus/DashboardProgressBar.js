import React from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import TaskTypes from 'app/shared/constants/taskTypes';
import { daysDifference, getCurrentSprint } from 'app/shared/utils/utils';
import _ from 'underscore';
import moment from 'moment';

class DashboardProgressBar extends React.Component {
	constructor(props) {
		super(props);
	}

	countType(taskType){
		let total = 0, typeCount = 0;

		this.props.stories.forEach((story) => {
			story.tasks.forEach((task) => {
				if(task.status === taskType.title) ++typeCount;
				++total;
			});
		});
		let calc = Math.floor((typeCount/total)*100);
		return {
			count: typeCount,
			calc: calc,
			total: total
		};
	}

	daysLeft(){
		let sprint = getCurrentSprint(this.props);
		//calculated end date: add sprint duration to start_date
		let end_date = moment(sprint.start_date).add(sprint.duration, 'days');
		let diff = daysDifference(Date.now(), end_date);

		return (diff.past) ? 0:diff.days;
	}


	//probably find a way not to call these functions multiple times
	render(){
		let taskCount = {
			'DONE': this.countType(TaskTypes.DONE).calc,
			'DOING': this.countType(TaskTypes.DOING).calc,
			'BLOCKED': this.countType(TaskTypes.BLOCKED).calc,
			'UNASSIGNED': this.countType(TaskTypes.UNASSIGNED).calc
		};

		return (
			<div style={Object.assign({...this.props.style}, {marginRight: '-25px', marginLeft: '-25px', fontSize: '18px'})}>
				<ProgressBar>
					<ProgressBar bsStyle="success" now={this.countType(TaskTypes.DONE).calc} key={1} />
					<ProgressBar bsStyle="warning"now={this.countType(TaskTypes.DOING).calc} key={2} /> 
					<ProgressBar bsStyle="danger" now={this.countType(TaskTypes.BLOCKED).calc}key={3} />
					<ProgressBar bsStyle="info" now={this.countType(TaskTypes.UNASSIGNED).calc} key={4} />
				</ProgressBar>
			</div>
		);
	}
}

//redux
const mapStateToProps = (state) => {
	return state;
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	let project = stateProps.projects.find((proj) => proj._id === ownProps.project_id);
	return Object.assign(project, ownProps, dispatchProps);
}

//maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps,
	mapDispatchToProps,
	mergeProps)(DashboardProgressBar);
