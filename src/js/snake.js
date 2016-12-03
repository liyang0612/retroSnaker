var entry = {
        snakeBox: document.getElementById('snake-box'),
        snakeHead: [],
        oldSnakeHead: '',
        newSnakeHead: '',
        rows: 20,
        cols: 30,
        boxArr: []
    },
    randomS = randomSnake();//得到一个数组randomS[0]为蛇头，randomS[1]食物

//初始化开始函数;
function start() {
    for (var i = 0; i < entry.rows; i++) {
        entry.boxArr[i] = new Array();
        for (var j = 0; j < entry.cols; j++) {
            //所有id依次保存
            entry.boxArr[i][j] = i * entry.cols + j;
            //生成画布
            var div = document.createElement("div");
            if (entry.boxArr[i][j] == randomS[0]) {   //随机初始化蛇头位置
                entry.snakeHead[0] = randomS[0]; //把蛇头的id保存下来
                div.className = "snake";
            } else if (entry.boxArr[i][j] == randomS[1]) {  //随机初始化食物的位置
                div.className = "food";
            } else {
                div.className = "block";
            }

            div.id = i * entry.cols + j;
            div.style.top = i * 20 + "px";
            div.style.left = j * 20 + "px";
            entry.snakeBox.appendChild(div);
        }
    }
}
start();

//判断转弯
window.document.onkeydown = function (e) {
    var e = e || window.event;
    var keyValue = e.keyCode;
    switch (keyValue) {
        case 37:
            entry.oldSnakeHead = entry.snakeHead[0];
            entry.newSnakeHead = entry.snakeHead[0] -= 1;
            move();
            break;
        case 38:
            entry.oldSnakeHead = entry.snakeHead[0];
            entry.newSnakeHead = entry.snakeHead[0] -= entry.cols;
            move();
            break;
        case 39:
            entry.oldSnakeHead = entry.snakeHead[0];
            entry.newSnakeHead = entry.snakeHead[0] += 1;
            move();
            break;
        case 40:
            entry.oldSnakeHead = entry.snakeHead[0];
            entry.newSnakeHead = entry.snakeHead[0] += entry.cols;
            move();
    }
}

//移动函数
function move() {
    var newSnkhead = entry.newSnakeHead;
    var oldSnake = entry.snakeHead;
    oldSnake.pop();
    var newSnake = oldSnake;
    newSnake.unshift(newSnkhead);
    for (var i = 0; i < newSnake.length; i++) {
        document.getElementById(newSnake[i]).className = "snake"
    }
    console.log(entry.oldSnakeHead, newSnkhead)
    if (entry.oldSnakeHead != newSnkhead)
        document.getElementById(entry.oldSnakeHead).className = "block"
}

//随机蛇头位置和食物的位置
function randomSnake() {
    var randomNum = [], i = 0;
    //生成两个随机数添加到数组中
    while (i < 2) {
        var random = Math.floor(Math.random() * 20 * 30);
        randomNum[i] = random;
        i++
    }
    //返回这个数组作为蛇头和食物的初始位置
    return randomNum;
}
