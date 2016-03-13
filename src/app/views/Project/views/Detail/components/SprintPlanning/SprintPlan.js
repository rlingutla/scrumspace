import React from 'react';
import TimeTable from './TimeTable';
import StoryPanel from './StoryPanel';
import { postAndCreateNewSprint } from '../../../../../../actions/';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {

  return {
    createNewSprint: (pid, sid, name, start_date, end_date, scrum_time, stories) => {
      dispatch(postAndCreateNewSprint(pid, sid, name, start_date, end_date, scrum_time, stories));
    }
  };
};

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
		var nextSprintInfo = (this.props.sprints.length === 1) ? this.sprintInfo(0) : this.sprintInfo(this.props.current_sprint +1);
		if(typeof nextSprintInfo[0] !== 'undefined'){
			this.state = {
        pid: this.props._id,
        sid: nextSprintInfo[0]._id,
				name: nextSprintInfo[0].name,
				start_date: nextSprintInfo[0].start_date,
				end_date: nextSprintInfo[0].end_date,
				scrum_time: nextSprintInfo[0].scrum_time,
				stories: (nextSprintInfo[1].length === 0) ? [StoryPanelFactory()] : nextSprintInfo[1]
			};
		}
		else{
			this.state = {
        pid: this.props._id,
				sid: (this.props.current_sprint === null) ? 0 : this.props.current_sprint + 1,
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
    if(time === ''){
      return '';
    }
		var t = new Date(time);
		return t.toISOString().substring(0, 10);
	}

  dateToUnixTime(time){
    var t = new Date(time);
    return (t/1000);
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
        this.setState({start_date: this.dateToUnixTime(this.state.start_date), end_date: this.dateToUnixTime(this.state.end_date)});
				this.handleSave();
				break;
			default:
				console.log('error');
		}
	}

	handleSave(){
    alert('Sprint has been created!');
    this.props.createNewSprint(this.state.pid, this.state.sid, this.state.name, this.state.start_date, this.state.end_date, this.state.scrum_time, this.state.stories);
	}

	//This gets infor for a planned future sprint, if there is one.
	sprintInfo(sprintID){
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
          <TimeTable name={this.state.name} scrumtime={this.state.scrum_time} startdate={this.unixTimeToDate(this.state.start_date)} enddate={this.unixTimeToDate(this.state.end_date)} handleChange={this.handleChange.bind(this)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SprintPlan);
