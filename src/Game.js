var frequency = 0;
(function(){
    function Game(canvas){
        this.bgColor = "#000";
        this.canvas = canvas;
        this.c = canvas.getContext("2d");
        this.setSize();
        this.isStartRotate = false; //大圆是否开始旋转
        this.step = 0;              //小圆向上运动的步数
        this.frequency = frequency; //已玩次数
        this.isGameover = false;    //是否已经游戏结束
    }
    Game.prototype.setBgColor = function(bgColor) {
        this.bgColor = bgColor;
    };
    Game.prototype.setIsGameover = function(isGameover){
        this.isGameover = isGameover;
    };

    Game.prototype.setSize = function(){
        this.height = canvas.height = 760;
        this.width = canvas.width = window.innerWidth/window.innerHeight*this.height;

        //添加背景层
        this.c.fillStyle = "#000";
        this.c.rect(0,0,this.width,this.height);
        this.c.fill();
    };

    //加载底下的小圆
    Game.prototype.loadSamllArc = function() {
        this.c.beginPath();
        this.c.fillStyle = "#fff";
        for (var i = 0; i < 6; i++) {
            this.c.arc(this.width/2, 560 + (6 - i) * 36, 12, 0, Math.PI * 2);
        }
        this.c.fill();
    };

    //加载中间的大圆
    Game.prototype.loadBigArc = function() {
        this.c.beginPath();
        this.c.fillStyle = "#fff";
        this.c.arc(this.width/2,300,80,0,Math.PI*2);
        this.c.fill();
    };

    //加载线
    Game.prototype.loadLine = function(lines,i){

        this.c.fillStyle = "#fff";
        this.c.strokeStyle = "#fff";

        //线
        this.c.beginPath();
        this.c.lineWidth = 4;
        this.c.moveTo(80*Math.cos(lines[i]*Math.PI/180),80*Math.sin(lines[i]*Math.PI/180));
        this.c.lineTo(220*Math.cos(lines[i]*Math.PI/180),220*Math.sin(lines[i]*Math.PI/180));
        this.c.stroke();

        //小圆
        this.c.beginPath();
        this.c.arc(220*Math.cos(lines[i]*Math.PI/180),220*Math.sin(lines[i]*Math.PI/180),12,0,Math.PI*2);
        this.c.fill();
    };

    //加载文本
    Game.prototype.loadText = function(){
        var lineLength = lines.length;
        //如果已经游戏结束，最后一颗小球就是无效的，就不需要加入成绩里
        if(this.isGameover) lineLength = lines.length-1;

        var money = ((lineLength>30 ? (lineLength*0.2-3) : (lineLength*0.1))+'').substr(0,3);
        this.c.beginPath();
        this.c.fillStyle="#f00";
        this.c.font="60px 微软雅黑";
        this.c.textAlign = "center";
        this.c.textBaseline = "middle";
        this.c.fillText('￥'+money,this.width/2,340);
        this.c.fill();

        return money;
    };

    //大圆旋转运动
    Game.prototype.runBigArc = function(lines,num) {
        this.c.save();
        //旋转，位置调整
        this.c.fillStyle = "#fff";
        this.c.translate(this.width/2,340);
        this.c.rotate((num+90) * Math.PI / 180);
        this.c.translate(0,0);
        this.c.beginPath();
        //大圆
        this.c.fillStyle = "#fff";
        this.c.arc(0,0,80,0,Math.PI*2);
        this.c.fill();

        //加入线+圆
        for(var i = 0;i < lines.length; i++){
            this.loadLine(lines,i);
        }
        this.c.restore();
    };

    //小圆向上移动
    Game.prototype.runSamllArc = function(){
        this.c.save();
        this.step += 3;
        this.c.beginPath();
        this.c.fillStyle = "#fff";
        for(var i = 0; i < 6; i++){
            this.c.arc(this.width/2,560+(6-i)*36-this.step,12,0,Math.PI*2);
        }
        this.c.fill();
        if(this.step >= 36) {
            this.loadSamllArc();
            this.step = 0;
            return false;
        }
        this.c.fill();
        this.c.restore();
        return true;
    };

    //清空所有
    Game.prototype.clearAll = function(){
        this.c.clearRect(0,0,this.width,this.height);

        //添加背景层
        this.c.fillStyle = this.bgColor;
        this.c.rect(0,0,this.width,this.height);
        this.c.fill();
    };

    //关闭游戏场景
    Game.prototype.gameOver = function(fn) {
        this.clearAll();
        this.canvas.style.display = 'none';
        this.isStartRotate = true;
        if(fn)fn();



        /*切换场景从右到左逐渐切换（手机性能差的会卡顿）
        var _this = this;
        var step = 1;
        var closeScene = setInterval(function(){
            step += _this.width/50;
            _this.canvas.width = _this.width - step;

            _this.clearAll();

            if(step >= _this.width){
                clearInterval(closeScene);
                _this.canvas.width = 0;
                _this.canvas.style.display = 'none';
                this.isStartRotate = true;
                if(fn)fn();
            }
        },10);
        */
    };

    //开启游戏场景
    Game.prototype.runGame = function(fn) {

        frequency++;
        this.frequency = frequency;
        this.canvas.style.display = 'block';
        this.clearAll();
        this.isStartRotate = true;
        if(fn)fn();


        /*切换场景从左到右逐渐切换（手机性能差的会卡顿）
        var step = 1;
        var _this = this;
        _this.canvas.style.display = 'block';
        var openScene = setInterval(function(){
            step += _this.width/50;
            _this.canvas.width = step;

            _this.clearAll();

            if(step >= _this.width){
                clearInterval(openScene);
                _this.canvas.width = _this.width;
                _this.isStartRotate = true;
                if(fn)fn();
            }
        },10);
        */
        return;
    };

    window.Game = Game;
}());