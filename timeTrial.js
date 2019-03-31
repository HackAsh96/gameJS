function initialize() {
  timeCount = 60 * 1000;
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
  timeCount -= 25;
  if (bgSound.playbackRate == 1 && timeCount < 5000) {
    bgSound.pause();
    bgSound.playbackRate = 1.5;
    bgSound.play();
  }
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

  if (moves.length === 0 && timeCount <= 0) {
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
  let sec = Math.floor(timeCount / 1000);
  let mSec = timeCount % 1000;

  if (sec < 0) {
    sec = "00";
  } else if (sec < 10) {
    sec = `0${sec}`;
  }
  if (mSec < 0) mSec = "00";
  ctx.fillText(`Time left:${sec}:${mSec}`, 80, 50);
  ctx.fillText(`Score:${score}`, 380, 50);
}
