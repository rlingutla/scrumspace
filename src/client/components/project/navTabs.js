import React from 'react';

class NavTabs extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        	<div>	
        		<ul className="nav nav-tabs project-nav" role="tablist">
        		    <li role="presentation" className="active"><a href="#scrum-board" aria-controls="scrum-board" role="tab" data-toggle="tab">Board</a></li>
        		    <li role="presentation"><a href="sprint_planning.html">Planning</a></li>
        		</ul>
        	</div>
        );
    }
}

export default NavTabs;
