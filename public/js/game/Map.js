function Map(game) {

	this.game = game;

	this.element = document.createElement('div');
	this.element.id = 'map';
	this.element.style.top = '0px';
	this.element.style.left = '0px';

	this.game.getScene().getElement().appendChild(this.element);

	this.elements = [];

	this.addElement(new Floor(-10000, -10000, 20000, 20000, 'grass1.png'));
	this.addElement(new Monster(-300, 0, 320, 163, 'boss.gif'));
	this.addElement(new Monster(300, 0, 320, 163, 'monster2.gif'));

};


Map.prototype.addElement = function(element) {
	this.elements.push(element);
	this.element.appendChild(element.getElement());
};

Map.prototype.getOffset = function(element) {
	return [parseInt(this.element.style.left), parseInt(this.element.style.top)];
};

Map.prototype.moveX = function(x) {
	this.element.style.left = parseInt(this.element.style.left) + x + 'px';
};

Map.prototype.moveY = function(y) {
	this.element.style.top = parseInt(this.element.style.top) + y + 'px';
};


Map.prototype.checkCollision = function() {
	var playerElement = this.game.getPlayer().getElement();
	for (var i=0; i<this.elements.length; i++) {
		// this.elements[i].checkCollision(player);
	}
};
