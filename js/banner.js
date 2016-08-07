var banner = utils.getElementsByClass("banner")[0];
var inner = utils.getElementsByClass("inner", banner)[0];
var divList = inner.getElementsByTagName("div");
var imgList = inner.getElementsByTagName("img");
var focusList = utils.getElementsByClass("focusList", banner)[0];
var focusListLis = focusList.getElementsByTagName("li");
var leftBtn = utils.getElementsByClass("left", banner)[0];
var rightBtn = utils.getElementsByClass("right", banner)[0];

//获取数据
var data = null;
~function getData() {
    var xhr = new XMLHttpRequest;
    xhr.open("get", "jsonData.txt?_=" + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            data = utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);
}();


//绑定数据

~function bindData() {
    var str = '';
    var focusStr = '';
    if (data) {
        for (var i = 0; i < data.length; i++) {
            var curData = data[i];
            str += '<div><img src="" trueSrc="' + curData.src + '"/></div>';
            if (i === 0) {
                focusStr += '<li class="bg"></li>';
            } else {
                focusStr += '<li></li>';
            }
        }
        str += '<div><img src="" trueSrc="' + data[0].src + '"/></div>';
        inner.innerHTML = str;
        focusList.innerHTML = focusStr;
        utils.setCss(inner, "width", (data.length + 1) * 715);
    }
}();
//console.log(imgList);

//图片延迟加载
function delayLoadImg() {
    for (var i = 0; i < imgList.length; i++) {
        (function (i) {
            var curImg = imgList[i];
            if (curImg.isload) {
                return
            }
            var tempImg = new Image;
            tempImg.src = curImg.getAttribute("trueSrc");
            tempImg.onload = function () {
                curImg.src = this.src;
                utils.setCss(curImg, "display", "block");
                window.animate(curImg, {opacity: 1}, 500);
                tempImg = null;
            };
            curImg.isload = true;
        })(i);
    }
}
window.setTimeout(delayLoadImg, 1000);

//自动轮播
var step = 0, interval = 2000;
function autoMove() {
    if (step === data.length) {
        step = 0;
        utils.setCss(inner, "left", -step * 715);
    }
    step++;
    window.animate(inner, {left: -step * 715}, 300);
    focusAlign();
}
timer = window.setInterval(autoMove, interval);
//焦点对齐
function focusAlign() {
    var tempStep = step == data.length ? 0 : step;
    for (var i = 0; i < focusListLis.length; i++) {
        var curLis = focusListLis[i];
        if (i == tempStep) {
            curLis.className = 'bg';
        } else {
            curLis.className = '';
        }
    }
}
//鼠标移入移出
banner.onmouseover = function () {
    window.clearInterval(timer);
    utils.setCss(leftBtn, "display", "block");
    utils.setCss(rightBtn, "display", "block");
};
banner.onmouseout = function () {
    timer = window.setInterval(autoMove, interval);
    utils.setCss(leftBtn, "display", "none");
    utils.setCss(rightBtn, "display", "none");
};
//点击左右按钮切换
leftBtn.onclick = function () {
    if (step === 0) {
        step = data.length;
        utils.setCss(inner, "left", -step * 715);
    }
    step--;
    window.animate(inner, {left: -step * 715}, 1500);
    focusAlign();
};
rightBtn.onclick = autoMove;
//焦点对应切换
~function focusChange() {
    for (var i = 0; i < focusListLis.length; i++) {
        var curLis = focusListLis[i];
        curLis.index = i;
        curLis.onclick = function () {
            step = this.index;
            window.animate(inner, {left: -step * 715}, 1500);
            focusAlign();
        }
    }
}();

