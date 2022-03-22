"use strict";
var RAF=
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback)
    { window.setTimeout(callback, 1000 / 60); }
      ;

var body = document.getElementsByTagName("body");
const courtWidth = 400;
const courtHeight = 250;
const ballSize = 20;
const playerWidth = 5;
const playerHeight = 50;

var buttonCont = document.createElementNS("http://www.w3.org/2000/svg", "svg");
buttonCont.setAttribute("width", 80);
buttonCont.setAttribute("height", 30);
buttonCont.style.marginLeft = '155px';

var button = document.createElementNS("http://www.w3.org/2000/svg", "rect");
button.setAttribute("x", 0);
button.setAttribute("y", 0);
button.setAttribute("width", 80);
button.setAttribute("height", 30);
button.setAttribute("stroke", "black");
button.setAttribute("fill", "lightgrey");
buttonCont.appendChild(button);

var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
text.innerHTML = 'СТАРТ';
text.setAttribute("x", 9);
text.setAttribute("y", 20);
text.style.fontSize =  20 + "px";
buttonCont.appendChild(text);

body[0].appendChild(buttonCont);
buttonCont.addEventListener('click',start,false);

var br = document.createElement('br');
body[0].appendChild(br);
var div = document.createElement(div);
div.style.marginLeft = '170px';
div.innerHTML = '<span id="score1">0</span>:<span id="score2">0</span>';
body[0].appendChild(div);
var br = document.createElement('br');
body[0].appendChild(br);

var container = document.createElementNS("http://www.w3.org/2000/svg", "svg");
container.setAttribute("width", courtWidth);
container.setAttribute("height", courtHeight);
var court = document.createElementNS("http://www.w3.org/2000/svg", "rect");
court.setAttribute("x", 0);
court.setAttribute("y", 0);
court.setAttribute("width", 400);
court.setAttribute("height", 250);
court.setAttribute("stroke", "black");
court.setAttribute("fill", "khaki");
body[0].appendChild(container);
container.appendChild(court);

var coords = container.getBoundingClientRect();
var courtPosX = coords.left;
var courtPosY = coords.top;

var ball = document.createElementNS("http://www.w3.org/2000/svg", "circle");
var ballPosX = courtWidth / 2 - ballSize / 2;
var ballPosY = courtHeight / 2 - ballSize / 2;

ball.setAttribute("cx", ballPosX);
ball.setAttribute("cy", ballPosY);
ball.setAttribute("r", ballSize / 2);
ball.setAttribute("fill", "red");
ball.id = "ball";
var ballSpeedX = 0;
var ballSpeedY = 0;
container.appendChild(ball);

var player1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
var player1PosX = 0;
var player1PosY = courtHeight / 2 - playerHeight / 2;
var player1Speed = 0;
var player1Score = 0;
player1.setAttribute("x", player1PosX);
player1.setAttribute("y", player1PosY);
player1.setAttribute("width", playerWidth);
player1.setAttribute("height", playerHeight);
player1.setAttribute("fill", "green");
player1.id = "player1";
container.appendChild(player1);

var player2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
var player2PosX = courtWidth - playerWidth;
var player2PosY = (courtHeight - playerHeight) / 2;
var player2Speed = 0;
var player2Score = 0;
player2.setAttribute("x", player2PosX);
player2.setAttribute("y", player2PosY);
player2.setAttribute("width", playerWidth);
player2.setAttribute("height", playerHeight);
player2.setAttribute("fill", "blue");
player2.id = "player2";
container.appendChild(player2);

function updateScore(span, score) {
  var sp = document.getElementById(span);
  sp.innerHTML = score;
}
addEventListener("keydown", movePlayer, false);
  addEventListener("keyup", stopPlayer, false);

  function movePlayer(e) {
    e = e || window.event;
    e.preventDefault();
    if (e.keyCode == 16) player1Speed = -10;
    if (e.keyCode == 17) player1Speed = 10;
    if (e.keyCode == 38) player2Speed = -10;
    if (e.keyCode == 40) player2Speed = 10;
  }

  function stopPlayer(e) {
    e = e || window.event;
    e.preventDefault();
    if (e.keyCode == 16 || e.keyCode == 17) player1Speed = 0;
    if (e.keyCode == 38 || e.keyCode == 40) player2Speed = 0;
  }
function tick() {

  player1PosY += player1Speed;
  player2PosY += player2Speed;
  if (player1PosY <= 0) player1PosY = 0;
  if (player2PosY <= 0) player2PosY = 0;
  if (player1PosY + playerHeight >= courtHeight)
    player1PosY = courtHeight - playerHeight;
  if (player2PosY + playerHeight >= courtHeight)
    player2PosY = courtHeight - playerHeight;
  player1.setAttribute("y", player1PosY);
  player2.setAttribute("y", player2PosY);

  ballPosX += ballSpeedX;
  ball.setAttribute("cx", ballPosX);

  ballPosY += ballSpeedY;
  ball.setAttribute("cy", ballPosY);

  if (
    ballPosX - ballSize / 2 <= player1PosX + playerWidth &&
    ballPosY + ballSize / 2 >= player1PosY &&
    ballPosY - ballSize / 2 <= player1PosY + playerHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballPosX - ballSize / 2 < 0) {
    ballSpeedX = 0;
    ballSpeedY = 0;
    ballPosX = 0 + ballSize / 2;
    player1Score++;
    updateScore("score1", player1Score);
  }

  if (
    ballPosX + ballSize / 2 >= player2PosX &&
    ballPosY + ballSize / 2 >= player2PosY &&
    ballPosY - ballSize / 2 <= player2PosY + playerHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballPosX + ballSize / 2 > courtWidth) {
    ballSpeedX = 0;
    ballSpeedY = 0;
    ballPosX = courtWidth - ballSize / 2;
    player2Score++;
    updateScore("score2", player2Score);
  }

  if (ballPosY + ballSize / 2 > courtHeight) {
    ballSpeedY = -ballSpeedY;
    ballPosY = courtHeight - ballSize / 2;
  }
  if (ballPosY - ballSize / 2 < 0) {
    ballSpeedY = -ballSpeedY;
    ballPosY = 0 + ballSize / 2;
  }
  RAF(tick);
}


function start(e) {
  e = e||window.event;
  e.preventDefault();
  ballPosX = courtWidth / 2 - ballSize / 2;
  ballPosY = courtHeight / 2 - ballSize / 2;
  ballSpeedX = 3;
  ballSpeedY = 2; 
}
tick();