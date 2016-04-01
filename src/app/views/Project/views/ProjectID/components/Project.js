import React from 'react';
import Nav from './Nav';
import Tab from './Tabs/Tab';

/* Project details on a particular project*/
class Project extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		// if project data not loaded yet
		if (Object.keys(this.props).length < 1){
			return null;
		}

		return (
			<div>
				{/* Renders project detail view, passes project details down as props */}
				<Nav active-tab={this.props.view} {...this.props}/>
				<div id="tab-container">
					{this.props.children}
				</div>
			</div>
    	);
  	}
}

export default Project;
