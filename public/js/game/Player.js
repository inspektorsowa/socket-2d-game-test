var PLAYER_DIRECTION_LEFT = 'left';
var PLAYER_DIRECTION_RIGHT = 'right';
var PLAYER_DIRECTION_FRONT = 'front';
var PLAYER_DIRECTION_BACK = 'back';

var PLAYER_SPEED_NORMAL = 120;
var PLAYER_SPEED_FAST = 30;

class Player extends ComponentAbstract {

	constructor(game, userId) {

		super(0, 0, 50, 100, 'player.png');

		this.userId = userId;
		this.game = game;

		this.element.className = 'player';

		this.animationStep = 0;
		this.animationInterval = null;
		this.movementAnimation = null;
		this.setDirection(PLAYER_DIRECTION_FRONT);

	}

	getDirection(dir) {
		return this.direction;
	}

	setDirection(dir) {
		this.direction = dir;
		this.element.setAttribute('data-dir', dir);
		// this.stopAnimation();
		this.setAnimationStep(0);
		return this;
	}

	setAnimationStep(step) {
  	this.animationStep = step;
  	this.element.setAttribute('data-step', step);
  	return this;
  }

  getAnimationStep() {
  	return this.animationStep;
  }


	getUserId() {
		return this.userId;
	}

	updateOffset() {
		this.element.style.left = Math.floor(window.innerWidth/2 + this.x - this.element.offsetWidth/2) + 'px';
  	this.element.style.top = Math.floor(window.innerHeight/2 + this.y - this.element.offsetHeight/2) + 'px';
		return this;
	}

}
