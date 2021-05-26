let margin = 1;
let tiles = []
let gridSize = 8;

function setup () {
  frameRate(60);

  generateField();

  let startButton = createButton("Toggle Simulation");
  startButton.mousePressed(toggleSim);

  let clearButton = createButton("Clear Grid");
  clearButton.mousePressed(clearGrid);

  let randomizeButton = createButton("Randomize Tiles");
  randomizeButton.mousePressed(genRandomTiles);
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
  let x = floor(mouseX / gridSize) - margin;
  let y = floor(mouseY / gridSize) - margin;
  tiles.forEach(element => {
    if (element.x == x && element.y == y) {
      element.setState(!element.alive);
    }
  });
  return false;
}

function generateField() {
  createCanvas(1200, 600);
  
  background(60);
  stroke(0, 0, 0);
  strokeWeight(gridSize / 25);

  gridW = (width / gridSize) - 2 * margin;
  gridH = (height / gridSize) - 2 * margin;

  tiles = [];
  for (let y = 0; y < gridH; y++) {
      for (let x = 0; x < gridW; x++) {
          tiles.push(new Tile(x, y));
      }
  }
  getTileNeighbors();
}

function getTileNeighbors () {
  tiles.forEach(tile => {
    let tileX = tile.x;
    let tileY = tile.y;

    for (let yOff = -1; yOff < 2; yOff++) {
      for (let xOff = -1; xOff < 2; xOff++) {
        let samePos = xOff == 0 && yOff == 0;
        let xOffPos = (tileX + xOff + gridW) % gridW;
        let yOffPos = (tileY + yOff + gridH) % gridH;
        let index = xOffPos + (yOffPos * gridW);

        if (!samePos) tile.neighbors.push(tiles[index]);
      }
    }
  });
}

function toggleSim() {
  simulating = !simulating;
  let colMult = simulating? 4 : 1;
  background(50 * colMult);
  tiles.forEach(element => {
    element.draw();
  });
}

function clearGrid() {
  tiles.forEach(element => {
      element.setState(false);
  });
}

function genRandomTiles () {
  tiles.forEach(element => {
      element.nextState = floor(random(2)) == 1;
  });
}