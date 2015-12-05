var Enemy = function (gameOptions, id) {
  Board.call(this, gameOptions)
  this.radius = gameOptions.enemyRadius;
  this.id = id;

}

Enemy.prototype = Object.create(Board.prototype);

Enemy.prototype.constructor = Enemy;

Enemy.prototype.move = function() {
  // body...
  var newX = Math.random() * 100000 % this.width;
  var newY = Math.random() * 100000 % this.height;
  this.transform({x:newX, y:newY});
};

Enemy.prototype.render = function() {
  // body...
  this.move();
  return this;
};