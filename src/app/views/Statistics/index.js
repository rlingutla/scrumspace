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
		return response;
	},(error) => {
		ErrorBanner('Could not retrieve git data. Please check that you have inputed the correct repo and owner name. If you have inputed the right data, you may have exceeded the max number of data calls to the Github servers. Let them cool off and try again in an hour.');
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
