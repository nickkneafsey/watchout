var svg = d3.select('body').append('svg');


var enemies = localStorage.getItem("enemies") || 10;

d3.select('.easy').on("click", function() {
  localStorage.setItem("enemies", 5);
});

d3.select('.medium').on("click", function() {
  localStorage.setItem("enemies", 10);
});

d3.select('.hard').on("click", function() {
  localStorage.setItem("enemies", 20);
});


var array = [];
var score = 0;
var highScore = 0;
var collisions = 0;
var height = 500;
var width = 600;
var collide = false;
var callable = true;

for (var i = 0; i < enemies; i++) {
  array[i] = i;
}

var positions = function() {
  return _.map(array, function(i) {
    return {
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      rotation: 0
    };
  });
};

var asteroids = svg.selectAll('image .asteroid')
  .data(positions())
  .enter()
  .append('image')
  .attr('xlink:href', 'asteroid.png')
  .attr('x', function(d) { return d.x; })
  .attr('y', function(d) { return d.y; })
  .attr('class', 'asteroid')
  .attr('height', 20)
  .attr('width', 20);

var move = function () {
  asteroids.transition()
    .duration(1000)
    .tween('track-position', tracker)
    .attr('x', function(d) {
      d.x = Math.random() * width;
      return d.x;
    })
    .attr('y', function(d) {
      d.y = Math.random() * height;
      return d.y;
    });
    
    
    score ++;
    updateScore();
};

var tracker = function() {
    return function(){
      var curX = parseFloat(d3.select(this).attr('x'));
      var curY = parseFloat(d3.select(this).attr('y'));
      
      collisionCheck(curX, curY);
    }
};

var bounceCheck = function(test, bound) {
  // body...
  if( test > bound - 50) {
    test = bound - 50;
  }
  if (test < 5) {
    test = 5;
  }
  return test;
}


var drag = d3.behavior.drag()
.on('drag', function(){
        var dragX = bounceCheck(d3.event.x, width)
        var dragY = bounceCheck(d3.event.y, height)
            player.attr("x", dragX)
                  .attr("y", dragY);
          });

var collisionCheck = function(enemyX, enemyY) {
  var threshold = 20;
  
  
    var distance = Math.sqrt ( Math.pow((player.attr('x') - enemyX), 2) + Math.pow((player.attr('y') - enemyY), 2) ); 
    
    if(distance < threshold) {
      onCollision()
    }
  
}

var onCollision = function() {
  if (callable){
    collisions ++;
  }
  callable = false;
  setTimeout(function(){
    callable = true
  }, 1000);
 
  //collisions++;
  d3.select('.collisions span').text(collisions);
  updateBestScore();
  score = 0;
  updateScore();
};

var updateBestScore = function() {
  if (score > highScore) {
    highScore = score;
  }
  d3.select('.highscore span').text(highScore);
};

var updateScore = function() {
  d3.select('.current span').text(score);
};


var player = svg.append('image')
  .data([{x: 300, y:250}])
  .attr('xlink:href', 'astronaut.gif')
  .attr('class', 'player')
  .attr('x', function(d) { return d.x; })
  .attr('y', function(d) { return d.y; })
  .attr('width', 60)
  .attr('height', 60)
  .call(drag);

setInterval(move, 1000);