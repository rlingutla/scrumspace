import React from 'react';
import Task from '../../../shared/Task';

export class ScrumBoardHeader extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<thead>
				<tr>
				    <th>Stories</th>
				    <th>Tasks <span className="badge">3</span></th>
				    <th>Doing <span className="badge">2</span></th>
				    <th>Blocked <span className="badge">1</span></th>
				    <th>Done <span className="badge">1</span></th>
				</tr>
			</thead>
		);
	}
}

export class Story extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="user-story collapse1 collapse in">
		        <div className="">
		            <div className="heading">
		                <div className="row left-right-align">
		                    <div className="col-md-9"><a>{this.props.id}</a></div>
		                    <div className="col-md-3">
		                        <div className="control">
		                            <button className="collapse-control" data-toggle="collapse" data-target=".collapse1">
		                                <i className="glyphicon glyphicon-triangle-top"></i>
		                            </button>
		                        </div>
		                    </div>
		                </div>
		            </div>
		            <div className="body">
		                <h5>{this.props.title}</h5>
		                <ul>
		                	{this.props.description.split("\n").map((desc, i) => {
		                		return (<li key={i}>{desc}</li>);
		                	})}
		                </ul>
		            </div>
		        </div>
			</div>
		);
	}
}

export class StoryRow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: true,
			tasks: this.organizeTasks(props.details.tasks)
		};
	}

	organizeTasks(tasks){
		let taskObj = {
			'UNASSIGNED': [],
			'DOING': [],
			'BLOCKED': [],
			'DONE': []
		};

		tasks.forEach((task) => {
			//SORRY GUYS
			if(!(task.status !== 'UNASSIGNED' && task.status !== 'DOING' && task.status !== 'BLOCKED' && task.status !== 'DONE')){
				taskObj[task.status].push(task);
			}
		});

		return taskObj;
	}

	// filter tasks to categories
		// UNASSIGNED, DOING, BLOCKED, DONE

	render() {
		return (
			<tr>
				<td id="story-container">
					<Story id={this.props.details.sprint_id} title={this.props.details.title} description={this.props.details.description} />
				</td>
				<td id="task-container">
					{this.state.tasks['UNASSIGNED'].map((task, i) => {
						return <Task key={i} {...task} />
					})}
				</td>
				<td id="doing-container">
					{this.state.tasks['DOING'].map((task, i) => {
						return <Task key={i} {...task}/>
					})}
				</td>
				<td id="blocked-container">
					{this.state.tasks['BLOCKED'].map((task, i) => {
						return <Task key={i} {...task}/>
					})}
				</td>
				<td id="done-container">
					{this.state.tasks['DONE'].map((task, i) => {
						return <Task key={i} {...task}/>
					})}
				</td>
			</tr>	
		);
		
	}

}

export class ScrumBoard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container-fluid">
			    <div className="panel panel-default scrum-board">
			        <div className="panel-body">
			            <table>
			            	<ScrumBoardHeader />
			                <tbody>
			                	{this.props.stories.map((story, i) => {
			                		return (<StoryRow key={i} details={story}/>);
			                	})}
			                </tbody>
			            </table>
			        </div>
			    </div>
			</div>
		);
	}
} 