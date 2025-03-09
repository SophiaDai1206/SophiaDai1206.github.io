let cells = [];
let running = false;

class Cell{

    constructor(x, y, ctx, alive = false){
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.alive = alive;
        this.neighbors = 0;
    }


    AfterClick(clickX, clickY){
        this.alive = !this.alive;
        console.log(this.alive);
        this.select(); 
        return this.alive;
    }

    select() {
        this.ctx.fillStyle = this.alive ? "black" : "white";
        console.log(this.ctx.fillStyle);
        this.ctx.fillRect(this.x,Math.abs(400-this.y)-20, 20, 20);
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(this.x,Math.abs(400-this.y)-20, 20, 20);
    } 

    undraw(){
        this.ctx.fillStyle = "white";
        console.log(this.ctx.fillStyle);
        this.ctx.fillRect(this.x,Math.abs(400-this.y)-20, 20, 20);
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(this.x,Math.abs(400-this.y)-20, 20, 20);
    }
    draw(){
        this.ctx.fillStyle = "black";
        console.log(this.ctx.fillStyle);
        this.ctx.fillRect(this.x,Math.abs(400-this.y)-20, 20, 20);
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(this.x,Math.abs(400-this.y)-20, 20, 20);
    }

    countNeighbors(){
        let clickedCells = [];
        for (let k = 0; k<cells.length ;k++){
            if (cells[k].x == this.x - 20 && cells[k].y == this.y-20 ||
            cells[k].x == this.x && cells[k].y == this.y-20||
            cells[k].x == this.x + 20 && cells[k].y == this.y-20 ||
            cells[k].x == this.x-20 && cells[k].y == this.y ||
            cells[k].x == this.x + 20 && cells[k].y == this.y ||
            cells[k].x == this.x - 20 && cells[k].y == this.y+20 ||
            cells[k].x == this.x && cells[k].y == this.y+20 ||
            cells[k].x == this.x + 20 && cells[k].y == this.y+20){
                if (cells[k].alive ===true){
                    clickedCells.push(cells[k]);
                }
            }
        }
        console.log(clickedCells);
        return clickedCells.length;
    }

}
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, -1, 0, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x += 20) {  
        for (let y = 0; y < canvas.height; y += 20) { 
            let cell = new Cell(x, y, ctx, false);
            cells.push(cell);
            ctx.strokeRect(x, y, 20, 20); 
        }
    }
    console.log(cells.length);
    
    ctx.fillRect((2-1)*20, (3-1)*20,20,20);
    ctx.fillRect((3-1)*20, (4-1)*20,20,20);

    canvas.addEventListener("click", function (event) {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        console.log(clickX);
        console.log(clickY);

        let clickedCell = cells.find(cell => 
            clickX >= cell.x && clickX < cell.x + 20 &&
            clickY >= cell.y && clickY < cell.y + 20
        );
        if (clickedCell) {
            clickedCell.AfterClick(clickX, clickY); 
            let neighborsCount = clickedCell.countNeighbors(); 
            console.log(`Clicked Cell: (${clickedCell.x}, ${clickedCell.y}), Neighbors Alive: ${neighborsCount}`);
        }

    });
    
});

document.getElementById("startButton").addEventListener("click", function () {
    running = !running;
    if (running) {
        this.textContent = "Stop";
        gameLoop();
    } else {
        this.textContent = "Start";
    }
});

function gameLoop() {
    if (!running) return;
    let newStates = cells.map((cell) => {
        let neighbors = cell.countNeighbors();
        if (cell.alive) {
            return neighbors === 2 || neighbors === 3;
        } else {
            return neighbors === 3;
        }
    });

    cells.forEach((cell, index) => {
        cell.alive = newStates[index];
        if (cell.alive) {
            cell.draw();
        } else {
            cell.undraw();
        }
    });

    setTimeout(gameLoop, 500);
}


