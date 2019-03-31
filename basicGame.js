function initialize() {
  moveCount = 20;
  score = 0;
  for (let x = 0; x < 10; x++) {
    balls[x] = [];
    for (let y = 0; y < 10; y++) {
      balls[x][y] = new Ball(x, y);
    }
  }
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      while (true) {
        let colorNum = getRandomNum(6);
        if (checkColor(x, y, colorNum)) {
          balls[x][y].color = colorNum;
          break;
        }
      }
    }
  }

  canvas.onmousedown = myMouseDown;
  canvas.onmouseup = myMouseUp;

  timer = setInterval(checkBallStatus, 25);
  welcome.style.display = "none";
  pg.style.display = "none";
  bgSound.currentTime = 1;
  bgSound.play();
}

function checkBallStatus() {
  if (moves.length > 0) {
    for (let i = 0; i < moves.length; i++) {
      moves[i].update();
    }

    moves = moves.filter(ball => {
      return ball.gapCountX != 0;
    });

    if (moves.length === 0) {
      setRemovePoint();
      fall();
    }
  }
  paint();

  if (moves.length === 0 && moveCount === 0) {
    clearInterval(timer);
    timer = null;
    bgSound.pause();
    bgSound.currentTime = 0;
    setTimeout(() => gameOver(), 500);
  }
}

function paint() {
  //clear canvas
  ctx.clearRect(0, 0, 600, 700);
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      ctx.drawImage(
        imageList[balls[x][y].color],
        balls[x][y].getX(),
        balls[x][y].getY(),
        60,
        60
      );
    }
  }
  ctx.font = "bold 20px Open Sans";
  ctx.textAlign = "center";
  ctx.fillText(`Moves left:${moveCount}`, 150, 50);
  ctx.fillText(`Score:${score}`, 450, 50);
}
