import React from 'react';
import TimeTable from './TimeTable';
import StoryPanel from './StoryPanel';

const TaskFactory = () => {
	return {
		description: ''
	};
};

const StoryPanelFactory = () => {
	return {
		title: '',
		description: '',
		tasks: [TaskFactory()]
	};
};

export default class SprintPlan extends React.Component {
	constructor(props){
		super(props);
		var nextSprintInfo = this.nextSprintInfo(this.props.current_sprint);
		if(typeof nextSprintInfo[0] !== 'undefined'){
			this.state = {
				name: nextSprintInfo[0].name,
				start_date: this.unixTimeToDate(nextSprintInfo[0].start_date),
				end_date: this.unixTimeToDate(nextSprintInfo[0].end_date),
				scrum_time: this.jsonTimeToTime(nextSprintInfo[0].scrum_time),
				stories: (nextSprintInfo[1].length === 0) ? [StoryPanelFactory()] : nextSprintInfo[1]
			};
		}
		else{
			this.state = {
				name: '',
				start_date: '',
				end_date: '',
				scrum_time: '',
				stories: [StoryPanelFactory()]
			};
		}
	}

	//following two functions are just parsers...
	unixTimeToDate(time){
		var t = new Date(time);
		return t.toISOString().substring(0, 10);
	}

	jsonTimeToTime(time){
		if(time.includes('AM')){
			if(time.charAt(4) === ' '){ //1-9
				return '0' + time.substring(0, 4);
			}
			else{ //12 am checked too
				if(time.charAt(0) === 1 && time.charAt(1) === 2){
					return ('00' + time.substring(2,5));
				}
				else {
					return time.substring(0,5);
				}
			}
		}
		else{ //pm
			if(time.charAt(4) === ' '){ //1-9
				return '' + (12 + parseInt('' + time.charAt(0), 10)) + time.substring(1,4);
			}
			else{ //check 12pm
				if(time.charAt(0) === 1 && time.charAt(1) === 2) {
					return '12' + time.substring(2,5);
				}
				else{
					return '' + (12 + parseInt('' + time.substring(0,2), 10)) + time.substring(2,5);
				}
			}
		}
	}

	//all the state is managed at the highest level
	//change = signal, e = event, args[0] = story, args[1] = task
	handleChange(change, e, args){
		var storyList = this.state.stories;
		switch(change){
			case 'time-name':
				this.setState({name: e.target.value});
				break;
			case 'time-scrum':
				this.setState({scrum_time: e.target.value});
				break;
			case 'time-start':
				this.setState({start_date: e.target.value});
				break;
			case 'time-end':
				this.setState({end_date: e.target.value});
				break;
			case 'story-name':
				storyList[args[0]].title = e.target.value;
				this.setState({stories: storyList});
				break;
			case 'story-desc':
				storyList[args[0]].description = e.target.value;
				this.setState({stories: storyList});
				break;
			case 'task-desc':
				storyList[args[0]].tasks[args[1]].description = e.target.value;
				this.setState({stories: storyList});
				break;
			case 'new-task':
				storyList[args[0]].tasks.push(TaskFactory());
				this.setState({stories: storyList});
				break;
			case 'new-panel':
				this.setState({stories: this.state.stories.concat([StoryPanelFactory()])});
				break;
			case 'remove-story':
				storyList.splice(args[0], 1);
				this.setState({stories: storyList});
				break;
			case 'remove-task':
				storyList[args[0]].tasks.splice(args[1], 1);
				this.setState({stories: storyList});
				break;
			case 'save':
				this.handleSave();
				break;
			default:
				console.log('error');
		}
	}

	handleSave(){

	}

	//This gets infor for a planned future sprint, if there is one.
	nextSprintInfo(sprintID){
		sprintID = sprintID + 1; //increment sprintID +1 to see what's being planned for the next sprint
		return [this.props.sprints[sprintID], this.props.stories.filter(
			function(value){
				if(value.sprint_id === sprintID){
					return true;
				}
				else {
					return false;
				}
			}
		)];
	}

	render(){
		return (
      <div className="content tab-offset container">
        <h2 id="settings">Sprint Planning</h2>
        <div className="panel-group">
          <TimeTable name={this.state.name} scrumtime={this.state.scrum_time} startdate={this.state.start_date} enddate={this.state.end_date} handleChange={this.handleChange.bind(this)}/>
					{
						this.state.stories.map((e,i,array) =>	{
								return (
									<StoryPanel key={i} panNumber={i + 1} last={i + 1 === array.length} isOnly={array.length === 1} story={e} handleChange={this.handleChange.bind(this)}/>
								);
							})
					}
        </div>
      </div>
		);
	}
}
