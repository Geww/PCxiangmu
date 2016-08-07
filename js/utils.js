var utils = {
    listToArray: function (likeArray) {
        try {
            return Array.prototype.slice.call(likeArray);
        } catch (e) {
            var ary = [];
            for (var i = 0; i < likeArray.length; i++) {
                ary[ary.length] = likeArray[i];
            }
            return ary;
        }
    },
    jsonParse: function (jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    },
    win: function (attr, val) {
        if (typeof val !== "undefined") {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];
    },
    offset: function (ele) {
        var parent = ele.offsetParent;
        var l = null, t = null;
        l += ele.offsetLeft;
        t += ele.offsetTop;
        while (parent) {
            l += parent.clientLeft + parent.offsetLeft;
            t += parent.clientTop + parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {left: l, top: t};
    },
    getCss: function (ele, attr) {
        var val = null;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(ele, null)[attr];
        } else {
            if (attr === "opacity") {
                val = ele.currentStyle.filter;
                var reg = /^alpha\(opacity=(\d+(?:\.\d+)>)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = ele.currentStyle[attr];
            }
        }
        var reg2 = /^-?\d+(\.\d+)?(px|pt|em|rem|deg)?/;
        val = reg2.test(val) ? parseFloat(val) : val;
        return val;
    },
    setCss: function (ele, attr, val) {
        if (attr === "opacity") {
            ele.style.opacity = val;
            ele.style.filter = "alpha(opacity=" + val * 100 + ")";
            return;
        }
        if (attr === "float") {
            ele.style.cssFloat = val;
            ele.style.styleFloat = val;
            return;
        }
        var reg = /width|height|top|bottom|left|right|(margin|padding)(Left|Top|Right|Bottom)?/;
        if (reg.test(attr)) {
            if (!isNaN(val)) {
                val += "px";
            }
        }
        ele.style[attr] = val;
    },
    getElementsByClass: function (strClass, context) {
        context = context || document;
        if ("getComputedStyle" in window) {
            return context.getElementsByClassName(strClass);
        }
        var ary = [];
        var nodeList = context.getElementsByTagName("*");
        var classArray = strClass.replace(/^ +| +$/g, "").split(/ +/g);
        for (var i = 0; i < nodeList.length; i++) {
            var curTag = nodeList[i];
            var flag = true;
            for (var j = 0; j < classArray.length; j++) {
                var curClass = classArray[j];
                var reg = new RegExp("(^ +)" + curClass + "( +$)");
                if (!reg.test(curTag.className)) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                ary.push(curTag);
            }
        }


        return ary;
    },
    setGroupCss: function (ele, options) {//setGroupCss(oDiv,{width:100,height:100})
        //首先判断options是不是一个对象
        options = options || [];//没传的话是undefined undefined.toString报错
        if (options.toString() == "[object Object]") {
            for (var attr in options) {//for in循环可以遍历原型上公有的
                if (options.hasOwnProperty(attr)) {
                    this.setCss(ele, attr, options[attr]);//this->utils
                }

            }
        }
    }

};