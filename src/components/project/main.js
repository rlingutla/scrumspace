import React from 'react';

/* TODO: this may not be needed, still learning react-router*/
class Project extends React.Component {
  render () {
    return (
		<div>
			{this.props.children}
		</div>
    )
  }
}

module.exports = Project;