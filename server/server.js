var express = require('express'),
	app = express();

//configure express app
require('./config')(app);

/* listen on designated port */
app.listen(app.get('port'), () => {
	console.log('Listening on port ' + app.get('port'));
});