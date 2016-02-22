import { Component } from 'react';

/* TODO: this may not be needed, still learning react-router*/
class Project extends Component {
  render () {
    return (
		<div>
			{this.props.children}
		</div>
    );
  }
}

export default Project;