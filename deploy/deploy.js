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

  if(payload.branch == "org_refactor"){
    if(payload.status == "success"){
      console.log("Successful build received. Triggering deploy script.");
      exec("(cd /var/www/scrumspace/deploy && ./deploy.sh)");
    }
    else if (payload.static == "error"){
      console.error("Error: Build Failed");
    }
  }

});