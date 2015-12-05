var svg = d3.select('body').append('svg');

var enemies = 20;
var array = [];
var score = 0;
var highScore = 0;
var collisions = 0;
var collisionTimer;
var collided = false;

for (var i = 0; i < enemies; i++) {
  array[i] = i;
  //console.log(i);
}

var positions = function() {
  return _.map(array, function(i) {
    return {
      id: i,
      x: Math.random() * 600,
      y: Math.random() * 500,
      rotation: 0
    };
  });
};

var enemy = positions();

var asteroids = svg.selectAll('image')
  .data(enemy)
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
    .attr('x', function(d) {
      d.x = Math.random() * 600;
      return d.x;
    })
    .attr('y', function(d) {
      d.y = Math.random() * 500;
      return d.y;
    })
    .duration(1000);
};

//set the data for x and y axis
var player = svg.append('circle')
  .data([{x: 300, y:250}])
  .attr('class', 'player')
  .attr('fill', 'blue')
  .attr('r', 10)
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; });

var collisionCheck = function(x, y) {
  var threshold = 20;
  var p = player.data()[0];
  var distance = Math.sqrt ( Math.pow((p.x - x), 2) + Math.pow((p.y - y), 2) );
  if (distance <= threshold) {
    collided = true;
    setTimeout(function() {
      collided = false;
    }, 900);

    score = 0;
    collisions++;

    d3.select('.collisions span').text(collisions);
  }
};


var drag = d3.behavior.drag()
  .on('drag', function(){
              player.attr("cx", d3.event.x)
                    .attr("cy", d3.event.y);
            });

var updateCurrentScore = function() {
  score++;
  if (score > highScore) {
    highScore = score;
  }
  d3.select('.current span').text(score);
  d3.select('.highscore span').text(highScore);

};
scoreTimer = setInterval(updateCurrentScore, 5);

var collisionStart = function() {
  if (!collided) {
    asteroids.each(function() {
      var singleAsteroid = d3.select(this)
      collisionCheck(singleAsteroid.attr('x'), singleAsteroid.attr('y'));
    })
  }
}

var spinShuriken = function() {
  asteroids.each(function() {
    d3.select(this).attr('transform', function(d) {
      d.rotation = d.rotation + 2;
      return 'rotate(' +  d.rotation + ' '
        + (d3.select(this).attr('x') - 10) + ' '
        + (d3.select(this).attr('y') - 10) + ')'
    })
  })
}

// setInterval(spinShuriken, 1);

collisionTimer = setInterval(collisionStart, 5);

player.call(drag);

setInterval(move, 1000);