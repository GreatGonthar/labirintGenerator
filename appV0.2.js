let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 960;
canvas.height = 720;
canvas.style = 'background:silver';
document.body.appendChild(canvas);

let strings = 15;
let columns = 20;
let index = 0;
let count = 0;

function rand(n) {   
    let rand = Math.random() * n;
    return Math.floor(rand);
  }
requestAnimationFrame(tick);

function tick() {
    worm(rand(4));  
    if (cellsArr[index].oldIndex > -1){
        requestAnimationFrame(function() {setTimeout(tick, 1)});    
    }
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
        let x = 0;
        let y = 0;
        let size = 20;
        let step = 4;
        cellsArr.push(new Cell(i, (x+size+step)*j, (y+size+step)*i, size, step, 'olive', true, true, false))        
    }
}

function worm(nextCell){
        
    if (nextCell == 0 && (index)/columns != Math.floor((index)/columns)){
        cellsArr[index].visit = true;
        if (cellsArr[index-1].visit == true){
            nextCell = 1;  
            count++;
        }else{
            index -= 1;
            cellsArr[index].oldIndex = index + 1;
            cellsArr[index].visit = true;
            cellsArr[index].right = false;              
        }
    }
    if (nextCell == 1 && index >= columns){
        cellsArr[index].visit = true;
        if (cellsArr[index-columns].visit == true){
            nextCell = 2; 
            count++;
        }else{
            index -= columns;
            cellsArr[index].oldIndex = index + columns;
            cellsArr[index].visit = true;
            cellsArr[index].bottom = false;              
        }
    }
    if (nextCell == 2 && (index+1)/columns != Math.floor((index+1)/columns)){
        cellsArr[index].visit = true;
        if (cellsArr[index+1].visit == true){
            nextCell = 3; 
            count++;
        }else{
            cellsArr[index].right = false;
            index += 1;
            cellsArr[index].oldIndex = index - 1;
            cellsArr[index].visit = true;           
        }    
    }
    if (nextCell == 3 && index < (columns * strings) - columns){
        cellsArr[index].visit = true;
        if (cellsArr[index+columns].visit == true){
            nextCell = 0; 
            count++;
        }else{
            cellsArr[index].bottom = false;        
            index += columns;
            cellsArr[index].oldIndex = index - columns;
            cellsArr[index].visit = true;           
        }    
    }
    for (let i = 0; i < cellsArr.length; i++){       
        cellsArr[i].draw();   
        cellsArr[index].color = 'red';        
    }
    cellsArr[index].color = 'black';

    if (count > 5){
            if (index > 0){
                index = cellsArr[index].oldIndex;                
                count = 0;
                worm(rand(4));  
               
        }else{   
            console.log(index);           
        }
    }
    

}

function keyMovePlayer(e){	
	switch (e.keyCode) {
		case 37:
            worm();
			break;
		case 38:
            worm();
			break;	
        case 39:  
        if(index >= 0){          
            worm(rand(4));              
        }
            break;
        case 40:
            worm();
            break;	
	}		
}
document.addEventListener('keydown', keyMovePlayer);