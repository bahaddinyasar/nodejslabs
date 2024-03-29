var dateformat = require('dateformat');

module.exports = function (ioObject) {

    // usernames which are currently connected to the chat
    var usernames = {};
    
    ioObject.set('transports', ['xhr-polling', 'jsonp-polling']);
    ioObject.set('log level', 4);
    
    var connectionHandler = function (socket) {
      // when the client emits 'sendchat', this listens and executes
      socket.on('sendchat', function (data) {
        // we tell the client to execute 'updatechat' with 2 parameters
    
        ioObject.sockets.emit('updatechat', {
            'msg':data,
            'user':socket.username,
            'time': dateformat("hh:MM:ss")
            } );
      });
    
      // when the client emits 'adduser', this listens and executes
      socket.on('adduser', function(username){
        // we store the username in the socket session for this client
        socket.username = username;
        // add the client's username to the global list
        usernames[username] = username;
        // echo to client they've connected
        
        socket.emit('updatechat', {'msg':'you have connected','user':'SERVER','time':dateformat("hh:MM:ss")});
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('updatechat', {'msg':username + ' has connected','user':'SERVER','time':dateformat("hh:MM:ss")});
        // update the list of users in chat, client-side
        ioObject.sockets.emit('updateusers', usernames);
      });
    
      // when the user disconnects.. perform this
      socket.on('disconnect', function(){
        // remove the username from global usernames list
        delete usernames[socket.username];
        // update list of users in chat, client-side
        ioObject.sockets.emit('updateusers', usernames);
        // echo globally that this client has left
        socket.broadcast.emit('updatechat', {'msg':socket.username + ' has disconnected','user':'SERVER','time':dateformat("hh:MM:ss")});
      });
    };
    
    ioObject.sockets.on('connection', connectionHandler);

};