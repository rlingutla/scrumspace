import React from 'react';

class Project extends React.Component {
  render() {
    return (
      <div>
        <h2>Project</h2>
        {this.props.children}
      </div>
    )
  }
}

module.exports = Project;