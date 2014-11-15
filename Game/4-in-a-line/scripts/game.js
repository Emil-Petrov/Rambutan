var canvas,
    ctx,
    cWidth,
    cHeight,
    gameStart,
    player,
    turn,
    board,
    chipsPlaced,
    mouseX,
    mouseY;


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

    placePool();
}
function placePool(){
    if (player.x >= 0 && player.x <= 52) { //1
        markSpot(-1);
    }else if (player.x >= 53 && player.x <= 108){ //2
        markSpot(55);
    }else if (player.x >= 109 && player.x <= 164){ //3
        markSpot(111);
    }else if (player.x >= 165 && player.x <= 220) { //4
        markSpot(167);
    }else if (player.x >= 221 && player.x <= 275) { //5
        markSpot(223);
    }else if (player.x >= 270 && player.x <= 332) { //6
        markSpot(279);
    }else if (player.x >= 333 && player.x <= 388) { //7
        markSpot(335);
    }else if (player.x >= 389 && player.x <= 443) { //8
        markSpot(391);
    }else if (player.x >= 444 && player.x <= 501) { //9
        markSpot(447);
    }else if (player.x >= 502 && player.x <= 555) { //10
        markSpot(503);
    }
    function markSpot(a){
        ctx.strokeRect(a+1,1,50,49);
        if (turn == 1) {
            ctx.fillStyle = player.p1color;
            ctx.fillRect(a+6, 5, 40, 40);
        } else if (turn == 2) {
            ctx.beginPath();
            ctx.fillStyle = player.p2color;
            ctx.arc(a+26, 25, 40 / 2, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
        }
    }
    addEventListener('mousedown',drop);

    function drop(){
        if (player.x >= 0 && player.x <= 52) { //1
            board(1,chipsPlaced);
        }else if (player.x >= 53 && player.x <= 108){ //2
            board(2,chipsPlaced);
        }else if (player.x >= 109 && player.x <= 164){ //3
            board(3,chipsPlaced);
        }else if (player.x >= 165 && player.x <= 220) { //4
            board(4,chipsPlaced);
        }else if (player.x >= 221 && player.x <= 275) { //5
            board(5,chipsPlaced);
        }else if (player.x >= 270 && player.x <= 332) { //6
            board(6,chipsPlaced);
        }else if (player.x >= 333 && player.x <= 388) { //7
            board(7,chipsPlaced);
        }else if (player.x >= 389 && player.x <= 443) { //8
            board(8,chipsPlaced);
        }else if (player.x >= 444 && player.x <= 501) { //9
            board(9,chipsPlaced);
        }else if (player.x >= 502 && player.x <= 555) { //10
            board(10,chipsPlaced);

        }
    }
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

function Player(){
    this.x = mouseX;
    this.y = mouseY;

    this.width = 40;
    this.height = 40;
    this.p1color = '#000eff';
    this.p2color = '#ffe000';
    this.draw = function(){
        if (turn==1){ //player 1 turn;
            ctx.fillStyle = this.p1color; //player 1 color
            ctx.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        }
        else if (turn==2){ //player 2 turn;
            ctx.beginPath();
            ctx.fillStyle = this.p2color; //player 2 color
            ctx.arc(this.x, this.y, this.width/2, 0,2*Math.PI, false);
            ctx.fill();
            ctx.closePath();
        }
    }
}
function Board(col, chipsPlaced){
    this.row = 1;
    this.col = col-1;
    //if the row/col combo is occupied look to place pool in higher row.
    if (chipsPlaced[this.row[this.col]] !=0){
        for (var i = this.row+1; i <= 6; i++) {
            if (i == 6) {
                ctx.font = '40px Arial bold'
                ctx.textAlign = 'start';
                ctx.fillText('This row is full! Pick another.', 0, 370, cWidth);
            } else {
                if (chipsPlaced[i[this.col]] == 0) {
                    this.row = i;
                }
            }
        }
    }else{ //If not #enterTheMatrix
        if (turn==1) {
            chipsPlaced[this.row[this.col]] = 1;
            this.row=1;
        }else if(turn==2){
            chipsPlaced[this.row[this.col]] = 2;
            this.row=1;
        }
    }
}


function clear(){
    ctx.clearRect(0,0,cWidth,cHeight);
}
function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cWidth = canvas.width;
    cHeight = canvas.height;

    chipsPlaced =   {1:[0,0,0,0,0,0,0,0,0,0],
                    2:[0,0,0,0,0,0,0,0,0,0],
                    3:[0,0,0,0,0,0,0,0,0,0],
                    4:[0,0,0,0,0,0,0,0,0,0],
                    5:[0,0,0,0,0,0,0,0,0,0]};

    gameStart = false;

    player = new Player();
    board = new Board();

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