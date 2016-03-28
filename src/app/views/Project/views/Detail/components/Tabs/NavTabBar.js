import React from 'react';
import NavTab from './NavTab';

const tabs = [
	{ id: 0, name: 'ScrumBoard'},
	{ id: 1, name: 'Planning'},
	{ id: 2, name: 'Settings'}
];

const NavTabBar = (props) => {

	//construct tab components with data
	var tabComponents = tabs.map(function(tab){
		return (
			<NavTab name={tab.name} key={tab.id} projectID={props._id} tab-id={tab.id} active-tab={props['active-tab']} tab-change={props['tab-change']} />
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
