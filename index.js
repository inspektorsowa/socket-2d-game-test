// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var UUID            = require('node-uuid');

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

var numUsers = 0;
var users = [];

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    var userId = UUID();

    // we store the username in the socket session for this client
    socket.username = username;
    socket.userId = userId;

    users[userId] = {userId: userId, username: username, position: [0,0]};

    ++numUsers;
    addedUser = true;
    console.log('Added user '+ username);
    socket.emit('login', {
      userId: userId,
      numUsers: numUsers,
      users: users,
      direction: 'front',
      animationStep: 1,
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      userId: userId,
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('update position', function (userId, x, y, direction, animationStep) {
    users[userId].position = [x, y];
    users[userId].direction = direction;
    users[userId].animationStep = animationStep;
    console.log('update position for user ', userId, users[userId].position);
    socket.broadcast.emit('update position', {
      userId: userId,
      x: x,
      y: y,
      direction: direction,
      animationStep: animationStep,
    });
  });


  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      delete users[socket.userId];

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        userId: socket.userId,
        numUsers: numUsers
      });
    }
  });
});
