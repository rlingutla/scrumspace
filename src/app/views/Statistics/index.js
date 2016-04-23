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
			gitStats: {
				allCommits: [],
				indivCommits: []
			}
		};
		this.getGitStats();
	}

//	 return sendXHRPromise('GET', `/api/projects/gitStats?owner=rlingutla&repo=personal-webapge`, undefined).then((response) => {
getGitStats(){
	return sendXHRPromise('GET', '/api/statistics/gitStats',undefined).then((response) => {
		console.log('about to return === ' + response.all);
		return response;
	},(error) => {
		return error;
	});
}


	render(){
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
