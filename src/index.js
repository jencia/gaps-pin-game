/**
 * Created by Administrator on 2015/8/20.
 */
var canvas = document.getElementsByTagName("canvas")[0];
var startBtn1 = $('.start').get(0);
var startBtn2 = $('.start').get(1);
var showMoney = $('#money').get(0);
var showMaxMoney = $('#maxMoney').get(0);

var game = null;

var money = 0;              // 本次成绩
var maxMoney = -1;          // 最高成绩
var num = 0;                // 大圆旋转度数
var lines = [];             // 线的集合

var isFirstVisit = sessionStorage.getItem('isFirstVisit');  // 是否第一次访问
var isBtnClick = false;     // 是否已经点过开始按钮
var isRunSmallArc = false;  // 小球是否在运动

window.ontouchmove = function(event) {
	var e = event||window.event;
	e.preventDefault();
};
$('#menu').ontouchstart = function(event) {
	var e = event||window.event;
	e.preventDefault();
};

// 读取刷新前的数据
window.onload = function() {
    if (isFirstVisit === '1') {
        maxMoney = sessionStorage.getItem('maxMoney');
        frequency = sessionStorage.getItem('frequency');
        money = sessionStorage.getItem('money');
        
        $('.menu1').hide();
        $('.menu2').show();
        $('#money').html('本次成绩为' + money + '元');
        $('#maxMoney').html('最高成绩为' + maxMoney + '元');
    }
};
// 刷新时存储记录
window.onunload = function() {
    var m = 0;
    if($(canvas).is(':hidden')) m = money;
    sessionStorage.setItem('money', m);
    sessionStorage.setItem('maxMoney', maxMoney);
    sessionStorage.setItem('frequency', frequency);
    sessionStorage.setItem('isFirstVisit', '1');
};

//6.5秒后旋转方向取反
var isClockwise = true;
setInterval(function() {
    isClockwise = !isClockwise;
}, 6500);

// 大圆运动
var mainAni;
// 点击后允许小球运动一次，线条数量+1
function canvasClick(event) {
    if (!game.isStartRotate) {
        return;
    }
	var e = event || window.event;
	e.preventDefault();
    isRunSmallArc = true;
    setTimeout(function() {
        var lastNum = num;

        lines.push(-lastNum);

        //小球碰撞判断
        for (var i = 0; i < lines.length - 1; i++) {
            if (Math.abs(lastNum - (-lines[i])) < 6) {
                //停止小球向上运动
                isRunSmallArc = false;
                game.setIsGameover(true);
                game.setBgColor("#b9101c");

                setTimeout(function () {
                    clearInterval(mainAni);
                }, 16);
                canvas.onclick = function(e){
                // canvas.ontouchstart = function(e){
                    var e = event||window.event;
                    e.preventDefault();
                };

                setTimeout(function () {
                    maxMoney = maxMoney == 0 ? money : money > maxMoney ? money : maxMoney;
                    showMoney.innerHTML = '本次成绩为' + money+'元';
                    showMaxMoney.innerHTML = '最高成绩为' + maxMoney+'元';
                    $('.menu2').show();
                    game.gameOver(function(){
                        isBtnClick = false;
                    });
                }, 2000);
                break;
            }
        }
    },12*15);
}

startBtn1.onclick = startGame;
startBtn2.onclick = startGame;
function startGame(e) {
    if(isBtnClick) {
        return;
    }
    isBtnClick = true;

    game = new Game(canvas);
    num = 0;
    lines = [];

    game.setIsGameover(false);
    if (maxMoney == -1) maxMoney = 0;

    game.runGame(function () {
        $('.menu1').hide();
        $('.menu2').hide();
    });
    frequency = game.frequency;

    canvas.onclick = canvasClick;
    //canvas.ontouchstart = canvasClick;

    mainAni = setInterval(function () {
        if (game.isStartRotate) {
            //清空画布
            game.clearAll();

            //如果画布被点击，小球运动一次，否则原地不动
            if (isRunSmallArc) {
                isRunSmallArc = game.runSamllArc();
            } else {
                game.loadSamllArc();
            }

            //大圆带动线一起旋转运动
            game.runBigArc(lines, num);

            //方向取反
            if (isClockwise) {
                num = num++ >= 360 ? num -= 360 : num;
            } else {
                num = num-- <= 0 ? num += 360 : num;
            }

            //加载文本
            money = game.loadText();
        }
    }, 15);
}























