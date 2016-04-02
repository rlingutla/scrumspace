import React from 'react';
import ScrumBoardHeader from './ScrumBoardHeader';
import StoryRow from './StoryRow';
import { getCurrentSprint } from 'app/shared/utils/utils';
//DnD Stuff
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class ScrumBoard extends React.Component {
	constructor(props) {
		super(props);
	}

	getSprintStories(){
		let currentSprint = getCurrentSprint(this.props);
		// TODO this ternary operator should go?
		return (this.props.stories ? this.props.stories: []).filter((story) => {
			return story.sprint_id === currentSprint._id;
		});
	}

	render() {
		return (
			<div className="container-fluid">
			    <div className="panel panel-default scrum-board">
			        <div className="panel-body">
			            <table>
			            	<ScrumBoardHeader />
			                <tbody>
			                	{this.getSprintStories().map((story, i) => {
			                		return (<StoryRow users={this.props.users} key={i} project_id={this.props._id} story_id={story._id}/>);
			                	})}
			                </tbody>
			            </table>
			        </div>
			    </div>
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(ScrumBoard);
