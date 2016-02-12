import React from 'react';

class Statistics extends React.Component {
  render() {
    return (
      <div>
        <h2>Statistics</h2>
        {this.props.children}
      </div>
    )
  }
}

module.exports = Statistics;