function Game(userId, socket) {

	this.players = [];

	this.scene = new Scene(document.getElementById('scene'));
	this.map = new Map(this);
	this.setSocket(socket);

	this.player = new MyPlayer(this, userId);
	this.getScene().getElement().appendChild(this.player.getElement());

	//this.registerPlayer(userId, this.player);

};


Game.prototype.registerPlayer = function(userId) {
	var player = new Player(this, userId);
	this.getScene().getElement().appendChild(player.getElement());
	this.players[userId] = player;
	this.map.addElement(player);
	player.updatePosition(0, 0);
	return player;
};


Game.prototype.removePlayer = function(userId) {
	var player = this.getPlayerById(userId);
	if (player) {
		player.remove();
		delete this.players[userId];
	}
};

Game.prototype.getPlayerById = function(userId) {
	return this.players[userId];
};

Game.prototype.getScene = function() {
	return this.scene;
};


Game.prototype.getPlayer = function() {
	return this.player;
};


Game.prototype.getMap = function() {
	return this.map;
};

Game.prototype.getSocket = function() {
	return this.socket;
};

Game.prototype.setSocket = function(socket) {
	this.socket = socket;
};


var KEY_CODE_ARROW_RIGHT = 39;
var KEY_CODE_ARROW_LEFT = 37;
var KEY_CODE_ARROW_DOWN = 40;
var KEY_CODE_ARROW_UP = 38;
var KEY_CODE_SPACE = 32;
var KEY_CODE_SHIFT = 16;
var KEY_CODE_ALT_LEFT = 18;
var KEY_CODE_ALT_RIGHT = 225;
var KEY_CODE_CTRL = 17;
