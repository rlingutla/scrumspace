import React from 'react';
import TopNav from 'app/shared/components/TopNav';
import { Button, Glyphicon } from 'react-bootstrap';

import ProjectList from './components/ProjectList';
import ProjectCreationModal from './components/ProjectCreationModal';

/* Master for all user projects */
export default class ProjectMaster extends React.Component{
	constructor(props){
		super(props);
		this.state = { modalIsOpen: false};
	}

	handleClick(e){
		e.preventDefault();
    	this.changeModal();
	}

	changeModal(){
    	this.setState({modalIsOpen : !this.state.modalIsOpen});
			this.setState({users: this.emptyList});
	}

	render() {
		return (
			<div id="content">
				<TopNav view="Projects">
					<Button onClick={(e) => this.handleClick(e)}>Create Project <Glyphicon glyph="plus" /></Button>
				</TopNav>
				<ProjectCreationModal show={this.state.modalIsOpen} changeModal={(e) => this.changeModal()} />
				<ProjectList />
			</div>
		);
	}
}