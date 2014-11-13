var canvas,
    ctx,
    cWidth,
    cHeight,
    gameStart,
    player,
    turn,
    mouseX,
    mouseY;



function Player(){
    this.x = mouseX;
    this.y = mouseY;

    this.width = 40;
    this.height = 40;
    this.draw = function(){
        if (turn==1){ //player 1 turn;
            ctx.fillStyle = '#000eff'; //player 1 color
            ctx.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        }
        else if (turn==2){ //player 2 turn;
            ctx.beginPath();
            ctx.fillStyle = '#ffe000'; //player 2 color
            ctx.arc(this.x, this.y, this.width/2, 0,2*Math.PI, false);
            ctx.fill();
            ctx.closePath();
        }
    }
}


function draw(){

    ctx.save();
    clear();

    drawBoard();
    player.draw();
    ctx.restore;
    window.requestAnimationFrame(draw);

}

function drawHead(){
    this.x = 0;
    this.y = 0;
    this.width = cWidth;
    this.height = 50;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
}
function mainBoard(){
    for (var row = 0; row < 5; row++) {
        for (var col = 0; col < 10; col++) {
            ctx.strokeRect(56 * col, 55 + 56 * row, 50, 50);
        }
    }
}
function drawFoot(){
    ctx.strokeRect(0,335, cWidth,50);

    if (!gameStart){
        ctx.fillStyle = 'black';
        ctx.font = '40px Arial bold'
        ctx.textAlign = 'start';
        ctx.textBaseline = 'middle';
        ctx.fillText('Click to start',0,370,cWidth);
    }
    else{
        if(turn==1){
            ctx.font = '40px Arial bold'
            ctx.textAlign = 'start';
            ctx.fillText('It`s Player 1`s turn',0,370,cWidth);
        }
        else if (turn==2){
            ctx.font = '40px Arial bold'
            ctx.textAlign = 'start';
            ctx.fillText('It`s Player 2`s turn',0,370,cWidth);
        }
    }
}
function drawBoard(){
    ctx.strokeStyle = '#000112';
    drawHead();
    mainBoard();
    drawFoot();
}

function clear(){
    ctx.clearRect(0,0,cWidth,cHeight);
}

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cWidth = canvas.width;
    cHeight = canvas.height;

    gameStart = false;

    player = new Player();

    document.addEventListener('mousemove',function(){ //get mouse position

        mouseX = event.clientX-canvas.offsetLeft;
        mouseY = event.clientY-canvas.offsetTop;

        player.x = mouseX;
        player.y = mouseY;
    })
    document.addEventListener('mousedown',function(){
        gameStart = true;
        if(turn==1){
            turn=2;
        }
        else{
            turn=1;
        }
    })

    draw();

}

window.addEventListener('load',init);