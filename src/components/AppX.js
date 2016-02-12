import React from 'react';
import { RouteHandler, Link} from 'react-router';
 
class App extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
          <li><Link to="/inbox/messages/252">Message 252</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

module.exports = App;