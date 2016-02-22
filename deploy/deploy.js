var express = require('express');
var http = require('http');
var app = express();
var shelljs = require('shelljs/global');

app.use(require('body-parser').urlencoded({extended: false}));

PORT = 8888;

http.createServer(app).listen(PORT, function(){
  console.log('Deployment server listening on ' + PORT);
});

app.post('/deploy', function(req,res){
  //console.log("post received", JSON.parse(req.body.payload));
  var payload = JSON.parse(req.body.payload);

  if(payload.status == 0 && payload.branch == 'master'){
    console.log("Successful build received. Triggering deploy script.");
    exec("(cd /var/www/scrumspace/deploy && ./deploy.sh)");
  }

});