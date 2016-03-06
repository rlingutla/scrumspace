import React from 'react';
import TopNav from '../../../../shared/components/TopNav';
import ProjectListContainer from './components/ProjectList';

/* Master for all user projects */
class Master extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div id="content">
				<TopNav view="Projects" {...this.props}/>
				<ProjectListContainer />
			</div>
    	);
  	}
}

export default Master;