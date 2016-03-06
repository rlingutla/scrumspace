import React from 'react';
import TopNav from '../../../../shared/components/TopNav';
import ProjectContainer from './components/Project';
import { Glyphicon, Button } from 'react-bootstrap';

class Detail extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div id="content">
				<TopNav view="Projects" {...this.props}> 
					<Button>Create Project <Glyphicon glyph="plus" /></Button>
				</TopNav>
				<ProjectContainer id={this.props.params.id} />
			</div>
		);
	}
}

export default Detail;

