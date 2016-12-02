var entry = {
        snakeBox: document.getElementById('snake-box'),
        rows: 20,
        cols: 30,
        boxArr: []
    },
    randomS = randomSnake();//得到一个数组randomS[0]为蛇头，randomS[1]食物

//初始化开始函数
function start() {
    for (var i = 0; i < entry.rows; i++) {
        entry.boxArr[i] = new Array();
        for (var j = 0; j < entry.cols; j++) {
            //所有id依次保存
            entry.boxArr[i][j] = i * entry.cols + j;
            //生成画布
            var div = document.createElement("div");
            if (entry.boxArr[i][j] == randomS[0]) {   //随机初始化蛇头位置
                div.className = "snake";
            }else if(entry.boxArr[i][j] == randomS[1]){  //随机初始化食物的位置
                div.className = "food";
            }else{
                div.className = "block";
            }

            div.id = i * entry.cols + j;
            div.style.top = i * 20 + "px";
            div.style.left = j * 20 + "px";
            entry.snakeBox.appendChild(div);
        }
    }
}
//随机蛇头位置和食物的位置
function randomSnake() {
    var randomNum=[],i=0;
    //生成两个随机数添加到数组中
    while (i<2){
        var random = Math.floor(Math.random() * 20 * 30);
        randomNum[i]=random;
        i++
    }
    //返回这个数组作为蛇头和食物的初始位置
    return randomNum;
}

start();