'use-strict';

var express = require('express'),
	router = express.Router();

router.get('/', function (req, res) {
    res.send('Welcome to the ScrumSpace API V1');
});

router.use('/project/', require('./project'));

module.exports = router;