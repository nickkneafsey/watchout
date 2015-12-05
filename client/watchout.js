// start slingin' some d3 here.

// var gameOptions = {
//   height: 450,
//   width: 700,
//   nEnemies: 30,
//   enemyRadius: 20,
//   padding: 20
// };

// var gameStats = {
//   score: 0,
//   bestScore: 0
// };

// var axes = {
//   x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
//   y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
// };

// var gameBoard = d3.select('.container').append('svg:svg')
//                 .attr('width', gameOptions.width)
//                 .attr('height', gameOptions.height);

// var updateScore = function(){
//   d3.select(".current span")
//     .text(gameStats.score.toString())
//     // check about toString
// };

// var updateBestScore = function() {
//   gameStats.bestScore = _.max([gameStats.bestScore, gameStats.score]);
// };

//Add an id for D3
var canvas = d3.select('body')
  .append('svg')
  .attr('width', 500)
  .attr('height', 500);

var pointMaker = function(n) {
  // body..
  var array = [];
    for (var i = 0; i < n; i++) {
      var newX = Math.random() * 100000 % 500;
      var newY = Math.random() * 100000 % 500;
      array.push({x:newX, y:newY});
  }
  return array;
};

var dataArray = pointMaker(5);
for (var i =0; i<dataArray.length; i++){
  var circle = canvas.append('circle')
                .attr('cx', dataArray[i].x)
                .attr('cy', dataArray[i].y)
                .attr('r', 30)
                .attr('fill', 'red')
}






