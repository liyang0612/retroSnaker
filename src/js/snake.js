var entry = {
        snakeBox: document.getElementById('snake-box'),
        snakeHead: [],
        oldSnakeHead: '',    //老蛇头
        newSnakeHead: '',    //新蛇头
        keyValueGo: 0,      //用于传递的键值
        keyVluae: 39,        //用来判断的键值
        settime: '',         //定时器
        rows: 20,
        cols: 30,
        level: 350,          //难度级别
        boolStart: false,
        foodId: '',
        snakeHeadXY: {
            x: 0,
            y: 0
        },
        foodXY: {
            x: 0,
            y: 0
        },
        boxArr: [],
        gameover: false
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
    if(entry.boolStart===true){
        entry.keyValue = e.keyCode;
        if (entry.keyValue <= 40 && entry.keyValue >= 37) {
            if (entry.keyValue == 37 && entry.keyValueGo != 39) {
                entry.keyValueGo = 37;
            }
            if (entry.keyValue == 38 && entry.keyValueGo != 40) {
                entry.keyValueGo = 38;
            }
            if (entry.keyValue == 39 && entry.keyValueGo != 37) {
                entry.keyValueGo = 39;
            }
            if (entry.keyValue == 40 && entry.keyValueGo != 38) {
                entry.keyValueGo = 40;
            }
        }
    }
}

//移动函数
function move() {

    var boolWall = entry.snakeHead[0];
    if (entry.keyValueGo == 0)
        entry.newSnakeHead = entry.snakeHead[0];
    //用于判断蛇是否是尾部
    entry.oldSnakeHead = entry.snakeHead[entry.snakeHead.length - 1];
    entry.oldsnake = entry.snakeHead;
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

    var old = copyArr(entry.snakeHead);//js变量是对对象的引用，所以需要把数组复制一份出来；
    //判断是否撞墙
    if (entry.newSnakeHead > 599 ||
        entry.newSnakeHead < 0 ||
        (entry.newSnakeHead % 30 == 0 && boolWall % 30 == 29) ||
        (entry.newSnakeHead % 30 == 29 && boolWall % 30 == 0)) {
        alert("GAME OVER , 请重新开始游戏！");
        clearInterval(entry.settime);
        //重新开始
        reStart();
        entry.foodId = randomSnake()[1];
    } else {
        //保存当前食物坐标
        entry.foodXY.x = document.getElementById(entry.foodId).offsetLeft;
        entry.foodXY.y = document.getElementById(entry.foodId).offsetTop;
        //保存当前蛇头坐标
        entry.snakeHeadXY.x = document.getElementById(entry.newSnakeHead).offsetLeft;
        entry.snakeHeadXY.y = document.getElementById(entry.newSnakeHead).offsetTop;
        //如果蛇头吃到食物
        if (entry.foodXY.x == entry.snakeHeadXY.x && entry.foodXY.y == entry.snakeHeadXY.y) {
            var newSnake = entry.snakeHead;
            newSnake.unshift(entry.newSnakeHead);//添加转角点为新蛇头
            for (var i = 0; i < newSnake.length; i++) {
                document.getElementById(newSnake[i]).className = "snake";
            }
            //再次随机生成食物位置
            entry.foodId = randomSnake()[1];
            document.getElementById(entry.foodId).className = 'food'
        } else {
            entry.snakeHead.pop();//删除蛇尾
            var newSnake = entry.snakeHead;
            newSnake.unshift(entry.newSnakeHead);//添加转角点为新蛇头
            for (var i = 0; i < newSnake.length; i++) {
                document.getElementById(newSnake[i]).className = "snake"
            }
            /**由于之前oldSnakeHead获取的是原数组中第一个值，所以每当判断的时候新数组的第二个值（也就是原数组的第一个值）
             * 会添加“block”类，导致吃掉食物后食物还在原地的bug
             * */
            if (entry.oldSnakeHead != entry.newSnakeHead)
                document.getElementById(entry.oldSnakeHead).className = "block";
        }
        clearInterval(entry.settime);
        entry.settime = setInterval(move, entry.level);
    }
    //判断是否撞到自己
    itSelf(old)
    if (entry.gameover == true) {
        clearInterval(entry.settime);
    }

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

//判断数值是否存于数组，如果蛇头存于上一个的蛇身，游戏结束(蛇撞上自己)
function itSelf(arr) {
    for (var i = 1; i < arr.length; i++) {
        if (entry.newSnakeHead == arr[i]) {
            entry.gameover = true;
            alert("GAME OVER , 请重新开始游戏");
            //重新开始
            reStart();
            entry.foodId = randomSnake()[1];
            return false;
        }
    }
}

//复制数组
function copyArr(a) {
    var arr = [];
    for (var i = 0; i < a.length; i++) {
        arr.push(a[i]);
    }
    return arr;
}

//重新开始游戏
function reStart() {
    for (var i = 0; i < entry.snakeHead.length; i++) {
        document.getElementById(entry.snakeHead[i]).className = "block";
    }
    entry.snakeHead = [];
    entry.snakeHead[0] = randomSnake()[0];
    document.getElementById(entry.snakeHead[0]).className = "snake";
}

//开始游戏
document.getElementById("start").onclick = function () {
    if(entry.boolStart===false)
        move()
    else
        alert("游戏已经开始了");
    entry.boolStart = true;
}

document.getElementById("level").onclick = function () {
    entry.level = this.value;
}
window.onload = function () {
    document.getElementById('level').value = 350;
}

