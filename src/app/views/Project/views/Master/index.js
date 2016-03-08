import React from 'react';
import TopNav from '../../../../shared/components/TopNav';
import ProjectListContainer from './components/ProjectList';
import {Button,Glyphicon} from 'react-bootstrap';
import NewProjModal from './components/NewProjModal';

/* Master for all user projects */
export default class Project extends React.Component{
	constructor(props){
		super(props);
		this.state = {modalIsOpen:false};

	}

	handleClick(e){
		e.preventDefault();
    this.changeModal();
	}

	changeModal(){
    this.setState({modalIsOpen : !this.state.modalIsOpen});
	}

	render(){
		return (
			<div id="content">
				<TopNav view="Projects">
					<Button onClick={this.handleClick.bind(this)}>Create Project <Glyphicon glyph="plus" /></Button>
				</TopNav>
				<NewProjModal show={this.state.modalIsOpen} changeModal={this.changeModal.bind(this)} />
				<ProjectListContainer />
			</div>
		);
	}

}
