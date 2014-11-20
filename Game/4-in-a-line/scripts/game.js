var canvas,
    ctx,
    cWidth,
    cHeight,
    gameStart,
    gameEnd,
    whoWon,
    player,
    score,
    turn,
    chipsPlaced,
    chipsPositionY,
    chipsPositionX,
    startRow,
    mouseX,
    mouseY;


function draw() { //Everything on screen is drawn here.

    ctx.save();
    clear();
    drawBoard();
    player.draw();
    ctx.restore;
    window.requestAnimationFrame(draw);
}
function drawBoard() {
    ctx.strokeStyle = '#000112';
    drawHead();
    mainBoard();
    drawFoot();
    if (gameStart && !gameEnd) {
        drawPlayers();
    }else if (gameEnd && gameStart){ //TODO Make game end screen.
        drawEnd();
    }
    function drawPlayers() {
        for (var row = 0; row < 5; row++) {
            for (var col = 0; col < 10; col++) {
                if (chipsPlaced[row][col]==1) {
                    ctx.fillStyle = player.p1color;
                    ctx.fillRect(chipsPositionX[col]+5, chipsPositionY[row]+5, 40, 40);
                }
                else if (chipsPlaced[row][col] == 2) {
                    ctx.fillStyle = player.p2color;
                    ctx.fillRect(chipsPositionX[col]+5, chipsPositionY[row]+5, 40, 40);
                }
            }
        }
    }

    function drawEnd(){ //End game screen goes here
        ctx.fillStyle = '#000112';
        ctx.fillRect(0, 0, cWidth, cHeight);
        ctx.fillStyle = 'white';
        ctx.font = "40px 'PT Sans',Tahoma,sans-serif";


        ctx.fillText('Click to start new game.', 70, 50, cWidth);

        if(whoWon!='tie'){
            ctx.fillText('Player ' + whoWon + ' wins', 160, 125, cWidth);
        }else{
            ctx.fillText('TIE', 245, 125, cWidth);
        }

        ctx.fillText('Score', 230, 190, cWidth);
        ctx.fillText('Player 1 : Player 2', 110, 250, cWidth);
        ctx.fillText(score[0] +' : '+score[1], 230, 300, cWidth);

        ctx.fillStyle=player.p1color;
        ctx.fillRect(60,215, 40,40);
        ctx.fillStyle=player.p2color;
        ctx.fillRect(445,215, 40,40);
    }

    function drawHead() { //The top part of the board.
        ctx.strokeRect(0, 0, cWidth, 50);
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillRect(1,1, cWidth-2, 48);
            markSpot(); //Marks where player will take turn.

        function markSpot() { //Marks where player will take his turn..
            if (player.x >= 0 && player.x <= 52) { //1
                placeMark(-1);
            } else if (player.x >= 53 && player.x <= 108) { //2
                placeMark(55);
            } else if (player.x >= 109 && player.x <= 164) { //3
                placeMark(111);
            } else if (player.x >= 165 && player.x <= 220) { //4
                placeMark(167);
            } else if (player.x >= 221 && player.x <= 275) { //5
                placeMark(223);
            } else if (player.x >= 270 && player.x <= 332) { //6
                placeMark(279);
            } else if (player.x >= 333 && player.x <= 388) { //7
                placeMark(335);
            } else if (player.x >= 389 && player.x <= 443) { //8
                placeMark(391);
            } else if (player.x >= 444 && player.x <= 501) { //9
                placeMark(447);
            } else if (player.x >= 502 && player.x <= 555) { //10
                placeMark(503);
            }
            function placeMark(a) { //Fills the above marked spot based on player.
                ctx.strokeRect(a + 1, 1, 50, 48);
                if (player.y <= 55) {
                    if (turn == 1) { //Draws a square.
                        ctx.fillStyle = player.p1color;
                        ctx.fillRect(a + 6, 5, 40, 40);
                    } else if (turn == 2) { //Draws a circle.
                        ctx.fillStyle = player.p2color;
                        ctx.fillRect(a + 6, 5, 40, 40);
                    }
                }
            }
        }
    }
    function mainBoard() { //Draws grid in the middle of the screen. If you want you can delete it and draw whatever you want...
        for (var row = 0; row < 5; row++) {
            for (var col = 0; col < 10; col++) {
                ctx.fillStyle = "rgba(255,255,255,0.5)";
                ctx.fillRect(chipsPositionX[col], chipsPositionY[row], 50, 50);
                ctx.fillStyle = "rgba(255,255,255,0.7)";
                ctx.fillRect(chipsPositionX[col]+5, chipsPositionY[row]+5, 40, 40);
                ctx.strokeRect(56 * col, 55 + 56 * row, 50, 50);
            }
        }
    }
    function drawFoot() { //Used for info display.


        ctx.strokeRect(0, 335, cWidth, 50);
        ctx.fillRect(2,337, cWidth-4, 46);
        if(gameEnd){
            ctx.fillStyle = 'black';
            ctx.font = "40px 'PT Sans',Tahoma,sans-serif";
            //ctx.textAlign = 'start'; //Aligns text at the bottom looks ugly as fk -.-
            //ctx.textBaseline = 'middle';
            ctx.fillText('Game Over', 167, 375, cWidth);
        }
        else if (!gameStart && !gameEnd) {
            ctx.fillStyle = 'black';
            ctx.font = "40px 'PT Sans',Tahoma,sans-serif";
            //ctx.textAlign = 'start'; //Aligns text at the bottom looks ugly as fk -.-
            //ctx.textBaseline = 'middle';
            ctx.fillText('Click to start', 167, 375, cWidth);
        }
        else {
            if (turn == 1) {
                ctx.fillStyle = '#000000';
                ctx.font = "40px 'PT Sans',Tahoma,sans-serif bold";
                ctx.fillText('It`s Player 1`s turn', 110, 375, cWidth);
                ctx.fillStyle = player.p1color;
                ctx.fillRect(60,340,40,40);
                ctx.fillRect(470,340,40,40);
                ctx.strokeStyle = '#000000';
                ctx.strokeRect(59,339,42,42);
                ctx.strokeRect(469,339,42,42);
            }
            else if (turn == 2) {
                ctx.fillStyle = '#000000';
                ctx.font = "40px 'PT Sans',Tahoma,sans-serif";
                ctx.fillText('It`s Player 2`s turn', 110, 375, cWidth);
                ctx.fillStyle = player.p2color;
                ctx.fillRect(60,340,40,40);
                ctx.fillRect(470,340,40,40);
                ctx.strokeStyle = '#000000';
                ctx.strokeRect(59,339,42,42);
                ctx.strokeRect(469,339,42,42);
            } else {
                ctx.fillStyle = 'black';
                ctx.font = "40px 'PT Sans',Tahoma,sans-serif";
                ctx.fillText('Click inside the game to start.', 5, 375, cWidth);
            }
        }
    }
}
function boardControl() {
    //If you click between x and x and you drop a chip at N col at the lowest free row.
   if (gameStart){
       if (player.x >= 0 && player.x <= 52) { //1
           placeChip(1);
           winCheck(chipsPlaced);
       } else if (player.x >= 53 && player.x <= 108 && player.y < 385) { //2
           placeChip(2);
           winCheck(chipsPlaced);
       } else if (player.x >= 109 && player.x <= 164 && player.y < 385) { //3
           placeChip(3);
           winCheck(chipsPlaced);
       } else if (player.x >= 165 && player.x <= 220 && player.y < 385) { //4
           placeChip(4);
           winCheck(chipsPlaced);
       } else if (player.x >= 221 && player.x <= 275 && player.y < 385) { //5
           placeChip(5);
           winCheck(chipsPlaced);
       } else if (player.x >= 270 && player.x <= 332 && player.y < 385) { //6
           placeChip(6);
           winCheck(chipsPlaced);
       } else if (player.x >= 333 && player.x <= 388 && player.y < 385) { //7
           placeChip(7);
           winCheck(chipsPlaced);
       } else if (player.x >= 389 && player.x <= 443 && player.y < 385) { //8
           placeChip(8);
           winCheck(chipsPlaced);
       } else if (player.x >= 444 && player.x <= 501 && player.y < 385) { //9
           placeChip(9);
           winCheck(chipsPlaced);
       } else if (player.x >= 502 && player.x <= 555 && player.y < 385) { //10
           placeChip(10);
           winCheck(chipsPlaced);
       }

       //Adds chips to the matrix and prevents the player from placing chips if full
       function placeChip(col) {
           if (chipsPlaced[4][col - 1] != 0) { //prevents overflow in rows.

               //Can add text here. If u want.

           } else {
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
                   else if (turn==2) { //If it's player 2's turn it places a 2 in matrix.
                       chipsPlaced[startRow][col - 1] = turn;
                       startRow = 0;
                   }
                   nextTurn();
               }
           }
       }
   }
    function winCheck(matrice) { //Checks if a player wins the game (there is 4 chips of 1 color in a row)
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 10; j++) {
                check(i, j)
            }
        }
        function check(row, col) {
            //Check for horizontal win
            if (col < 7) {
                if (matrice[row][col] === matrice[row][col + 1] &&
                    matrice[row][col] === matrice[row][col + 2] &&
                    matrice[row][col] === matrice[row][col + 3] &&
                    matrice[row][col] !== 0) {
                    if (matrice[row][col] === 1) {
                        whoWon = 1;
                        score[0]++;
                        EndGame();
                    }
                    else if (matrice[row][col] === 2) {
                        whoWon = 2;
                        score[1]++;
                        EndGame();
                    }
                }
            }
            //Check for vertical win
            if (row < 2) {
                if (matrice[row][col] === matrice[row + 1][col] &&
                    matrice[row][col] === matrice[row + 2][col] &&
                    matrice[row][col] === matrice[row + 3][col] &&
                    matrice[row][col] !== 0) {
                    if (matrice[row][col] === 1) {
                        whoWon = 1;
                        score[0]++;
                        EndGame();
                    }
                    else if (matrice[row][col] === 2) {
                        whoWon = 2;
                        score[1]++;
                        EndGame();
                    }
                }
            }
            //Check for diagonal win
            if (row < 2 && col < 7) {
                if (matrice[row][col] === matrice[row + 1][col + 1] &&
                    matrice[row][col] === matrice[row + 2][col + 2] &&
                    matrice[row][col] === matrice[row + 3][col + 3] &&
                    matrice[row][col] !== 0) {
                    if (matrice[row][j] === 1) {
                        whoWon = 1;
                        score[0]++;
                        EndGame();
                    }
                    else if (matrice[row][j] === 2) {
                        whoWon = 2
                        score[1]++;
                        EndGame();
                    }
                }
            }
            else if (row > 2 && col < 7) {
                if (matrice[row][col] === matrice[row - 1][col + 1] &&
                    matrice[row][col] === matrice[row - 2][col + 2] &&
                    matrice[row][col] === matrice[row - 3][col + 3] &&
                    matrice[row][col] !== 0) {
                    if (matrice[row][col] === 1) {
                        whoWon = 1;
                        score[0]++;
                        EndGame();
                    }
                    else if (matrice[row][col] === 2) {
                        whoWon = 2;
                        score[1]++;
                        EndGame();
                    }
                }
            }
			if (row == 4){
				for(var tieCheck = 0; tieCheck < 10; tieCheck++){
					if (matrice[4][tieCheck]==0){
						return;
					}
				}
				EndGame();
			}
        }
    }
    function nextTurn(){//Swaps turns.
        if (turn == 1) {
            turn = 2;
        }
        else {
            turn = 1;
        }
    }
    function EndGame(){
        gameEnd = true;
        nextTurn();
    }
}
function clear() {
    ctx.clearRect(0, 0, cWidth, cHeight);
}
function Player() { //New player thingy.
    this.x = mouseX;
    this.y = mouseY;

    this.width = 40;
    this.height = 40;
    this.p1color = '#000eff'; //Blue
    this.p2color = '#ffe000'; //Yerrow


    this.draw = function () { //Draws circle/square at mouse cursor.
        if (this.y > 55){
            if (turn == 1) { //player 1 turn;
                ctx.fillStyle = this.p1color; //player 1 color
                ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            }
            else if (turn == 2) { //player 2 turn;
                ctx.fillStyle = this.p2color; //player 1 color
                ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            }
        }
    }
}
function init() { //Everything is initialised here.
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cWidth = canvas.width;
    cHeight = canvas.height;

    whoWon = 'tie';
    startRow = 0; //used for calculating the rows. Don't touch.

    chipsPlaced = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //The board represented in a matrix. If player 1 places a chip 0 turns into a 1 if player 2 places a chip 0 turns into a 2.
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    chipsPositionY = [279, 223, 167, 111, 55];
    chipsPositionX = [0, 56, 112, 168, 224,280,336,392,448,504];

    gameStart = false; //Used for "Click to start game" msg at start of game.
    gameEnd = false; //Used for Game Over Screen
    player = new Player(); //Initialise the player.
    score = [0,0];

    document.addEventListener('mousemove', function () { //Used to get mouse position and set "player" position at cursor.
        mouseX = event.clientX - canvas.offsetLeft;
        mouseY = event.clientY - canvas.offsetTop;

        player.x = mouseX;
        player.y = mouseY;
    });
    document.addEventListener('mousedown', function () { //Starts game on click.
        if(!gameStart && !gameEnd){
            gameStart = true;
            chipsPlaced = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //The board represented in a matrix. If player 1 places a chip 0 turns into a 1 if player 2 places a chip 0 turns into a 2.
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
        }else if(gameEnd && gameEnd){
            gameStart = false;
            gameEnd = false;
            whoWon = 'tie';
        }
    });
    document.addEventListener('mousedown', boardControl); //Calls boardControl function on mouse click.
    draw(); //Calls draw method.
}


window.addEventListener('load', init); //Starts everything
