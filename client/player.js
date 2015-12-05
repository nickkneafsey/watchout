var Player = function (gameOptions) {
  // body...
  Board.call(this, gameOptions);
  this.radius = 10;
};

Player.prototype = Object.create(Board.prototype);
Player.prototype.constructor = Player;


Player.prototype.move = function() {
  // body...
  var newX = 0.5 * width;
  var newY = 0.5 * height;
  this.transform({x:newX, y:newY});
};

Player.prototype.render = function() {
  // body...
  this.move();
  return this;
};