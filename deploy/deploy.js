var express = require('express');
var http = require('http');
var app = express();
var shelljs = require('shelljs/global');

PORT = 8888;

http.createServer(app).listen(PORT, function(){
  console.log('Deployment server listening on ' + PORT);
});

app.post('/deploy', function(req,res){
  console.log("headers", req.headers);
  console.log("query", req.query);
  console.log("body", req.body);
  //exec("(cd /home/dylanfischler/applications/deploy && ./deploy.sh)");
});