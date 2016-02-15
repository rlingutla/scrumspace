import React from 'react';
import NavTab from './navTab';

class NavTabBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	activeTab: this.props['active-tab']
        };
    }

    render() {
        return (
        	<div>
	        	<ul className="nav nav-tabs project-nav" role="tablist">
	        			<NavTab name="Board" tab-id={0} active-tab={this.props['active-tab']} tab-change={this.props['tab-change']} />
	        			<NavTab name="Planning" tab-id={1} active-tab={this.props['active-tab']} tab-change={this.props['tab-change']} />
	        	</ul>
	        </div>
        );
    }
}

export default NavTabBar;