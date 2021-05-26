function setup() {
  createCanvas(gridW * gridSize + (gridSize * 2), gridH * gridSize + (gridSize * 2));
  //frameRate(5);
  background(50);
  for (let y = 0; y < gridH; y++) {
    for (let x = 0; x < gridW; x++) {
      tiles.push(new Tile(x, y));
    }
  }
}

function draw() {
  tiles.forEach(element => {
    element.step();
  });
}

function mouseClicked() {
  let x = floor(mouseX / gridSize) - 1;
  let y = floor(mouseY / gridSize) - 1;
  tiles.forEach(element => {
    if (element.gridX == x && element.gridY == y) {
      element.setState(!element.alive);
    }
  });
}