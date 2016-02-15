import React from 'react';
import NavTab from './navTab';

class NavTabBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	activeTab: this.props['active-tab']
        };
    }

    // tabChange(){
    // 	this.activeTab
    // }

    render() {
        return (
        	<ul className="nav nav-tabs project-nav" role="tablist">
        			<NavTab name="Board" tab-id={0} active-tab={this.state.activeTab} tab-change={this.props['tab-change']} />
        			<NavTab name="Planning" tab-id={1} active-tab={this.state.activeTab} tab-change={this.props['tab-change']} />
        	</ul>
        );
    }
}

export default NavTabBar;