let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;
canvas.style = 'background:#000000';
document.body.appendChild(canvas);

function rand(min, max) {   
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

class Grid {
    constructor(columns, strings, size, step, color){
        this.columns = columns - 1;
        this.strings = strings - 1;        
        this.size = size;
        this.step = step;
        this.color = color;        
        this.arr = [];
    }    
    createArr(){        
        for (let i = 0; i <= this.strings; i++){
            for (let j = 0; j <= this.columns; j++){
                this.arr.push({
                x: (this.size + this.step) * j, 
                y: (this.size + this.step) * i,
                right: true,
                floor: true,  
                visit: false,              
                });
            }
        }    
    };

    draw(){        
        for (let i = 0; i <= this.arr.length-1; i++){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.arr[i].x, this.arr[i].y, this.size, this.size);  
            if (!this.arr[i].right){
                ctx.fillStyle = this.color;
                ctx.fillRect(this.arr[i].x+this.size+1, this.arr[i].y, this.step-2, this.size); 
            }  
            if (!this.arr[i].floor){
                ctx.fillStyle = this.color;
                ctx.fillRect(this.arr[i].x, this.arr[i].y+this.size+1, this.size, this.step-2); 
            }         
        }    
    };
}

let myGrid = new Grid(16, 16, 20, 1, 'pink');
myGrid.createArr();
myGrid.arr[0].visit = true;
myGrid.draw();


let worm = {
    x: 0,
    y: 0,
    size: myGrid.size,
    step: myGrid.step,
    color: 'red',
    path: [],
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);  
    }
}

worm.draw();

function wormDrive(route){
    
    switch(route){
        case 0:                        
        for (let i = 0; i <= myGrid.arr.length-1; i++){                
            if ((myGrid.arr[i].x == worm.x - worm.size - worm.step) && (myGrid.arr[i].y == worm.y)){
                if (myGrid.arr[i].visit == false){
                    worm.path.push({x: worm.x, y: worm.y});
                    
                    myGrid.arr[i].right = false;
                    myGrid.arr[i].visit = true;
                    worm.x -= worm.size + worm.step;                    
                    break;
                }
            }
        }  break;

        case 1:    
        for (let i = 0; i <= myGrid.arr.length-1; i++){
            if ((myGrid.arr[i].x == worm.x) && (myGrid.arr[i].y == worm.y - worm.size - worm.step)){
                if (myGrid.arr[i].visit == false){
                    worm.path.push({x: worm.x, y: worm.y});
                    
                    myGrid.arr[i].floor = false;
                    myGrid.arr[i].visit = true;
                    worm.y -= worm.size + worm.step;                    
                    break;
                }                    
            }
        } break;
        case 2:
        for (let i = 0; i <= myGrid.arr.length-1; i++){
            if ((myGrid.arr[i].x == worm.x + worm.size + worm.step) && (myGrid.arr[i].y == worm.y)){
                if (myGrid.arr[i].visit == false){
                worm.path.push({x: worm.x, y: worm.y});
               
                myGrid.arr[i-1].right = false;
                myGrid.arr[i].visit = true;
                worm.x += worm.size + worm.step;                
                break;
                }
            }
        }   break;          
        case 3:     
        for (let i = 0; i <= myGrid.arr.length-1; i++){
            if ((myGrid.arr[i].x == worm.x) && (myGrid.arr[i].y == worm.y + worm.size + worm.step)){
                if (myGrid.arr[i].visit == false){
                    worm.path.push({x: worm.x, y: worm.y});
                   
                    myGrid.arr[i-myGrid.columns-1].floor = false;
                    myGrid.arr[i].visit = true;
                    worm.y += worm.size + worm.step;                   
                    break;
                }
            }
        }    break;
    } 

    myGrid.draw();
    worm.draw();

    console.log(worm.path[worm.path.length-2], worm.path[worm.path.length-1], worm.path.length, bob);

        // worm.x = worm.path[worm.path.length-1].x;
        // worm.y = worm.path[worm.path.length-1].y;
        // worm.path.pop();

        

        
}



function keyMovePlayer(e){	
	switch (e.keyCode) {
		case 37:
			break;
		case 38:
			break;	
        case 39:    
            function move(){       
                let k = rand(0,3);                
                if ((worm.x == 0) && (k == 0)){
                    move();                    
                } else if ((worm.y == 0) && (k == 1)){
                    move();
                } else if ((worm.x ==  myGrid.arr[myGrid.arr.length - 1].x) && (k == 2)){
                    move();
                } else if ((worm.y ==  myGrid.arr[myGrid.arr.length - 1].y) && (k == 3)){
                    move();
                } else{
                wormDrive(k)};
            }   
            move();         
                break;
                case 40:
                    break;	
	}		
}
document.addEventListener('keydown', keyMovePlayer);
