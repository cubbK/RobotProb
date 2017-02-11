var PF = require('pathfinding');

// first we need to create a stage
var stage = new Konva.Stage({
  container: 'canvas', // id of container <div>
  width: 500,
  height: 350
});
// then create layer
var layer = new Konva.Layer();

// 1 - wall
// 0 - floor
// 8 - exit 
// 9 - robot
//
var map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]
for (var i = 0; i < map.length; i++) {
  for (var j = 0; j < map[i].length; j++) {
    drawTile(map[i][j], j, i);
  }
}

stage.add(layer);

//general function of drawing a tile
function drawTile(state, posX, posY) {
  posX *= 40;
  posY *= 40;
  switch (state) {
    case 0:
      drawFloorTile(posX, posY);
      break;
    case 1:
      drawWallTile(posX, posY);
      break;
    case 8:
      drawExitTile(posX, posY);
      break;
    case 9:
      drawRobotTile(posX, posY);
      drawFloorTile(posX, posY);
      break;
  }
}

function drawFloorTile(posX, posY) {
  var floorTile = new Konva.Rect({
    x: posX,
    y: posY,
    width: 40,
    height: 40,
    fill: '#b0baa7',
    stroke: 'black',
    strokeWidth: 2
  });

  layer.add(floorTile);
}

function drawExitTile(posX, posY) {
  var exitTile = new Konva.Rect({
    x: posX,
    y: posY,
    width: 40,
    height: 40,
    fill: '#ed6701',
    stroke: 'black',
    strokeWidth: 2
  });
  layer.add(exitTile);
}

function drawWallTile(posX, posY) {
  var imageObj = new Image();
  imageObj.src = 'img/wall.png';
  imageObj.onload = function() {
    var wall = new Konva.Image({
      x: posX,
      y: posY,
      image: imageObj,
      width: 40,
      height: 40
    });
    // add the shape to the layer
    layer.add(wall);
    stage.add(layer);
  };
}

function drawRobotTile(posX, posY) {
  var imageObj = new Image();
  imageObj.src = 'img/robot.png';
  imageObj.onload = function() {
    var robot = new Konva.Image({
      x: posX,
      y: posY,
      image: imageObj,
      width: 40,
      height: 40,

    });
    // add the shape to the layer
    layer.add(robot);
    stage.add(layer);
  };
}

function drawPathTile(posX, posY) {
  var pathTile = new Konva.Rect({
    x: posX,
    y: posY,
    width: 40,
    height: 40,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 2
  });
  layer.add(pathTile);
  stage.add(layer);
}
// clears map for pathfinding
function clearMap(map) {
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i].length; j++) {
      if (map[i][j] != 0 && map[i][j] != 1) {
        map[i][j] = 0;
      }
    }
  }
  return map;
}

function getPath(map) {
  map = clearMap(map);
  var finder = new PF.AStarFinder();
  var grid = new PF.Grid(map);
  var path = finder.findPath(9, 2, 1, 7, grid);
  return path;
}

function drawPath() {
  var path = getPath(map);
  console.log(path);
  for (var i = 0; i < path.length; i++) {
    var posX = path[i][0] * 40;
    var posY = path[i][1] * 40;
    drawPathTile(posX, posY);
  }

}

var generatePathBtn = document.getElementById('generate-path-btn');
generatePathBtn.onclick = function() {
  drawPath();
  console.log("yay");

}