/*
Here you can find all the 
common functions I have made,that set the game based on the simple rules:

function getRandomNum(n)
function Ball(x,y)
function gameOver()
function setRemovePoint()
function fall()
function checkColor(x,y,c)
function myMouseDown(e)
function myMouseUp(e)
*/

function getRandomNum(n) {
  return Math.floor(Math.random() * n);
}

function Ball(x, y) {
  this.x1 = x;
  this.y1 = y;
  this.x2 = x;
  this.y2 = y;
  this.gapCountY = 0;
  this.gapCountX = 0;
  this.getY = function() {
    return (this.y1 + ((this.y2 - this.y1) * this.gapCountY) / 25) * 60 + 100;
  };
  this.getX = function() {
    return (this.x1 + ((this.x2 - this.x1) * this.gapCountX) / 25) * 60;
  };

  this.moveBall = function(x2, y2, color) {
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.moving = true;
    this.gapCountY = 25;
    this.gapCountX = 25;
    moves.push(this);
  };
  this.update = function() {
    this.gapCountY--;
    this.gapCountX--;
    if (this.gapCountY <= 0 || this.gapCountX <= 0) {
      this.moving = false;
    }
  };
}
function gameOver() {
  ctx.clearRect(0, 0, 600, 700);
  tryAgain.style.display = "inline";
  ctx.font = "bolf 30px Open Sans";
  ctx.textAlign = "center";
  ctx.fillText(`Score:${score}`, 300, 250);
}

function setRemovePoint() {
  for (let x = 0; x < 10; x++) {
    let c0 = balls[x][0].color;
    let count = 1;
    for (let y = 1; y < 10; y++) {
      let c1 = balls[x][y].color;
      if (c0 === c1) {
        count++;
        if (count >= 3) {
          balls[x][y - 2].remove = true;
          balls[x][y - 1].remove = true;
          balls[x][y].remove = true;
        }
      } else {
        c0 = c1;
        count = 1;
      }
    }
  }
  for (let y = 0; y < 10; y++) {
    let c0 = balls[0][y].color;
    let count = 1;
    for (let x = 1; x < 10; x++) {
      let c1 = balls[x][y].color;
      if (c0 === c1) {
        count++;
        if (count >= 3) {
          balls[x - 2][y].remove = true;
          balls[x - 1][y].remove = true;
          balls[x][y].remove = true;
        }
      } else {
        c0 = c1;
        count = 1;
      }
    }
  }
}

function fall() {
  for (let x = 0; x < 10; x++) {
    for (let y = 9, z = 9; y >= 0; y--, z--) {
      while (z >= 0) {
        if (balls[x][z].remove) {
          z--;
        } else {
          break;
        }
      }
      if (y != z) {
        let colorNum = z >= 0 ? balls[x][z].color : getRandomNum(6);
        balls[x][y].moveBall(x, z, colorNum);
      }
    }
  }
  let soundPoint = true;
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (balls[x][y].remove) {
        balls[x][y].remove = false;
        score += 100;
        if (soundPoint) {
          sound.pause();
          sound.currentTime = 0;
          sound.play();
          soundPoint = false;
        }
      }
    }
  }
}

function checkColor(x, y, c) {
  let point = true;

  if (x > 1) {
    const c0 = balls[x - 2][y].color;
    const c1 = balls[x - 1][y].color;
    if (c0 === c1 && c1 === c) {
      point = false;
    }
  }

  if (y > 1) {
    const c0 = balls[x][y - 2].color;
    const c1 = balls[x][y - 1].color;
    if (c0 === c1 && c1 === c) {
      point = false;
    }
  }

  return point;
}
function myMouseDown(e) {
  mouseDownX = e.offsetX;
  mouseDownY = e.offsetY;
}
function myMouseUp(e) {
  let ballX1 = Math.floor(mouseDownX / 60);
  let ballY1 = Math.floor((mouseDownY - 100) / 60);
  let ballX2 = ballX1;
  let ballY2 = ballY1;
  let mouseUpX = e.offsetX;
  let mouseUpY = e.offsetY;

  if (
    Math.abs(mouseUpX - mouseDownX) === 0 &&
    Math.abs(mouseUpY - mouseDownY) === 0
  ) {
    return;
  } else if (
    Math.abs(mouseUpX - mouseDownX) > Math.abs(mouseUpY - mouseDownY)
  ) {
    ballX2 += mouseUpX - mouseDownX > 0 ? 1 : -1;
  } else {
    ballY2 += mouseUpY - mouseDownY > 0 ? 1 : -1;
  }
  if (
    balls[ballX1][ballY1].moving ||
    balls[ballX2][ballY2].moving ||
    timer === null
  ) {
    return;
  }
  // console.log("ballX:" + ballX2);
  // console.log("ballY:" + ballY2);
  let ballColor = balls[ballX1][ballY1].color;
  balls[ballX1][ballY1].moveBall(ballX2, ballY2, balls[ballX2][ballY2].color);
  balls[ballX2][ballY2].moveBall(ballX1, ballY1, ballColor);

  moveCount--;

  paint();
}
