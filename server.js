var express = require('express'),
	app = express(),
	port = 3000;

/* return other contents from dist on get request */
app.get('/:dir/:id', (req, res) => {
	res.sendFile(__dirname + '/dist/' + req.params.dir + "/" + req.params.id);
});

/* return special contents for index.html */
app.get('/', (req, res) => {
	res.sendFile(__dirname + "/dist/index.html");
});

/* listen on designated port */
app.listen(port, () => {
	console.log("Listening on port " + port)
});