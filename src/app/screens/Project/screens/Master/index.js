import React from 'react';
import TopNav from '../../../../shared/components/TopNav';

/* Master for all user projects*/
class Master extends React.Component {
	render() {
		return (
			<div id="content">
				<TopNav view="Your Projects"/>
				{this.props.children}
			</div>
    	);
  	}
}

export default Master;