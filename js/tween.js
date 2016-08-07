~function () {
    var effect = {
        linear: function (t, b, c, d) {
            return b + t / d * c;
        }
    };

    function move(ele, target, duration) {
        window.clearInterval(ele.timer);
        var time = 0, interval = 10;
        var begin = {}, change = {};
        for (var attr in target) {
            if (target.hasOwnProperty(attr)) {
                begin[attr] = utils.getCss(ele, attr);
                change[attr] = target[attr] - begin[attr];
            }
        }
        ele.timer = window.setInterval(function () {
            time += interval;
            if (time >= duration) {
                window.clearInterval(ele.timer);
                utils.setGroupCss(ele, target);
                return;
            }
            for (var key in change) {
                var curDom = change[key];
                if (curDom) {
                    var curPosi = effect.linear(time, begin[key], change[key], duration);
                    utils.setCss(ele, key, curPosi)
                }
            }
        }, interval)
    }

    window.animate = move;
}();