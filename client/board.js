var Board = function (gameOptions) {
  // body.
  this.x = 0;
  this.y = 0;
  this.gameOptions = gameOptions;
};

//gget the x axis of the Board
Board.prototype.getX = function() {
  // body...
  return this.x
};

//set the x axis
Board.prototype.setX = function(x) {
  // body...
  var xMin = this.gameOptions.padding;
  var xMax = this.gameOptions.width - this.gameOptions.padding;
  if (x <= xMin) {
    x = xMin;
  } else if (x >= xMax) {
    x = xMax;
  }
  this.x = x;
};

Board.prototype.getY = function() {
  // body...
  return this.y
};

//set the x axis
Board.prototype.setY = function(y) {
  // body...
  var yMin = this.gameOptions.padding;
  var yMax = this.gameOptions.height - this.gameOptions.padding;
  if (y <= yMin) {
    y = xMin;
  } else if (x >= yMax) {
    y = yMax;
  }
  this.y = y;
};


Board.prototype.transform = function(val) {
  // body...
  this.setX(val.x || this.x);
  this.setY(val.y || this.y);
};

Board.prototype.move = function(x, y) {
  // body...
  this.transform({x:x, y:y});
};