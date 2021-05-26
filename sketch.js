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

  tiles.forEach(element => {
    if (element.nextState != element.alive)
      element.applyState();
  });
}

function mousePressed () {
  if (mouseButton != LEFT) return true;
  let x = floor(mouseX / gridSize) - 1;
  let y = floor(mouseY / gridSize) - 1;
  tiles.forEach(element => {
    if (element.x == x && element.y == y) {
      element.setState(!element.alive);
    }
  });
  return false;
}

function toggleSim() {
  simulating = !simulating;
}

// Verry innefecient, but I don't care
function getTileNeighbors () {
  tiles.forEach(tile => {
    tiles.forEach(checking => {
      let tileX = tile.x;
      let tileY = tile.y;
      let checkX = checking.x;
      let checkY = checking.y;

      for (let yOff = -1; yOff < 2; yOff++) {
        for (let xOff = -1; xOff < 2; xOff++) {
          let samePos = xOff == 0 && yOff == 0;
          let xOffPos = (tileX + xOff + gridW) % gridW;
          let yOffPos = (tileY + yOff + gridH) % gridH;
          if ( xOffPos == checkX &&  yOffPos == checkY && !samePos) tile.neighbors.push(checking);
        }
      }
    });
  });
}