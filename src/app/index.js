import React from 'react';
import Sidebar from './components/sidebar';

const App = (props) => {
	return (
		<html>
			<head>
				<title>ScrumSpace</title>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link href="/static/css/bootstrap.min.css" rel="stylesheet" />
				<link rel="stylesheet" type="text/css" href="/static/css/main.css" />
			</head>
			<body>
				<div id="app">
					<Sidebar />
					{props.children}
				</div>
				<script src="/static/js/bundle.js" />
			</body>
		</html>
	);
};

export default App;