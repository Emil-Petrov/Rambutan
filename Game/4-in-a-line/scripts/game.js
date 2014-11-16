var canvas,
    ctx,
    cWidth,
    cHeight,
    gameStart,
    player,
    turn,
    chipsPlaced,
    startRow,
    mouseX,
    mouseY;


function draw(){ //Everything on screen is drawn here.

    ctx.save();
    clear();
    drawBoard();
    player.draw();
    ctx.restore;
    window.requestAnimationFrame(draw);
}
function drawBoard(){
    ctx.strokeStyle = '#000112';
    drawHead();
    mainBoard();
    drawFoot();


    function drawHead(){ //The top part of the board.
        ctx.strokeRect(0, 0, cWidth, 50);
        markSpot(); //Marks where player will take turn.

        function markSpot(){ //Marks where player will take his turn..
            if (player.x >= 0 && player.x <= 52) { //1
                placeMark(-1);
            }else if (player.x >= 53 && player.x <= 108){ //2
                placeMark(55);
            }else if (player.x >= 109 && player.x <= 164){ //3
                placeMark(111);
            }else if (player.x >= 165 && player.x <= 220) { //4
                placeMark(167);
            }else if (player.x >= 221 && player.x <= 275) { //5
                placeMark(223);
            }else if (player.x >= 270 && player.x <= 332) { //6
                placeMark(279);
            }else if (player.x >= 333 && player.x <= 388) { //7
                placeMark(335);
            }else if (player.x >= 389 && player.x <= 443) { //8
                placeMark(391);
            }else if (player.x >= 444 && player.x <= 501) { //9
                placeMark(447);
            }else if (player.x >= 502 && player.x <= 555) { //10
                placeMark(503);
            }
            function placeMark(a){ //Fills the above marked spot based on player.
                ctx.strokeRect(a+1,1,50,49);
                if (turn == 1) { //Draws a square.
                    ctx.fillStyle = player.p1color;
                    ctx.fillRect(a+6, 5, 40, 40);
                } else if (turn == 2) { //Draws a circle.
                    ctx.beginPath();
                    ctx.fillStyle = player.p2color;
                    ctx.arc(a+26, 25, 40 / 2, 0, 2 * Math.PI, false);
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    function mainBoard(){ //Draws grid in the middle of the screen. If you want you can delete it and draw whatever you want...
        for (var row = 0; row < 5; row++) {
            for (var col = 0; col < 10; col++) {
                ctx.strokeRect(56 * col, 55 + 56 * row, 50, 50);
            }
        }
    }
    function drawFoot(){ //Used for info display.
        ctx.strokeRect(0,335, cWidth,50);

        if (!gameStart){
            ctx.fillStyle = 'black';
            ctx.font = '40px Arial bold'
            //ctx.textAlign = 'start'; //Aligns text at the bottom looks ugly as fk -.-
            //ctx.textBaseline = 'middle';
            ctx.fillText('Click to start',0,370,cWidth);
        }
        else{
            if(turn==1){ //Somehow takes into account player color and uses it.
                ctx.font = '40px Arial bold'
                //ctx.textAlign = 'start';
                ctx.fillText('It`s Player 1`s turn',0,370,cWidth);
            }
            else if (turn==2){ //Somehow takes into account player color and uses it.
                ctx.font = '40px Arial bold'
                //ctx.textAlign = 'start';
                ctx.fillText('It`s Player 2`s turn',0,370,cWidth);
            }else{
                ctx.font = '40px Arial bold'
                //ctx.textAlign = 'start';
                ctx.fillText('Click inside the game to start.',0,370,cWidth);
            }
        }
    }
}
function drop(){
    //If you click between x and x and you drop a chip at N col at the lowest free row.
    if (player.x >= 0 && player.x <= 52) { //1
        placeChip(1);
    }else if (player.x >= 53 && player.x <= 108){ //2
        placeChip(2);
    }else if (player.x >= 109 && player.x <= 164){ //3
        placeChip(3);
    }else if (player.x >= 165 && player.x <= 220) { //4
        placeChip(4);
    }else if (player.x >= 221 && player.x <= 275) { //5
        placeChip(5);
    }else if (player.x >= 270 && player.x <= 332) { //6
        placeChip(6);
    }else if (player.x >= 333 && player.x <= 388) { //7
        placeChip(7);
    }else if (player.x >= 389 && player.x <= 443) { //8
        placeChip(8);
    }else if (player.x >= 444 && player.x <= 501) { //9
        placeChip(9);
    }else if (player.x >= 502 && player.x <= 555) { //10
        placeChip(10);
    }

    //Adds chips to the matrix and prevents the player from placing chips
    function placeChip (col){
        if (chipsPlaced[4][col-1]!=0){ //prevents overflow in rows.

            //Can add text here. If u want.

        }else {
            while (chipsPlaced[startRow][col - 1] != 0 && startRow < 6) { //Looks for an empty column in current row.
                startRow++;
            }
            if (startRow == 5) { //If all columns are full resets the counter for future use.
                startRow = 0;
            } else { //If column is empty it adds a chip to the corresponding place in the matrix defined in the init function.
                if (turn == 1) { //If it's player 1's turn it places a 1 in matrix.
                    chipsPlaced[startRow][col - 1] = turn;
                    startRow = 0;
                }
                else { //If it's player 2's turn it places a 2 in matrix.
                    chipsPlaced[startRow][col - 1] = turn;
                    startRow = 0;
                }
            }
            //Swaps turns.
            if(turn==1){
                turn=2;
            }
            else{
                turn=1;
            }
        }

    }

}
function clear(){
    ctx.clearRect(0,0,cWidth,cHeight);
}
function Player(){ //New player thingy.
    this.x = mouseX;
    this.y = mouseY;

    this.width = 40;
    this.height = 40;
    this.p1color = '#000eff';
    this.p2color = '#ffe000';
    this.draw = function(){ //Draws circle/square at mouse cursor.
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
function init(){ //Everything is initialised here.
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cWidth = canvas.width;
    cHeight = canvas.height;


    startRow = 0; //used for calculating the rows. Don't touch.

    chipsPlaced =   [[0,0,0,0,0,0,0,0,0,0], //The board represented in a matrix. If player 1 places a chip 0 turns into a 1 if player 2 places a chip 0 turns into a 2.
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0]];

    gameStart = false; //Used for "Click to start game" msg at start of game.

    player = new Player(); //Initialise the player.

    document.addEventListener('mousemove',function(){ //Used to get mouse position and set "player" position at cursor.
        mouseX = event.clientX-canvas.offsetLeft;
        mouseY = event.clientY-canvas.offsetTop;

        player.x = mouseX;
        player.y = mouseY;
    });
    document.addEventListener('mousedown',function(){ //Starts game on click.
        gameStart = true;
    });
    document.addEventListener('mousedown',drop); //Calls drop function on mouse click.
    draw(); //Calls draw method.
}


window.addEventListener('load',init); //Starts everything




//function how2win(){ //Not implemented yet. Can remove if you want. Not even sure if it works.
//    for (var row = 0; row < 5; row++){
//        for (var col = 3; col < 7; col++){
//            if (check(row,col)){
//                if (turn == 1){
//                    //Player 1 wins hurr durr.
//                }else{
//                    //Player 2 wins hurr durr.
//                }
//            }
//        }
//    }
//    function check (row,col){
//        var colWin = chipsPlaced[row][col] == chipsPlaced[row][col+1] &&
//            chipsPlaced[row][col] == chipsPlaced[row][col+2] &&
//            chipsPlaced[row][col] == chipsPlaced[row][col+3];
//        if (row>=3){
//            var rowWin = chipsPlaced[row][col] == chipsPlaced[row-1][col] &&
//                chipsPlaced[row][col] == chipsPlaced[row-2][col] &&
//                chipsPlaced[row][col] == chipsPlaced[row-3][col];
//            var drWin = chipsPlaced[row][col] == chipsPlaced[row+1][col+1] &&
//                chipsPlaced[row][col] == chipsPlaced[row+2][col+2] &&
//                chipsPlaced[row][col] == chipsPlaced[row+3][col+3];
//            var dlWin = chipsPlaced[row][col] == chipsPlaced[row-1][col-1] &&
//                chipsPlaced[row][col] == chipsPlaced[row-2][col-2] &&
//                chipsPlaced[row][col] == chipsPlaced[row-3][col-3];
//        }
//        return !!(colWin || rowWin || drWin || dlWin)
//    }
//}
