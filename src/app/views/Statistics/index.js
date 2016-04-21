import React from 'react';
import TopNav from 'app/shared/components/TopNav';
import GitList from './components/GitList';
import {Button,Glyphicon} from 'react-bootstrap';
import Wrapper from '../../shared/components/Wrapper';


/* Master for all user projects */
export default class Statistics extends React.Component{
	constructor(props){
    console.log(props.user.stats);
		super(props);
		this.state = {
			...props.user
		};


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
