import React from 'react';
import TopNav from '../../shared/components/TopNav';
import GitList from './components/GitList';
import {Button,Glyphicon} from 'react-bootstrap';
import Wrapper from '../../shared/components/Wrapper';


/* Master for all user projects */
export default class Statistics extends React.Component{
	constructor(props){
		super(props);
		this.state = {};
	}


	render(){
		return (
			<div id="content">
				<TopNav view="Git Statistics"/>
				<Wrapper>
				<GitList />
				</Wrapper>
			</div>
		);
	}

}
