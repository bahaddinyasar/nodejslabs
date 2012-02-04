var express = require('express'),
    app = express.createServer(),
    io = require('socket.io').listen(app),
    chat = require('./chat.js'),
    fs = require('fs');

// to make util global, omit var. 
util = require('./util.js');
 
require('./configuration.js').boot(app); 
util.requireCodeForApp(__dirname+'/routes',app); 
 

//io.set('transports', ['websocket', 'jsonp-polling']);
io.set('transports', ['xhr-polling', 'jsonp-polling']);
io.set('log level', 4);
chat.setIoObject(io);
io.sockets.on('connection', chat.connectionHandler);


app.listen(process.env.PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);