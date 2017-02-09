// first we need to create a stage
var stage = new Konva.Stage({
  container: 'canvas', // id of container <div>
  width: 500,
  height: 500
});
// then create layer
var layer = new Konva.Layer();

// 1 - wall
// 0 - floor
// 8 - exit 
// 9 - robot
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