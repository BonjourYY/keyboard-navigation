// 1、创建div,存放到div这个变量里面
// var div = document.createElement("div");
// 2、将div作为儿子，放到id为wrapper这个div里面
// wrapper.appendChild(div);
// 3、利用循环，存放三个div

// 定义数据结构
var data = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
]

// 定义 Hash 对应表
var hash = {
    q: "https://www.iqiyi.com",
    w: "https://www.baidu.com" // 这里用小写的 w 试一下
}

newHash = JSON.parse(localStorage.getItem("zzz") || 'null')
if(newHash){
     hash = newHash;
}


var index1 = 0;
while (index1 < data.length) {
    var div = document.createElement("div");
    wrapper.appendChild(div);
    // 创建 kbd
    var index2 = 0;
    while (index2 < data[index1].length) {
        var kbd = document.createElement("kbd");
        var span = document.createElement("span");
        span.textContent = data[index1][index2];
        var button = document.createElement("button");
        button.textContent = "编辑";
        button.id = data[index1][index2];
        kbd.appendChild(span);
        kbd.appendChild(button);
        // 监听button事件
        button.onclick = function (e) {
            var newWebsite = prompt("请给我一个网址")
            hash[e["target"]["id"]] = newWebsite; // hash 变更
            // 存放到localstorage
            localStorage.setItem("zzz",JSON.stringify(hash));
        }
        div.appendChild(kbd);
        index2 += 1;
    }
    index1 += 1; // 这里需要写 += ，不然会陷入死循环
}

// 监听按键事件
// 这里有 BUG！！！onkeypress(已弃用) 和 onkeydown 产生的 bug
document.onkeydown = function (e) {
    var key = e["key"];
    website = hash[key];
    if(!hash[key]){
        alert("您还没有对键位" + "「" + e["key"] +  "」"+  "绑定网址哦！")
    }else{
        // location.href = website; 在当前页打开
        window.open(website, "_blank");
    }
}



