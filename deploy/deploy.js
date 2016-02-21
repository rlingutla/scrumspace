var express = require('express');
var http = require('http');
var app = express();
var shelljs = require('shelljs/global');

app.use(require('body-parser').json());

PORT = 8888;

http.createServer(app).listen(PORT, function(){
  console.log('Deployment server listening on ' + PORT);
});

app.post('/deploy', function(req,res){
  var payload = req.body.build;

  if(payload.branch == "master"){
    if(payload.status == "success"){
      exec("(cd /var/www/scrumspace/deploy && ./deploy.sh)");
    }
    else if (payload.static == "error"){
      console.error("Error: Build Failed");
    }
  }

});