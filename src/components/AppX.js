var React = require('react');

class AppX extends React.Component {  
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Welcome to our routed page</h1>
        <p>We hope you have great time.</p>
      </div>
    );
  }
}

module.exports = AppX;