let margin = 1;
let tiles = []
let buttons = [];
let gridSize = 12; 
let gridW;
let gridH;
let simulating = false;
let tileSizeInput;

function setup () {
  frameRate(12); // This seems to be a good speed
  generateField();

  // Create the buttons
  buttons.push(createButton("Toggle Simulation").mousePressed(toggleSim));
  buttons.push(createButton("Step Simulation").mousePressed(stepSim));
  buttons.push(createButton("Randomize Tiles").mousePressed(genRandomTiles));
  buttons.push(createButton("Clear Grid").mousePressed(clearGrid));
  /* !!! CURRENTLY BREAKS LOGIC UNLESS SIZE IS A FACTOR OF CANVAS SIZE !!!
  tileSizeInput = createInput(gridSize);
  buttons.push(tileSizeInput);
  buttons.push(createButton("Apply").mousePressed(setTileSize));
  */

  buttons.forEach(element => {
    element.class("attributes");
  });
}

function draw () {
  if (simulating) {
    stepSim();
  }

  // Apply the new tile's state if it's state changed
  tiles.forEach(element => {
    if (element.nextState != element.alive)
      element.applyState();
  });
}

// For swapping Tile States
function mousePressed () {
  if (mouseButton != LEFT) return true;

  // Find Mouse Pos
  let x = floor(mouseX / gridSize) - margin;
  let y = floor(mouseY / gridSize) - margin;

  // Swap State
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

  // Calc grid dimensions
  gridW = (width / gridSize) - margin;
  gridH = (height / gridSize) - margin;

  // Create Tiles
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

    // Loop through the 3x3 area around the tile
    for (let yOff = -1; yOff < 2; yOff++) {
      for (let xOff = -1; xOff < 2; xOff++) {
        // Calculate positions
        let samePos = xOff == 0 && yOff == 0;
        let xOffPos = (tileX + xOff + gridW) % gridW; // (pos + width) % width | Creates wrapping
        let yOffPos = (tileY + yOff + gridH) % gridH;

        // Push neighbors to the tile's neighbor array
        let index = xOffPos + yOffPos * gridW;
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

function stepSim() {
  tiles.forEach(element => {
    element.step();
  });
}

function clearGrid() {
  tiles.forEach(element => {
      element.setState(false);
  });
}

function genRandomTiles () {
  tiles.forEach(element => {
      element.nextState = floor(random(3)) == 1;  // 1/3 looks nicer than 1/2
  });
}

function setTileSize () {
  gridSize = parseInt(tileSizeInput.value());
  generateField();
}