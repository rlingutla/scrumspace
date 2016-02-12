/* Our Components */
import App from './components/AppX'
import Home from './components/home';
import Inbox from './components/inbox';
import About from './components/about';


import React from 'react'
// Make a new component to render inside of Inbox
class Message extends React.Component {
  render() {
    return <h3>Message {this.props.params.id} </h3>
  }
}
class InboxStats extends React.Component {
	render() {
		return (
			<div>
				<p> 10 messages unread!</p>
				<p> 5 messages in 10 weeks</p>
			</div>
		)
	}
}
const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'about', component: About },
    { 
		path: 'inbox', 
		component: Inbox,
		indexRoute: { component: InboxStats},
		childRoutes: [
			{ path: "messages/:id", component: Message}
		]
	}
  ]
}

module.exports = routes;