// first we need to create a stage
var stage = new Konva.Stage({
    container: 'canvas', // id of container <div>
    width: 500,
    height: 500
});
// then create layer
var layer = new Konva.Layer();

drawFloorTile(0, 0);



var map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i].length; j++) {

        drawFloorTile(j * 40, i * 40);

    }
}
stage.add(layer);

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
    console.log("creat")
    layer.add(floorTile);
}