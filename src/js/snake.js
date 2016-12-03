var entry = {
        snakeBox: document.getElementById('snake-box'),
        snakeHead: [],
        oldSnakeHead: '',    //老蛇头
        newSnakeHead: '',    //新蛇头
        keyVluaeGo: '',      //用于传递的键值
        keyVluae: '',      //用来判断的键值
        settime: '',         //定时器
        rows: 20,
        cols: 30,
        foodId: '',
        snakeHeadXY: {
            x: 0,
            y: 0
        },
        foodXY: {
            x: 0,
            y: 0
        },
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
                entry.foodId = entry.boxArr[i][j];
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

//判断转弯返回键值
window.document.onkeydown = function (e) {
    var e = e || window.event;
    entry.keyValue = e.keyCode;
    if (entry.keyValue <= 40 && entry.keyValue >= 37) {
        if (entry.keyValue == 37 && entry.keyValueGo != 39) {
            entry.keyValueGo = 37;
            move();
        }
        if (entry.keyValue == 38 && entry.keyValueGo != 40) {
            entry.keyValueGo = 38;
            move();
        }
        if (entry.keyValue == 39 && entry.keyValueGo != 37) {
            entry.keyValueGo = 39;
            move();
        }
        if (entry.keyValue == 40 && entry.keyValueGo != 38) {
            entry.keyValueGo = 40;
            move();
        }
    }
}

//移动函数
function move() {
    entry.oldSnakeHead = entry.snakeHead[0];
    switch (entry.keyValueGo) {
        case 37:
            entry.newSnakeHead = entry.snakeHead[0] - 1;
            break;
        case 38:
            entry.newSnakeHead = entry.snakeHead[0] - entry.cols;
            break;
        case 39:
            entry.newSnakeHead = entry.snakeHead[0] + 1;
            break;
        case 40:
            entry.newSnakeHead = entry.snakeHead[0] + entry.cols;
    }
    //保存当前食物坐标
    entry.foodXY.x=document.getElementById(entry.foodId).offsetLeft;
    entry.foodXY.y=document.getElementById(entry.foodId).offsetTop;
    //保存当前蛇头坐标
    entry.snakeHeadXY.x=document.getElementById(entry.newSnakeHead).offsetLeft;
    entry.snakeHeadXY.y=document.getElementById(entry.newSnakeHead).offsetTop;
    //如果蛇头吃到食物
    if(entry.foodXY.x==entry.snakeHeadXY.x&&entry.foodXY.y==entry.snakeHeadXY.y){
        // console.log(entry.newSnakeHead,entry.snakeHead[0])
        var newSnake = entry.snakeHead;
        newSnake.unshift(entry.newSnakeHead);//添加转角点为新蛇头
        console.log(newSnake)
        for (var i = 0; i < newSnake.length; i++) {
            document.getElementById(newSnake[i]).className = "snake";
        }
    }else{
        console.log(entry.newSnakeHead,entry.snakeHead[0])
        var oldSnake = entry.snakeHead;
        oldSnake.pop();//删除蛇尾
        var newSnake = oldSnake;
        newSnake.unshift(entry.newSnakeHead);//添加转角点为新蛇头
        for (var i = 0; i < newSnake.length; i++) {
            document.getElementById(newSnake[i]).className = "snake"
        }
        //判断方式不对导致
        if (entry.oldSnakeHead != entry.newSnakeHead)
                document.getElementById(entry.oldSnakeHead).className = "block";
    }
    // clearInterval(entry.settime);
    // entry.settime = setInterval(move, 1000)
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
