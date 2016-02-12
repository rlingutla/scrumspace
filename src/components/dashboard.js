import React from 'react';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children}
      </div>
    )
  }
}

module.exports = Dashboard;