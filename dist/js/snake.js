/**
 * Created by 李洋 on 2016/11/26.
 */
var tran = document.getElementById('tran'),
    blocks = tran.getElementsByTagName("div"),
    len = blocks.length,
    keydownNum = false;
function moveLeft() {
    var leftWid = tran.offsetLeft;
    tran.style.left = leftWid + 20 + "px";
}

var intLeft = setInterval(moveLeft, 500)

document.onkeydown = document.onkeyup = document.onkeypress = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0] || event || event.which,
        len = blocks.length;
    if (keydownNum === false) { //判断是否是连续按下，为true是练习按下
        if (e && e.keyCode == 40) {
            clearInterval(intLeft);
            var downturnInt = function () {
                if (len > 1)
                    downTurn()
                else
                    return false;
                len--;
                console.log(len)
            }
            downturnInt();
            setInterval(downturnInt, 500);
            keydownNum = true;
        }
    } else {
        return false;
    }

    if (event.keyCode == 40) { //阻止浏览器快捷键
        event.returnValue = false;
        return (false);
    }
};

//down事件
function downTurn() {
    var html = document.createElement('div'),
        leftWid = tran.offsetLeft;
    blocks[0].remove();   //移除第一个
    tran.appendChild(html) //添加到最后
    blocks[blocks.length - 1].className = "game-block down-turn";//添加样式，实现向下转弯
    tran.style.left = leftWid + 20 + "px";
}

function stopDefault(e) {
    //如果提供了事件对象，则这是一个非IE浏览器
    if (e && e.preventDefault) {
        //阻止默认浏览器动作(W3C)
        e.preventDefault();
    } else {
        //IE中阻止函数器默认动作的方式
        window.event.returnValue = false;
    }
    return false;
}
