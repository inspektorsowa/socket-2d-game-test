class MyPlayer extends Player {

  constructor(game, userId) {

    super(game, userId);

    this.element.id = 'myplayer';
    this.initKeyboardEvents();

  }

  initKeyboardEvents() {

    var player = this;
  	var keydownFired = false;

	  document.addEventListener('click', function(ev) {
		  console.log('click', ev.clientX, ev.clientY);
		  var speed = PLAYER_SPEED_NORMAL;
		  let newX = ev.clientX - (window.innerWidth/2 + player.x);
		  let newY = ev.clientY - (window.innerHeight/2 + player.y);
		  let vx = 0, vy = 0;
		  let dir;
		  if (Math.abs(newX) > Math.abs(newY)) {
			  if (ev.clientX < window.innerWidth/2 + player.x) {
				  dir = PLAYER_DIRECTION_LEFT;
				  vx = -1;
			  } else {
				  dir = PLAYER_DIRECTION_RIGHT;
				  vx = 1;
			  }
		  } else {
			  if (ev.clientY < window.innerHeight / 2 + player.y) {
				  dir = PLAYER_DIRECTION_BACK;
				  vy = -1;
			  } else {
				  dir = PLAYER_DIRECTION_FRONT;
				  vy = 1;
			  }
		  }
		  console.log('new xy', newX, newY);
		  player.setDirection(dir).setAnimationStep(1).startAnimation(4, speed);
		  player.startMovementAnimation(vx, vy, speed);
	  });

  	document.addEventListener('keydown', function(ev) {
  		if (KEY_CODE_SHIFT == ev.keyCode) {
  			keydownFired = false;
  		}
  		if (keydownFired) return;
  		var speed = (ev.shiftKey ? PLAYER_SPEED_FAST : PLAYER_SPEED_NORMAL);
  		switch (ev.keyCode) {
  			case KEY_CODE_ARROW_RIGHT:
  				keydownFired = true;
  				player.setDirection(PLAYER_DIRECTION_RIGHT).setAnimationStep(1).startAnimation(4, speed);
  				player.startMovementAnimation(1, 0, speed);
  				break;
  			case KEY_CODE_ARROW_LEFT:
  				keydownFired = true;
  				player.setDirection(PLAYER_DIRECTION_LEFT).setAnimationStep(1).startAnimation(4, speed);
  				player.startMovementAnimation(-1, 0, speed);
  				break;
  			case KEY_CODE_ARROW_UP:
  				keydownFired = true;
  				player.setDirection(PLAYER_DIRECTION_BACK).setAnimationStep(1).startAnimation(4, speed);
  				player.startMovementAnimation(0, -1, speed);
  				break;
  			case KEY_CODE_ARROW_DOWN:
  				keydownFired = true;
  				player.setDirection(PLAYER_DIRECTION_FRONT).setAnimationStep(1).startAnimation(4, speed);
  				player.startMovementAnimation(0, 1, speed);
  				break;

  			default:
  				break;
  		}

  	});

  	document.addEventListener('keyup', function(ev) {
  		keydownFired = false;
  		switch (ev.keyCode) {
  			case KEY_CODE_ARROW_RIGHT:
  			case KEY_CODE_ARROW_LEFT:
  			case KEY_CODE_ARROW_UP:
  			case KEY_CODE_ARROW_DOWN:
  				player.stopAnimation().setAnimationStep(0);
  				player.stopMovementAnimation();
          player.broadcastPosition();
  				break;

  			default:
  				break;
  		}
  	});
  }


  startAnimation(maxStep, speed) {
  	this.stopAnimation();
  	var player = this;
  	this.animationInterval = setInterval(function() {
  		var step = player.getAnimationStep();
  		if (step >= maxStep) step = 0;
  		step++;
  		player.setAnimationStep(step);
  	}, speed);
  }

  setDirection(dir) {
    this.stopAnimation();
    return super.setDirection(dir);
  }

  stopAnimation() {
  	if (this.animationInterval) {
  		clearInterval(this.animationInterval);
  	}
  	return this;
  }

  startMovementAnimation(x, y, speed) {
  	this.stopMovementAnimation();
  	var player = this;
  	var speedTime = 5;
  	if (speed == PLAYER_SPEED_FAST) {
  		speedTime = 1;
  	}
  	this.movementAnimation = setInterval(function() {
  		player.move(x, y);
  		player.game.getMap().checkCollision();
  	}, speedTime);
  }

  stopMovementAnimation() {
  	clearInterval(this.movementAnimation);
  }

  move(x, y) {
  	this.moveX(x).moveY(y);
    this.broadcastPosition();
  }


  broadcastPosition() {
    var position = this.getPosition();
    this.game.getSocket().emit('update position', this.getUserId(), position[0], position[1], this.getDirection(), this.getAnimationStep());
    return this;
  }

  moveX(x) {
  	this.game.getMap().moveX(0-x);
  	return this;
  }

  moveY(y) {
  	this.game.getMap().moveY(0-y);
  	return this;
  }

  getPosition() {
  	var offset = this.game.getMap().getOffset();
    return [0-offset[0], 0-offset[1]];
  }



}
