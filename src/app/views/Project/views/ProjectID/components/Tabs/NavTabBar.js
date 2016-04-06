import React from 'react';
import NavTab from './NavTab';

const tabs = [
	{ id: 'scrumboard', name: 'ScrumBoard'},
	{ id: 'planning', name: 'Planning'},
	{ id: 'settings', name: 'Settings'}
];

const NavTabBar = (props) => {
	//construct tab components with data
	var tabComponents = tabs.map(function(tab){
		return (
			<NavTab name={tab.name} key={tab.id} projectID={props._id} tab-name={tab.name} tab-id={tab.id} active-tab={props['active-tab']}/>
		);
	});
    return (
        <div>
            <ul className="nav nav-tabs project-nav" role="tablist">
            	{tabComponents}
            </ul>
        </div>
    );
};

export default NavTabBar;
