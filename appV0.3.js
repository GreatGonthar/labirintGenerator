let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 960;
canvas.height = 720;
canvas.style = 'background:silver';
document.body.appendChild(canvas);

let strings = 10;
let columns = 10;
let x = 0;
let y = 0;
let size = 20;
let step = 4;

function rand(n) {   
    let rand = Math.random() * n;
    return Math.floor(rand);
  }

  class Cell {
    constructor(index, x, y, size, step, color, right, bottom, visit){
        this.index = index;
        this.x = x;
        this.y = y;
        this.size = size;
        this.step = step;
        this.color = color;
        this.right = right;
        this.bottom = bottom;
        this.visit = visit;
        this.oldIndex = index - 1;    
        this.neighbour = {
            left: false,
            right: false,
            up: false,
            down: false,};    
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);  
        if (this.right == false){
            ctx.fillRect(this.x + this.size , this.y, this.step , this.size);
        }  
        if (this.bottom == false){
            ctx.fillRect(this.x, this.y + this.size , this.size, this.step );
        }  
        // if (this.visit == true){
        //     ctx.fillStyle = 'green';
        //     ctx.fillRect(this.x, this.y, this.size, this.size);  
        // }          
    }
}

cellsArr = [];
for (let i = 0; i < strings; i++){
    for (let j = 0; j < columns; j++){
        cellsArr.push(new Cell(i, (x+size+step)*j, (y+size+step)*i, size, step, 'olive', true, true, false))        
    }
}
// cellsArr[45].visit = true;
for (let i = 0; i < cellsArr.length; i++){       
    cellsArr[i].draw();   
}

for (let i = 0; i < cellsArr.length; i++){      
    cellParametrs(i);
}
// начали писать главную функцию
function worm(cellIndex){
    if (rand(3) == 0 && cellsArr[cellIndex].neighbour.left == false){
        cellsArr[cellIndex].visit = true;
        cellsArr[cellIndex].neighbour.left = true;
        cellsArr[cellIndex-1].right = false;
        worm(cellIndex-1);        
    }
}

function cellParametrs(cellIndex){
    if (cellIndex/columns == Math.floor(cellIndex/columns) || cellsArr[cellIndex-1].visit == true){
        cellsArr[cellIndex].color = 'red';
        cellsArr[cellIndex].neighbour.left = true;
        cellsArr[cellIndex].draw();
    }
    if ((cellIndex+1)/columns == Math.floor((cellIndex+1)/columns) || cellsArr[cellIndex+1].visit == true){
        cellsArr[cellIndex].color = 'green';
        cellsArr[cellIndex].neighbour.right = true;
        cellsArr[cellIndex].draw();  
    }
    if (cellIndex < columns || cellsArr[cellIndex-columns].visit == true){
        cellsArr[cellIndex].color = 'purple';
        cellsArr[cellIndex].neighbour.up = true;
        cellsArr[cellIndex].draw();     
    }  
    if (cellIndex + 1 > (columns * strings) - columns || cellsArr[cellIndex+columns].visit == true){
        cellsArr[cellIndex].color = 'yellow';
        cellsArr[cellIndex].neighbour.down = true;
        cellsArr[cellIndex].draw();  
    } 
    // if (cellsArr[cellIndex-1].visit == true)
}

