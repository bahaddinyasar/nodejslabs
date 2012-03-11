var app = require('express').createServer(),
    io = require('socket.io').listen(app),
    port = 8090;

// to make util global, omit var. 
util = require('./util.js');

require('./configuration.js').boot(app); 
require('./authorization.js')(app); 

//util.requireCodeForApp(__dirname+'/routes',app); 
util.requireRoutes(app); 

require('./chat.js')(io);

app.listen(port);
console.log("Express server listening on port number %d",port);