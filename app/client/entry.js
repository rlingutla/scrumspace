import React from 'react'
import { render } from 'react-dom'

// First we import some modules...
import { Router, browserHistory } from 'react-router'
import routes from '../routes'

// Finally, we render a <Router> with some <Route>s.
// It does all the fancy routing stuff for us.
render((<Router history={browserHistory} routes={routes}/>)
  , document.getElementById('app'))