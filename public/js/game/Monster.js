class Monster extends ComponentAbstract {

	constructor(x, y, width, height, texture) {

		super(x, y, width, height, texture);

		this.element.className = 'monster';
		this.alive = true;

	}


checkCollision(elem) {
	if (!this.alive) return;
	var rect1 = elem.getBoundingClientRect();
	var rect2 = this.getElement().getBoundingClientRect();
	var overlap = !(rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom)
                //console.log(rect1);
    if (overlap) {
    	this.element.style.backgroundImage = 'url(./img/explosion2.gif)';
    	this.element.style.height = '200px';
    	this.element.style.width = '200px';
    	var that = this;
    	setInterval(function() {
    		that.element.style.backgroundImage = 'none';
    		that.alive = false;
    	}, 700);
    }
	}

}
