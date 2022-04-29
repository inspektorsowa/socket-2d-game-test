$(function() {

  var userId = null;
  var users = [];
  var connected = false;
  var socket = io();

  var showLoginInput = function() {
    var input = $('<input type="text" placeholder="Enter your name and press enter">');
    $('body').append($('<div class="username">').append(input));
    input.keypress(function(e) {
      if (e.keyCode == 13) {
        var username = this.value;
        loginUser(username);
      }
    });
  };

  var loadGameFiles = function() {
    var classes = ['Game', 'Scene', 'ComponentAbstract', 'Floor', 'Map', 'Monster', 'Player', 'MyPlayer'];
    classes.forEach(function(className) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = false;
      script.src = '/js/game/' + className +'.js';
      document.body.appendChild(script);
    });
  };

  var loginUser  = function(username) {
    // Tell the server your username
    socket.emit('add user', username);
  };


  socket.on('login', function (data) {
    connected = true;
    userId = data.userId;
    initGame();
  });


  socket.on('update position', function (data) {
    if (data.userId != userId && window.game) {
      var player = window.game.getPlayerById(data.userId);
      if (!player) {
        player = window.game.registerPlayer(data.userId);
      }
      if (player) {
        player.updatePosition(data.x, data.y);
        player.setDirection(data.direction);
        player.setAnimationStep(data.animationStep);
      }
    }
  });


  socket.on('user joined', function (data) {
    if (data.userId != userId && window.game) {
      window.game.registerPlayer(data.userId);
    }
  });


  socket.on('user left', function (data) {
    if (window.game)
      window.game.removePlayer(data.userId);
  });

  var initGame = function() {
    $('body').html('<div id="scene"></div>');
    window.game = new Game(userId, socket);
  };


// ---------------------------------------------------------------------------------------------------------

showLoginInput();
loadGameFiles();

});
