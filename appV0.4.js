// 1.11.20 
// пробуем избавлятся от повторов случайных чисел

let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

canvas.height = 800;
canvas.width = 800;
canvas.style = 'background:silver';
document.body.appendChild(canvas);

let mainIndex = 0;
let strings = 40;
let columns = 40;
let x = 0;
let y = 0;
let step = 2;
let sizeX = (canvas.width / columns)-step;
let sizeY = (canvas.height / strings)-step;
let stepsNumber = 0;

function rand(n) {   
    let rand = Math.random() * n;
    return Math.floor(rand);
  }

  class Cell {
    constructor(index, x, y, sizeX, sizeY, step, color, right, bottom, visit){
        this.index = index;
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.step = step;
        this.color = color;
        this.right = right;
        this.bottom = bottom;
        this.visit = visit;
        this.oldIndex = index - 1;    
        this.move = ['up', 'down', 'left', 'right'];    
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);  
        if (this.right == false){
            ctx.fillRect(this.x + this.sizeX , this.y, this.step , this.sizeY);
        }  
        if (this.bottom == false){
            ctx.fillRect(this.x, this.y + this.sizeY , this.sizeX, this.step );
        } 
    }
}

// заполняем массив клетками
cellsArr = [];
for (let i = 0; i < strings; i++){
    for (let j = 0; j < columns; j++){
        cellsArr.push(new Cell(i, (x+sizeX+step)*j, (y+sizeY+step)*i, sizeX, sizeY, step, 'olive', true, true, false))        
    }
}

function mainDraw(){
    if (mainIndex < 0){
        console.log('всё', stepsNumber);

    }else{
       
        cellParametrs(mainIndex);
        worm();
        cellsArr[mainIndex].color = 'red';
        for (let i = 0; i < cellsArr.length; i++){             
            cellsArr[i].draw();             
        }
        stepsNumber++;
    }
}    

    setInterval(mainDraw, 1);

function worm(){
    cellsArr[mainIndex].visit = true;
    cellsArr[mainIndex].color = 'black';    
    let rnd = rand(cellsArr[mainIndex].move.length);

    if (cellsArr[mainIndex].move[rnd] == 'left'){
        cellsArr[mainIndex-1].right = false;
        cellsArr[mainIndex-1].oldIndex = mainIndex;
        mainIndex -= 1;  
        return;  
    }
    if (cellsArr[mainIndex].move[rnd] == 'right'){
        cellsArr[mainIndex].right = false;
        cellsArr[mainIndex+1].oldIndex = mainIndex;
        mainIndex += 1;
        return;
    }
    if (cellsArr[mainIndex].move[rnd] == 'up'){
        cellsArr[mainIndex - columns].bottom = false;
        cellsArr[mainIndex - columns].oldIndex = mainIndex;
        mainIndex -= columns;  
        return;  
    }
    if (cellsArr[mainIndex].move[rnd] == 'down'){
        cellsArr[mainIndex].bottom = false;
        cellsArr[mainIndex + columns].oldIndex = mainIndex;
        mainIndex += columns;
        return;
    }
    if (cellsArr[mainIndex].move.length == 0){
        mainIndex = cellsArr[mainIndex].oldIndex;
        return;
    }
   

    // if (rnd == 0 && cellsArr[mainIndex].neighbour.left == false && cellsArr[mainIndex-1].visit == false){        
    //     cellsArr[mainIndex].neighbour.left = true;   
    //     cellsArr[mainIndex-1].visit = true;     
    //     cellsArr[mainIndex-1].right = false;
    //     cellsArr[mainIndex-1].oldIndex = mainIndex;
    //     mainIndex -= 1;  
    //     return;  
    // }
    // if (rnd == 2 && cellsArr[mainIndex].neighbour.right == false && cellsArr[mainIndex+1].visit == false){       
    //     cellsArr[mainIndex].neighbour.right = true;
    //     cellsArr[mainIndex+1].visit = true;
    //     cellsArr[mainIndex].right = false;
    //     cellsArr[mainIndex+1].oldIndex = mainIndex;
    //     mainIndex += 1;
    //     return;
    // }
    // if (rnd == 1 && cellsArr[mainIndex].neighbour.up == false && cellsArr[mainIndex - columns].visit == false){       
    //     cellsArr[mainIndex].neighbour.up = true;
    //     cellsArr[mainIndex - columns].visit = true;
    //     cellsArr[mainIndex - columns].bottom = false;
    //     cellsArr[mainIndex - columns].oldIndex = mainIndex;
    //     mainIndex -= columns;  
    //     return;
    // }
    // if (rnd == 3 && cellsArr[mainIndex].neighbour.down == false && cellsArr[mainIndex + columns].visit == false){       
    //     cellsArr[mainIndex].neighbour.down = true;
    //     cellsArr[mainIndex + columns].visit = true;
    //     cellsArr[mainIndex].bottom = false;
    //     cellsArr[mainIndex + columns].oldIndex = mainIndex;
    //     mainIndex += columns; 
    //     return;
    // }     
    // if(cellsArr[mainIndex].neighbour.left == true &&
    //     cellsArr[mainIndex].neighbour.right == true &&
    //     cellsArr[mainIndex].neighbour.up == true &&
    //     cellsArr[mainIndex].neighbour.down == true){
    //         console.log('ok');
    //         mainIndex = cellsArr[mainIndex].oldIndex;
    // }
    // cellsArr[mainIndex].color = 'red';         
}

function cellParametrs(cellIndex){
    if (cellIndex/columns == Math.floor(cellIndex/columns) || cellsArr[cellIndex-1].visit == true){
        for (let i = 0; i < cellsArr[cellIndex].move.length; i++){
            if (cellsArr[cellIndex].move[i] == 'left'){
                cellsArr[cellIndex].move.splice(i, 1);
            }
        }       
    }
    if ((cellIndex+1)/columns == Math.floor((cellIndex+1)/columns) || cellsArr[cellIndex+1].visit == true){
        for (let i = 0; i < cellsArr[cellIndex].move.length; i++){
            if (cellsArr[cellIndex].move[i] == 'right'){
                cellsArr[cellIndex].move.splice(i, 1);
            }
        }           
    }
    if (cellIndex < columns || cellsArr[cellIndex-columns].visit == true){
        for (let i = 0; i < cellsArr[cellIndex].move.length; i++){
            if (cellsArr[cellIndex].move[i] == 'up'){
                cellsArr[cellIndex].move.splice(i, 1);
            }
        }  
    }  
    if (cellIndex + 1 > (columns * strings) - columns || cellsArr[cellIndex+columns].visit == true){
        for (let i = 0; i < cellsArr[cellIndex].move.length; i++){
            if (cellsArr[cellIndex].move[i] == 'down'){
                cellsArr[cellIndex].move.splice(i, 1);
            }
        }  
    } 
}

