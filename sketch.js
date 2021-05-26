// Global Variables
let margin = 1;
let tiles = []
let gridSize = 12;
let gridW;
let gridH;
let simulating = false;

// Called on page load
function setup () {
  frameRate(60);

  // In it's own function so it can be called from
  // the console without duplicating the buttons
  generateField();

  // Create the buttons
  let startButton = createButton("Toggle Simulation");
  startButton.mousePressed(toggleSim);

  let stepButton = createButton("Step Simulation");
  stepButton.mousePressed(stepSim);

  let clearButton = createButton("Clear Grid");
  clearButton.mousePressed(clearGrid);

  let randomizeButton = createButton("Randomize Tiles");
  randomizeButton.mousePressed(genRandomTiles);
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
  gridW = (width / gridSize) - 2 * margin;
  gridH = (height / gridSize) - 2 * margin;

  // Loop through the grid and create the tiles
  // Also adds the tiles to the tiles Array
  tiles = [];
  for (let y = 0; y < gridH; y++) {
      for (let x = 0; x < gridW; x++) {
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
      element.nextState = floor(random(2)) == 1;
  });
}