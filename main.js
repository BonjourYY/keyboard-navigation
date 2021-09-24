// 1.初始化数据
var data = init()["keys"]
var hash = init()["hash"]

// 2.生成键盘
generayKeyboard(data, hash);

// 3.监听按键事件
listenToUser(hash);

// 4.工具函数
function getFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name) || "null");
}

function createTag(tagName, className) {
    var tag = document.createElement(tagName);
    for (var key in className) {
        tag[key] = className[key];
    }
    return tag;
}

function init() {
    var data = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["z", "x", "c", "v", "b", "n", "m"],
    ];

    var hash = {
        q: "https://www.iqiyi.com",
        w: "https://www.baidu.com", // 这里用小写的 w 试一下
    };

    newHash = getFromLocalStorage("zzz");
    if (newHash) {
        hash = newHash;
    }

    return {
        "keys": data,
        "hash": hash
    }
}

function generayKeyboard(data, hash) {
    for (var index1 = 0; index1 < data.length; index1++) {
        var div = createTag("div", { className: "row" })
        for (var index2 = 0; index2 < data[index1].length; index2++) {

            var span = createTag("span", { className: "text", textContent: data[index1][index2] })

            var img = document.createElement("img");
            img.src = hash[data[index1][index2]] + "/favicon.ico";

            var button = createTag("button", { textContent: "编辑", id: data[index1][index2] });
            button.onclick = function (e) {
                var newWebsite = prompt("请给我一个加了 http 协议的网址");
                hash[e["target"]["id"]] = newWebsite; // hash 变更
                var img2 = e["target"].nextSibling; //获取 img 元素
                img2.src = hash[e["target"]["id"]] + "/favicon.ico";
                // 存放到localstorage
                localStorage.setItem("zzz", JSON.stringify(hash));
            };

            var kbd = createTag("kbd", { className: "key" });

            kbd.appendChild(span);
            kbd.appendChild(button);
            kbd.appendChild(img);
            div.appendChild(kbd);
        }
        wrapper.appendChild(div);
    }
}

function listenToUser(hash) {
    document.onkeydown = function (e) {
        var key = e["key"];
        website = hash[key];
        if (!hash[key]) {
            alert("您还没有对键位" + "「" + e["key"] + "」" + "绑定网址哦！");
        } else {
            // location.href = website; 在当前页打开
            window.open(website, "_blank");
        }
    };
}