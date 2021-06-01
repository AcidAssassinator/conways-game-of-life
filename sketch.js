// Global Variables
let margin = 1;
let tiles = []
let buttons = [];
let gridSize = 12; 
let gridW;
let gridH;
let simulating = false;
let tileSizeInput;


// Called on page load
function setup () {
  frameRate(60);

  // In its own function so it can be called without duplicating the buttons
  generateField();

  // Create the buttons
  buttons.push(createButton("Toggle Simulation").mousePressed(toggleSim));
  buttons.push(createButton("Step Simulation").mousePressed(stepSim));
  buttons.push(createButton("Randomize Tiles").mousePressed(genRandomTiles));
  buttons.push(createButton("Clear Grid").mousePressed(clearGrid));
  tileSizeInput = createInput(gridSize);
  buttons.push(tileSizeInput);
  buttons.push(createButton("Apply").mousePressed(setTileSize));

  buttons.forEach(element => {
    element.class("attributes");
  });
}

// Called every frame
function draw () {
  // Call step for each tile
  tiles.forEach(element => {
    element.step();
  });

  // Apply the new tile's state if it's state changed
  tiles.forEach(element => {
    if (element.nextState != element.alive)
      element.applyState();
  });
}

// Placing and removing tiles
function mousePressed () {
  if (mouseButton != LEFT) return true;   // Only allow left clicking

  // Convert canvas pos to grid pos
  let x = floor(mouseX / gridSize) - margin;
  let y = floor(mouseY / gridSize) - margin;

  // Swap the state of the tile that is clicked
  tiles.forEach(element => {
    if (element.x == x && element.y == y) {   // Check if mouse pos matches one of the tile's pos
      element.setState(!element.alive);
    }
  });
  return false;
}

// Create the grid
function generateField() {
  createCanvas(1200, 600);

  background(60);
  stroke(0, 0, 0);
  strokeWeight(gridSize / 25);

  // Calc grid dimensions
  gridW = (width / gridSize) - margin;
  gridH = (height / gridSize) - margin;

  // Loop through the grid and create the tiles
  // Also adds the tiles to the tiles Array
  tiles = [];
  for (let y = margin; y < gridH; y++) {
      for (let x = margin; x < gridW; x++) {
          tiles.push(new Tile(x, y));
      }
  }

  getTileNeighbors();
}

// Get the neighbors for each tile
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

        // Calculate the index of the neighbor (x + width * y)
        let index = xOffPos + yOffPos * gridW;

        // Push the neighbors into an Array for the tile
        if (!samePos) tile.neighbors.push(tiles[index]);
      }
    }
  });
}

// Toggle simulating and redraw tiles
function toggleSim() {
  simulating = !simulating;
  let colMult = simulating? 4 : 1;
  background(50 * colMult);
  tiles.forEach(element => {
    element.draw();
  });
}

// Steps each tile
function stepSim() {
  tiles.forEach(element => {
    element.aiStep();
  });
}

// Set each tile's state to dead
function clearGrid() {
  tiles.forEach(element => {
      element.setState(false);
  });
}

// Set each tile to randomly dead or alive
function genRandomTiles () {
  tiles.forEach(element => {
      element.nextState = round(random()) == 1;
  });
}

// Set the size of the tiles
function setTileSize () {
  gridSize = parseInt(tileSizeInput.value());
  generateField();
}