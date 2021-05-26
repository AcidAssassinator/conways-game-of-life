class Tile {

    // Called on object creation
    constructor (x, y) {
        // Positions
        this.x = x;
        this.y = y;
        this.canvX = gridSize + (x * gridSize);
        this.canvY = gridSize + (y * gridSize);

        // Current state and Next State
        this.alive = false;
        this.nextState = false;

        // Array of neighbors and how many neighbors are alive
        this.neighbors = [];
        this.aliveNeighbors = 0;

        // Step, then draw
        this.step();
        this.draw();
    }

    // Draw the tile
    draw() {
        // Set the color based on tile's state
        let color = this.alive? 220 : 25;
        fill(color, color, color)

        // Make the rectangle
        rect(this.canvX, this.canvY, gridSize, gridSize);
    }

    // Called every frame
    step() {
        // Progress ai every 5 frames
        if (frameCount % 5 == 0 && simulating) this.aiStep();
    }

    // Called every 5 frames
    aiStep() {
        // Set the alive neighbors variable
        this.aliveNeighbors = this.getAliveNeighbors();

        // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
        // Any live cell with two or three live neighbours lives on to the next generation.
        // Any live cell with more than three live neighbours dies, as if by overpopulation.
        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        // -Wikipedia
        if (this.alive) {
            if (this.aliveNeighbors < 2 || this.aliveNeighbors > 3) this.setState(false);
        } else {
            if (this.aliveNeighbors == 3) this.setState(true);
        }
    }

    // get the number of neighbors that are alive
    getAliveNeighbors() {
        // Filter through the neighbor Array, and make a new array from only alive neighbors
        // Then return the length of that new Array
        return this.neighbors.filter(element => {return element.alive;}).length;
    }

    // Set the next state of the tile
    setState(state) {
        this.nextState = state;
    }

    // Move the state from the future state to the current state. Then redraw the tile.
    // The current state and future state are seperated so the logic works without worrying about state changes mid calculation.
    applyState() {
        this.alive = this.nextState;
        this.draw();
    }
}