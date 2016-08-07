/*toTop 回到顶部  以及顶部隐藏头*/
var toTop = document.getElementById("toTop");
var hidden_header = document.getElementById("hidden_header");
toTop.onclick = function () {
    var duration = 1000;
    var change = utils.win("scrollTop");
    var interval = 10;
    var speed = change / duration * interval;
    var timer = window.setInterval(function () {
        var curScrollTop = utils.win("scrollTop");
        if (curScrollTop === 0) {
            window.clearInterval(timer);
            window.onscroll = fn;
            hidden_header.style.display = "none";
            hidden_header.style.height = 0;
            hidden_header.style.transition = "0";

            return;
        }
        curScrollTop -= speed;
        utils.win("scrollTop", curScrollTop);
    }, interval);
    this.style.display = "none";
    window.onscroll = null;
};
function fn() {
    var scrollTop = utils.win("scrollTop");
    var curScreenHeight = utils.win("clientHeight");
    if (scrollTop > curScreenHeight) {
        toTop.style.display = "block";
        hidden_header.style.display = "block";
        hidden_header.style.height = 50 + "px";
    } else {
        toTop.style.display = "none";
        hidden_header.style.display = "none";
        hidden_header.style.height = 0;
    }
}
window.onscroll = fn;
