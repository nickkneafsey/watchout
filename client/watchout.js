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
var w =500;
var h =500;

var x = 250;
var y = 250;
//Add an id for D3
var canvas = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

var pointMaker = function(n) {
  // body..
  var array = [];
    for (var i = 0; i < n; i++) {
      var newX = Math.random() * 100000 % w;
      var newY = Math.random() * 100000 % h;
      array.push({x:newX, y:newY});
  }
  return array;
};



var drag = d3.behavior.drag()
            // .on("drag", dragStart)
            .on('drag', function(){
              player.attr("x", d3.event.x)
                    .attr("y", d3.event.y)
            });



var dataArray = pointMaker(5);
for (var i =0; i<dataArray.length; i++){
  var circle = canvas.append('circle')

                .attr('cx', dataArray[i].x)
                .attr('cy', dataArray[i].y)
                .attr('r', 30)
                .attr('fill', 'red')
}
setInterval(function () {
var arr = pointMaker(5);
d3.select('svg').selectAll('circle').data(arr)
      .transition()
      .duration(1000)
      .attr({
        cx: function (d) { return d.x},
        cy: function (d) { return d.y},
      });
    }, 1000);


function dragStart(d){
  d3.event.sourceEvent.stopPropagation();
}


var player = canvas.append('rect')
                .attr('x', w/2)
                .attr('y', h/2)
                .attr('height', 30)
                .attr('width', 30)
                // .attr('r', 15)
                .attr('fill', 'blue')
                .call(drag);



//player.attr("x", d.x = Math.max(0, Math.min(w - player.width, d3.event.x)))









