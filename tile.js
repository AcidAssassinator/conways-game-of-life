class Tile {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.canvX = (x + margin / 2) * gridSize;
        this.canvY = (y + margin / 2) * gridSize;

        this.alive = false;
        this.nextState = false;

        this.neighbors = [];
        this.aliveNeighbors = 0;

        this.step();
        this.draw();
    }

    draw() {
        // Color based on tile's state
        let color = this.alive? 220 : 25;
        fill(color, color, color)
        rect(this.canvX, this.canvY, gridSize, gridSize);
    }

    step() {
        // Just some array black magic
        this.aliveNeighbors = this.neighbors.filter(element => {return element.alive;}).length;

        /*  Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            Any live cell with two or three live neighbours lives on to the next generation.
            Any live cell with more than three live neighbours dies, as if by overpopulation.
            Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                -Wikipedia  */
        if (this.alive) {
            if (this.aliveNeighbors < 2 || this.aliveNeighbors > 3) this.setState(false);
        } else {
            if (this.aliveNeighbors == 3) this.setState(true);
        }
    }

    // The current state and future state are seperated so the logic works without worrying about state changes mid calculation.
    setState(state) {
        this.nextState = state;
    }

    applyState() {
        this.alive = this.nextState;
        this.draw();
    }
}