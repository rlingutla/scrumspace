import React from 'react';
import TopNav from '../../../../shared/components/TopNav';
import ProjectContainer from './components/ProjectContainer';

class Detail extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div id="content">
				<TopNav view="Projects"/>
				<ProjectContainer id={this.props.params.id} />
			</div>
		);
	}
}

export default Detail;