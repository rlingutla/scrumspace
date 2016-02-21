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

  var payload = {};

  if(payload.build.branch == "master"){
    if(payload.build.status == "success"){
      exec("(cd /var/www/scrumspace/deploy && ./deploy.sh)");
    }
    else if (payload.build.static == "error"){
      console.error("Error: Build Failed");
    }
  }

});