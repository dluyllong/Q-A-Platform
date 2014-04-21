var express = require("express"),
  app     = express(),
  port    = parseInt(process.env.PORT, 10) || 9001;



 app.use(express.static(__dirname + '/'));


app.listen(port);
console.log('Now serving the app at http://localhost:' + port + '/app');