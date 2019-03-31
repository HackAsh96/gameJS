let ctx = [],
  balls = [],
  moves = [];
let mouseDownX = null,
  mouseDownY = null;
let timer;
let moveCount = 0;
let timeCount = 0;
let score = 0;
const imageList = [blue, green, grey, orange, purple, red, yellow];
const tryAgain = document.getElementById("tryAgain");
const sound = document.getElementById("sound");
const bgSound = document.getElementById("bgSound");
const canvas = document.getElementById("canvas");
const welcome = document.getElementById("welcome");
const pg = document.getElementById("pg");
ctx = canvas.getContext("2d");

function setJS(fileName) {
  const elm = document.createElement("script");
  elm.type = "text/javascript";
  elm.src = fileName;
  document.body.appendChild(elm);

  setTimeout(() => {
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("timeBtn").style.display = "none";
    initialize();
  }, 200);
}
