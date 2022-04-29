class ComponentAbstract {

  constructor(x, y, width, height, texture) {

  	this.x = x;
  	this.y = y;
  	this.width = width;
  	this.height = height;
  	this.texture = texture;

  	this.element = document.createElement('div');
  	this.element.style.width = this.width + 'px';
  	this.element.style.height = this.height + 'px';
  	this.element.style.backgroundImage = 'url(./img/' + this.texture + ')';

    this.updateOffset();

    var that = this;
    $(window).on('resize', function() {
      that.updateOffset();
    });

  }

  updateOffset() {
    this.element.style.left = Math.floor(window.innerWidth/2 + this.x) + 'px';
  	this.element.style.top = Math.floor(window.innerHeight/2 + this.y) + 'px';
    return this;
  }

  getElement() {
	   return this.element;
  }


  checkCollision(elem) {

  }

  getPosition() {
	    return this.getOffset();
  }

  getOffset() {
	   return [parseInt(this.element.style.left), parseInt(this.element.style.top)];
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    return this.updateOffset();
  	// this.element.style.left = Math.floor(window.innerWidth/2 + x - this.element.offsetWidth/2) + 'px';
  	// this.element.style.top = Math.floor(window.innerHeight/2 + y - this.element.offsetHeight/2) + 'px';
  	// return this;
  }

  remove() {
  	this.element.parentNode.removeChild(this.element);
  	return this;
  }

}
