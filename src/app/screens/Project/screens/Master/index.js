import React from 'react';
import TopNav from '../../../../shared/components/TopNav';
import ProjectContainerList from './components/ProjectContainerList';

/* Master for all user projects*/
class Master extends React.Component {
	render() {
		return (
			<div id="content">
				<TopNav view="Projects"/>
				<ProjectContainerList />
			</div>
    	);
  	}
}

export default Master;