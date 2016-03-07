import React from 'react';
import ScrumBoardHeader from './ScrumBoardHeader';
import StoryRow from './StoryRow';

//DnD Stuff
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class ScrumBoard extends React.Component {
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
			                		return (<StoryRow key={i} details={story} project_id={this.props._id} story_id={story._id}/>);
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