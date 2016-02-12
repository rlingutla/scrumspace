import React from 'react';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <h2>Settings</h2>
        {this.props.children}
      </div>
    )
  }
}

module.exports = Settings;