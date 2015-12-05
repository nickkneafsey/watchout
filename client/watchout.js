var svg = d3.select('body').append('svg');

var enemies = 20;
var array = [];
var score = 0;
var highScore = 0;
var collisions = 0;
var collisionTimer;
var collided = false;
var height = 500;
var width = 600;

for (var i = 0; i < enemies; i++) {
  array[i] = i;
  // console.log(array[i]);
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
    
    collisionCheck();
    score ++;
    updateScore();
};

var tracker = function() {
    // var curX = Math.floor(asteroids.attr('cx'));
    // var curY = Math.floor(asteroids.attr('cy'));
    // console.log(curX, curY);

    return function(){
      var curX = parseFloat(d3.select(this).attr('x'));
      var curY = parseFloat(d3.select(this).attr('y'));
      //var curY = parseFloat(this.y);
      console.log(curX);
      collisionCheck2(curX, curY);
    }
    
      

      
};

var bounceCheck = function(test, bound) {
  // body...
  if( test > bound - 30) {
    test = bound - 30;
  }
  if (test < 30) {
    test = 30;
  }
  return test;
}

//set the data for x and y axis

var drag = d3.behavior.drag()
.on('drag', function(){
        var dragX = bounceCheck(d3.event.x, width)
        var dragY = bounceCheck(d3.event.y, height)
            player.attr("cx", dragX)
                  .attr("cy", dragY);
          });

var collisionCheck = function() {
  var threshold = 20;
  //console.log(asteroids.data())
  _.each(asteroids.data(), function(asteroid) {
    var asteroidx=parseFloat(asteroid.x);
    var asteroidy=parseFloat(asteroid.y);
    // console.log("cx", player.attr('cx'));
    var distance = Math.sqrt ( Math.pow((player.attr('cx') - asteroidx), 2) + Math.pow((player.attr('cy') - asteroidy), 2) ); 
    // console.log(distance);
    if(distance < threshold) {
      onCollision()
    }
  })
  //console.log(player.data()[0]);
  //console.log(asteroids)
   // var distance = Math.sqrt ( Math.pow((player.attr('cx') - enemy.attr('cx')), 2) + Math.pow((player.attr('cy') - enemy.attr('cy')), 2) );
   // console.log(distance);
}

var collisionCheck2 = function(enemyX, enemyY) {
  var threshold = 20;
  
  
    var distance = Math.sqrt ( Math.pow((player.attr('cx') - enemyX), 2) + Math.pow((player.attr('cy') - enemyY), 2) ); 
    // console.log(distance);
    if(distance < threshold) {
      onCollision()
    }
  
}

var onCollision = function() {
  //update score
  collisions++;
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

// var collisionCheck = function(x, y) {
//   var threshold = 20;
//   var p = player.data()[0];
//   var distance = Math.sqrt ( Math.pow((p.x - x), 2) + Math.pow((p.y - y), 2) );
//   if (distance <= threshold) {
//     collided = true;
//     setTimeout(function() {
//       collided = false;
//     }, 900);

//     score = 0;
//     collisions++;

//     d3.select('.collisions span').text(collisions);
//   }
// };



// var updateCurrentScore = function() {
//   score++;
//   if (score > highScore) {
//     highScore = score;
//   }
//   d3.select('.current span').text(score);
//   d3.select('.highscore span').text(highScore);

// };
// scoreTimer = setInterval(updateCurrentScore, 5);

// var collisionStart = function() {
//   if (!collided) {
//     asteroids.each(function() {
//       var singleAsteroid = d3.select(this)
//       collisionCheck(singleAsteroid.attr('x'), singleAsteroid.attr('y'));
//     })
//   }
// }

// var spinShuriken = function() {
//   asteroids.each(function() {
//     d3.select(this).attr('transform', function(d) {
//       d.rotation = d.rotation + 2;
//       return 'rotate(' +  d.rotation + ' '
//         + (d3.select(this).attr('x') - 10) + ' '
//         + (d3.select(this).attr('y') - 10) + ')'
//     })
//   })
// }

// setInterval(spinShuriken, 1);

//collisionTimer = setInterval(collisionStart, 5);
var player = svg.append('circle')
  .data([{x: 300, y:250}])
  .attr('class', 'player')
  .attr('fill', 'blue')
  .attr('r', 10)
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .call(drag);


setInterval(move, 1000);