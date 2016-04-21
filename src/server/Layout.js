// TODO: Don't love this fix, but it will work well enough
// Figure out why react can't server render an entire document body 
// Tried to render to document root element to no avail.

export default function Layout(appRenderedToString) {
	return '<html>\
			<head>\
				<title>ScrumSpace</title>\
				<meta charSet="utf-8" />\
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />\
				<meta name="viewport" content="width=device-width, initial-scale=1" />\
				<link href="/static/css/bootstrap.min.css" rel="stylesheet" />\
				<link rel="stylesheet" type="text/css" href="/static/css/main.css" />\
			</head>\
			<body>\
				<div id="app">'
					+ appRenderedToString +
				'</div>\
				<script src="/socket.io/socket.io.js"></script>\
				<script src="/static/js/bundle.js"></script>\
			</body>\
		</html>';
}