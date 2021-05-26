class Tile {
    constructor (x, y) {
        this.gridX = x;
        this.gridY = y;
        this.canvX = gridSize + (x * gridSize);
        this.canvY = gridSize + (y * gridSize);
        this.alive = false;
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
        
        this.draw();
    }

    setState(state) {
        this.alive = state;
    }
}