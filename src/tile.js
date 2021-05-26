class Tile {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.canvX = gridSize + (x * gridSize);
        this.canvY = gridSize + (y * gridSize);
        this.alive = false;
        this.nextState = false;
        this.timeAlive = 0;
        this.neighbors = [];
        this.aliveNeighbors = 0;
        this.step();
        this.draw();
    }

    draw() {
        let color = this.alive? 220 : 25;
        //let color = (220) * (this.aliveNeighbors / 4) + 25
        fill(color, color, color)
        rect(this.canvX, this.canvY, gridSize, gridSize);
    }

    step() {
        if (frameCount % 5 == 0 && simulating) this.aiStep();
    }

    aiStep() {
        this.aliveNeighbors = this.getAliveNeighbors();
        if (this.alive) {
            if (this.aliveNeighbors < 2 || this.aliveNeighbors > 3) this.setState(false);
        } else {
            if (this.aliveNeighbors == 3) this.setState(true);
        }
    }

    getAliveNeighbors() {
        return this.neighbors.filter(element => {return element.alive;}).length;
    }

    setState(state) {
        this.nextState = state;
        this.timeAlive = 0;
    }

    applyState() {
        this.alive = this.nextState;
        this.draw();
    }
}