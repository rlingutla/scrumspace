import React from 'react';
import TopNav from 'app/shared/components/TopNav';
import GitList from './components/GitList';
import {Button,Glyphicon} from 'react-bootstrap';
import Wrapper from '../../shared/components/Wrapper';
import { sendXHRPromise } from '../../server_calls/index';


/* Master for all user projects */
export default class Statistics extends React.Component{
	constructor(props){
		super(props);
		this.state = {
		};
	}

	getGitStats(){
		debugger;
		return sendXHRPromise('GET', '/api/statistics/gitStats',undefined).then((response) => {
			return this.setState({gitStats: {allCommits: response.all, indivCommits: response.owner}});
			//;
		});
	}


	render(){
		this.getGitStats();
		return (
			<div id="content">
				<TopNav view="Git Statistics"/>
				<Wrapper>
					<GitList  />
				</Wrapper>
			</div>
		);
	}

}
