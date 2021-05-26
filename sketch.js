function setup () {
  let canvX = gridW * gridSize + (gridSize * 2);
  let canvY = gridH * gridSize + (gridSize * 2);

  createCanvas(canvX, canvY);
  frameRate(60);
  background(50);

  for (let y = 0; y < gridH; y++) {
    for (let x = 0; x < gridW; x++) {
      tiles.push(new Tile(x, y));
    }
  }
  getTileNeighbors();

  startButton = createButton("Toggle Simulation");
  startButton.mousePressed(toggleSim);
}

function draw () {
  tiles.forEach(element => {
    element.step();
  });
}

function mousePressed () {
  if (mouseButton != LEFT) return true;
  let x = floor(mouseX / gridSize) - 1;
  let y = floor(mouseY / gridSize) - 1;
  tiles.forEach(element => {
    if (element.gridX == x && element.gridY == y) {
      element.alive = !element.alive;
    }
  });
  return false;
}

function toggleSim() {
  simulating = !simulating;
}

function getTileNeighbors () {
  tiles.forEach(tile => {
    tiles.forEach(checking => {
      let tileX = tile.gridX;
      let tileY = tile.gridY;
      let checkX = checking.gridX;
      let checkY = checking.gridY;

      for (let yOff = -1; yOff < 2; yOff++) {
        for (let xOff = -1; xOff < 2; xOff++) {
          let samePos = xOff == 0 && yOff == 0;
          if (tileX + xOff == checkX &&  tileY + yOff == checkY && !samePos) tile.neighbors.push(checking);
        }
      }
    });
  });
}