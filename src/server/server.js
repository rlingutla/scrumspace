var express = require('express'),
app = express();
var database = require('./database');

require('babel-core/register');

// configure express app
require('./config')(app);

// Reset database.
app.post('/resetdb', function(req, res) {
  console.log('Resetting database...');
  // This is a debug route, so don't do any validation.
  database.resetDatabase();
  // res.send() sends an empty response with status code 200
  res.send();
});

// listen on designated port
app.listen(app.get('port'), () => {
	console.log('Listening on port ' + app.get('port'));
});
