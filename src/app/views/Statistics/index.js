import React from 'react';
import TopNav from 'app/shared/components/TopNav';
import GitList from './components/GitList';
<<<<<<< HEAD
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
=======

/* Master for all user projects */
export default () => {
	return (
		<div id="content">
			<TopNav view="Git Statistics"/>
			<GitList />
		</div>
	);
};
>>>>>>> 5cfb13578784fc629499ae0be9193a74c241f67f
