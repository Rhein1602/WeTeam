//存放图片的数组
let imglist = new Array("home/比赛1.png", "home/竞赛2.png", "home/竞赛3.jpg", "home/竞赛4.png");
let width = document.body.scrollWidth; //可视区域的宽
//console.log(width);
let img_width = width * 0.8; //每张图片的宽
let show = document.querySelector(".slideshow");
let box = document.querySelector(".slidebox");
let dots = document.querySelector(".dot");
let flag = -1; //
let index = 0; //图片下标
//设置定时器
let time = null;
//创建图片
function createImg() {
    for (let i = 0; i < imglist.length; i++) {
        let a = document.createElement("a"); //创建a标签
        a.href = "Detail/Details.html?id=0003"; //设置跳转路径
        a.style.width = img_width + "px";
        let img = document.createElement("img"); //创建img标签
        img.className = "slideimg"; //设置类
        img.src = imglist[i]; //设置图片的路径
        a.appendChild(img); //img标签添加到a标签中
        show.appendChild(a); //a标签添加到父标签中

    }
    //在结尾加上第一张图片
    let a = document.createElement("a"); //创建a标签
    a.href = "Detail/Details.html?id=0003"; //设置跳转路径
    a.style.width = img_width + "px";
    let img = document.createElement("img"); //创建img标签
    img.src = imglist[0]; //设置图片的路径
    img.className = "slideimg"; //设置类
    a.appendChild(img); //img标签添加到a标签中
    show.appendChild(a); //a标签添加到父标签中

};
//创建圆点
function createdot() {
    for (let i = 0; i < imglist.length; i++) {
        let span = document.createElement("span");
        //span.setAttribute("index",i);
        dots.appendChild(span);
    }
};

//自动登录
function autologin() {
    let username = $.cookie("username")
    console.log(username)
    let password = $.cookie("password")
    console.log(password)
    if (username != "" && password != "" && username != null && password != null) {
        $(".register").hide();
        $(".login").hide();
        $(".usename").show();
        $(".usename").text(username);
        $(".logout").show();
    } else {
        $(".register").show();
        $(".login").show();
        $(".usename").hide();
        $(".logout").hide();
    }
};
//页面加载时的初始化参数
function init() {
    box.style.width = img_width + "px"; //显示区域的和图片宽一样大
    show.style.width = (imglist.length + 1) * img_width + "px";
    createImg();
    createdot();
    dealRadius(0);
    autologin();
};
window.onload = init();
//图片自动轮播
function autoplay(e) {
    if (index == 0) {
        $('#slideshow').css({
            left: '0px'
        }); //处理无缝衔接图
        // 处理无缝衔接小圆点的跳转
    }
    index++;
    let distance = -index * img_width;
    $('#slideshow').animate({
        left: distance + 'px'
    });
    if (index >= imglist.length) {
        index = 0;
    }

    //console.log(index);
    dealRadius(index);

};
time = setInterval(autoplay, 3000);
//小圆点的点击实现
$('#dot').on('click', 'span', function () {
    clearInterval(time);
    index = $(this).index();
    //console.log($(this).index());

    dealRadius(index);
    let imageLeft = -img_width * index;
    $('#slideshow').css({
        left: imageLeft
    });
    time = setInterval(autoplay, 3000);
});
//小圆点的轮播实现
function dealRadius(num) {
    let lis = $('#dot span');
    lis.eq(num).css('background-color', '#0ecd73'); //选中颜色
    for (let i = 0; i < num; i++) {
        lis.eq(i).css('background-color', '#d1d7d4');
    }
    for (let i = num + 1; i < imglist.length; i++) {
        lis.eq(i).css('background-color', '#d1d7d4');
    }
    if (flag != -1 && flag != num) {
        lis.eq(flag).css('background-color', '#91f41f'); //鼠标放上去的颜色
    }
}
function logout(){
    $(".register").show();
        $(".login").show();
        $(".usename").hide();
        $(".logout").hide();
}



$('#right').click(function () {
    if ($('#slideshow').is(':animated')) { //防止多次点击出现问题
        return;
    }
    clearInterval(time);
    if (index == 0) {
        $('#slideshow').css({
            left: '0px'
        }); //处理无缝衔接图
        // 处理无缝衔接小圆点的跳转
    }
    index++;
    let imageLeft = -img_width * index;
    $('#slideshow').animate({
        left: imageLeft + "px"
    });
    if (index >= imglist.length) {
        index = 0;

    }
    time = setInterval(autoplay, 3000);
    dealRadius(index);
});

$('#left').click(function () {
    if ($('#slideshow').is(':animated')) { //防止多次点击出现问题
        return;
    }
    clearInterval(time);
    if (index == 0) {
        let distance = -img_width * imglist.length;
        $('#slideshow').css({
            left: distance + "px"
        });
        index = imglist.length;
    }
    index--;
    let imageLeft = -img_width * index;
    $('#slideshow').animate({
        left: imageLeft + "px"
    });

    dealRadius(index);

    time = setInterval(autoplay, 3000);
});
$('#slidebox').hover(function () {

    clearInterval(time);

}, function () {
    time = setInterval(autoplay, 3000);
});
$('#dot span').hover(function () {
    flag = $(this).index();
    if (index == flag) {
        return;
    }
    $(this).css("background-color", "#91f41f"); //hover时效果


}, function () {
    if (flag != index) {
        $(this).css("background-color", "#d1d7d4"); //未选中的颜色
    }
    flag = -1;
});