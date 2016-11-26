/**
 * Created by 李洋 on 2016/11/26.
 */
var tran = document.getElementById('tran'),
    tranX = document.getElementById('tranX'),
    tranY = document.getElementById('tranY'),
    box = document.getElementById('game-box'),
    blocksX = tranX.getElementsByTagName("div"),
    blocksY = tranY.getElementsByTagName("div"),
    boxWid = box.clientWidth,
    boxHei = box.clientHeight,
    lenx = blocksX.length,
    leny = blocksY.length,
    keydownNum = false;

var intLeft = setInterval(moveLeft, 500);
clearInterval(intLeft);
var intDown = setInterval(moveDown, 500);
clearInterval(intDown)


// document.onkeyup = function (event) {
//     var e = event || window.event || arguments.callee.caller.arguments[0] || event || event.which;
//     //判断是否是连续按下，为true是练习按下;
//     if (e && e.keyCode == 40) {
//         clearInterval(intLeft);//停止左移动
//         //开始转弯
//         setInterval(turnDown, 500);
//         //转弯结束后向下移动
//         setTimeout(function () {
//             intDown = setInterval(moveDown, 500);
//         }, 500 * (lenx + leny - 1))
//     }
//     if (e && e.keyCode == 39) {
//         clearInterval(intDown);
//     }
// }

//     if (event.keyCode == 40) { //阻止浏览器快捷键
//         event.returnValue = false;
//         return (false);
//     }
// };

//右移动函数
function moveLeft() {
    var offsetLeft = tran.offsetLeft,
        snakeW = tran.clientWidth;
    if (offsetLeft + snakeW < boxWid)
        tran.style.left = offsetLeft + 20 + "px";
    else
        return false;
}
//下移动函数
function moveDown() {
    var offsetDown = tran.offsetTop,
        snakeH = 20 * (lenx + leny);
    if (offsetDown + snakeH < boxHei)
        tran.style.top = offsetDown + 20 + "px";
    else
        clearInterval(intDown)
}
//下转弯事件
function turnDown() {
    var html = document.createElement('div'),
        offsetLeft = tran.offsetLeft,
        lenx = blocksX.length,
        leny = blocksY.length,
        len=lenx+leny;
    if (len>0&&lenx!=0) {
        blocksX[0].remove();   //移除第一个
        tranY.appendChild(html) //添加到最后
        blocksY[blocksY.length - 1].className = "game-block tranY-c";//添加样式，实现向下转弯
        if(lenx>1)
        tran.style.left = offsetLeft + 20 + "px";
    }
}
//右转弯事件
function turnLeft() {

}

