import React from 'react';
import { Link }  from 'react-router';  
const App = (props) => {
	return (
		<html>
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>ScrumSpace</title>
				<link href="/static/css/bootstrap.min.css" rel="stylesheet" />
				<link rel="stylesheet" type="text/css" href="/static/css/main.css" />
			</head>
			<body>
				<div id="app">
					<div id="sidebar">
						<div id="project-selector">
							<ul>
								<li>
									<Link to="/project/detail/1"><span className="glyphicon glyphicon-blackboard"></span></Link>
								</li>
								<li>
									<Link to="/project/new"><span className="glyphicon glyphicon-plus"></span></Link>
								</li>						
								<li>
									<Link to="/statistics"><span className="glyphicon glyphicon-stats"></span></Link>
								</li>
							</ul>
						</div>
					</div>
					{props.children}
				</div>
				<script src="/static/js/bundle.js" />
			</body>
		</html>
	);
};

export default App;