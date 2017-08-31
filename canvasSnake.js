(function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var timer = "";
  var snakeSize = 10;
  var snakeX = [20 + snakeSize, 20, 20 - snakeSize];
  var snakeY = [50, 50, 50];
  var directionX = [1, 1, 1]; //1往右，0不动，-1往左
  var directionY = [0, 0, 0]; //1往下，0不动，-1往上
  var randoms = [Math.floor(Math.random() * 300 / 10) * 10, Math.floor(Math.random() * 300 / 10) * 10];
  var count = 0;
  application();
  directionControl();

  function application() {
    timer = setTimeout(application, 200);
    clearCanvas();
    drawCanvas(0, 0);
    moveSnake();
    drawPoint(randoms[0], randoms[1]);
    drawSnake();
    eatMouse();
    gameOver();
  }

  // 绘制画布
  function drawCanvas(x, y) {
    ctx.fillStyle = "#e4e4e4";
    ctx.fillRect(x, y, 300, 300);
    ctx.strokeStyle = "#999";
    ctx.strokeRect(x, y, 300, 300);
  }

  // 小方格
  function drawPoint(x, y) {
    ctx.fillStyle = "#333";
    ctx.fillRect(x, y, snakeSize, snakeSize);
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(x, y, snakeSize, snakeSize);
  }

  //绘制贪吃蛇
  function drawSnake() {
    for (var i = 0; i < snakeX.length; i++) {
      drawPoint(snakeX[i], snakeY[i]);
    }

    for (var j = 0; i < directionX.length; i++) {
      directionX[i] = directionX[0];
      directionX[Y] = directionX[0];
    }
  }

  // 移动贪吃蛇
  function moveSnake() {
    for (var i = 0; i < snakeX.length; i++) {
      snakeX[i] += directionX[i] * snakeSize;
      snakeY[i] += directionY[i] * snakeSize;
    }
    //遍历“蛇身”在指定节点转弯
    for (var j = directionX.length - 1; j > 0; j--) {
      directionX[j] = directionX[j - 1];
      directionY[j] = directionY[j - 1];
    }
  }

  // 清除画布
  function clearCanvas() {
    ctx.clearRect(0, 0, 300, 300);
  }

  // 方向控制
  function directionControl() {
    document.body.addEventListener('keydown', function(e) {
      var keyCode = e.keyCode;
      var dirXLen = directionX.length;
      var dirYLen = directionY.length;
      if (keyCode == 38 && directionY[0] != 1) {
        directionY[0] = -1;
        directionX[0] = 0;
      } else if (keyCode == 40 && directionY[0] != -1) {
        directionY[0] = 1;
        directionX[0] = 0;
      } else if (keyCode == 37 && directionX[0] != 1) {
        directionY[0] = 0;
        directionX[0] = -1;
      } else if (keyCode == 39 && directionX[0] != -1) {
        directionY[0] = 0;
        directionX[0] = 1;
      }
    })
  }

  // 吃
  function eatMouse() {
    if (snakeX[0] == randoms[0] && snakeY[0] == randoms[1]) {
      if (directionX[0] == -1) {
        randoms[0] -= 10;
      } else if (directionX[0]) {
        randoms[0] += 10;
      }
      if (directionY[0] == -1) {
        randoms[1] -= 10;
      } else if (directionY[0]) {
        randoms[1] += 10;
      }
      snakeX.unshift(randoms[0]);
      snakeY.unshift(randoms[1]);
      directionX.unshift(directionX[0]);
      directionY.unshift(directionY[0]);
      randoms = [Math.floor(Math.random() * 300 / 10) * 10, Math.floor(Math.random() * 300 / 10) * 10]
    }
  }

  //  game over
  function gameOver() {
    if (snakeX[0] > 300 || snakeX[0] < 0 || snakeY[0] > 300 || snakeY[0] < 0) {
      alert("game over");
      clearTimeout(timer);
    }
  }
})();