class Tile {
    constructor (x, y) {
        this.gridX = x;
        this.gridY = y;
        this.canvX = gridSize + (x * gridSize);
        this.canvY = gridSize + (y * gridSize);
        this.alive = false;
        this.neighbors = [];
        this.step();
    }

    draw() {
        let color = this.alive? 220 : 25;
        fill(color, color, color);
        stroke(0, 0, 0);
        strokeWeight(1);
        rect(this.canvX, this.canvY, gridSize, gridSize);
    }

    step() {
        if (frameCount % 5 == 0 && simulating) this.aiStep();
        this.draw();
    }

    aiStep() {
        this.setState();
    }

    getAliveNeighbors() {
        let count = 0;
        this.neighbors.forEach(element => {
            count += element.alive? 1:0;
        });
        return count;
    }

    setState() {
        let aliveNeighbors = this.getAliveNeighbors();
        if (this.alive) {
            if (aliveNeighbors < 2 || aliveNeighbors > 3) this.alive = false;
        } else {
            if (aliveNeighbors == 3) this.alive = true;
        }
    }
}