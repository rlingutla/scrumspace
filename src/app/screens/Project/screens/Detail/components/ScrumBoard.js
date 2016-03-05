import React from 'react';

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

export class Task extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className="task">
			    <div className="heading">
			        <div className="row left-right-align">
			            <div className="col-md-6"><a>SS-S1-T1</a></div>
			            <div className="col-md-6"></div>
			        </div>
			    </div>
			    <div className="body">Proin pellentesque facilisis ante, in tincidunt nunc luctus sed.</div>
			</div>
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
		                    <div className="col-md-9"><a>SS-S1</a></div>
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
		                <h5>Creating and Assigning Tasks</h5>
		                <ul>
		                    <li>User can add new task to Story</li>
		                    <li>User can assign task to themselves</li>
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
	}

	render() {
		return (
			<tr>
				<td id="story-container">
					<Story />
				</td>
				<td id="task-container">
					<Task />
					<Task />
				</td>
				<td id="doing-container">

				</td>
				<td id="blocked-container">

				</td>
				<td id="done-container">

				</td>
			</tr>	
		);
		
	}

}

export class ScrumBoard extends React.Component {
	constructor(props) {
		super(props);
		debugger;
	}

	render() {
		return (
			<div className="container-fluid">
			    <div className="panel panel-default scrum-board">
			        <div className="panel-body">
			            <table>
			            	<ScrumBoardHeader />
			                <tbody>
			                	{this.props.stories.map((story) => {
			                		<StoryRow details={story}/>
			                	})}
			                </tbody>
			            </table>
			        </div>
			    </div>
			</div>
		);
	}
} 