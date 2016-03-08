var express = require('express'),
	app = express();

require('babel-core/register');

// configure express app
require('./config')(app);

// listen on designated port
app.listen(app.get('port'), () => {
	console.log('Listening on port ' + app.get('port'));
});