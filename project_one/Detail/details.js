

//自动登录
function autologin() {
    let username = $.cookie("username");
    //console.log(username)
    let password = $.cookie("password");
    //console.log(password)
    if (username !== "" && password !== "" && username !== null && password !== null) {
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
}

function getInfomation()
{
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
        }
    }
    var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    httpRequest.open('POST', 'test/getInfo.php', true); //第二步：打开连接
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
    httpRequest.send('id='+theRequest['id']);//发送请求 将情头体写在send中
    var list;
    /**
    * 获取数据后的处理程序
    */
                
    httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
            var json = httpRequest.responseText;//获取到服务端返回的数据
                          
            list = JSON.parse(json);
            $(".event-title").text(list.gameName);
            x = document.getElementById("gameInfo");
            x.innerHTML=list.gameInfo;
            //$(".event4-1-detail-text-box").text(list.gameInfo)
            $("span[id='level']").text(list.gameLevel);
            $("span[id='type']").text(list.gameType);
            $("a[id='administrator']").attr("title",list.administrator);
            $("a[id='administrator']").text(list.administrator);
            var signupStart = list.signupStart;
            var signupEnd = list.signupEnd;
            var gameStrat = list.gameStart;
            var gameEnd = list.gameEnd;
            var nowdate = getFormatDate();
            
            if(checkEndTime(signupStart,nowdate)){
                $("h3[id='signup']").text("报名时间  尚未开始");
                $("div[id='signup2']").text("报名时间  尚未开始");
            }else if(checkEndTime(nowdate,signupEnd)){
                $("h3[id='signup']").text("报名时间  距离截至还有"+DateDiff(nowdate,signupEnd)+"天");
                $("div[id='signup2']").text("报名时间  距离截至还有"+DateDiff(nowdate,signupEnd)+"天");
            }else{
                 $("h3[id='signup']").text("报名时间  已经结束");
                 $("div[id='signup2']").text("报名时间  已经结束");
            }
            x = document.getElementById("signupTime");
            x.innerHTML=signupStart+"&nbsp;至&nbsp;"+signupEnd;
            $("div[id='signupTime2']").text(signupStart+" 至 "+signupEnd)
            //$("div[id='signupTime']").text(signupStart+"&nbsp;至&nbsp;"+signupEnd)
            $("div[id='gameTime']").text(signupStart+" 至 "+signupEnd);
            
            if(checkEndTime(gameStart,nowdate)){
                $("h3[id='time']").text("比赛时间  尚未开始");
            }else if(checkEndTime(nowdate,gameEnd)){
                $("h3[id='time']").text("比赛时间  距离结束还有"+DateDiff(nowdate,signupEnd)+"天");
            }else{
                 $("h3[id='time']").text("比赛时间  已经结束");
            }
            
            
        }
    };
}
//获取当前时间
function getFormatDate(){
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}

function checkEndTime(startTime,endTime){

    var start=new Date(startTime.replace("-", "/").replace("-", "/"));

    var end=new Date(endTime.replace("-", "/").replace("-", "/"));
    if(end<start){
         return false;
    }
    return true;
    // var list1 = startTime.split(" ");
    // var list2 = endTime.split(" ");
    // var ymd1 = list1[0].split("-");
    // var ymd2 = list2[0].split("-");
    // var index=0;
    // for(var tt in ymd1){
    //     var a = parseInt(tt);
    //     var b = parseInt(ymd2[index]);
    //     if(a > b){
    //         return true;
    //     }
    //     if(b > a){
    //         return false;
    //     }
    //     index++;
    // }
    // var hm1 = list1[1].split(":");
    // var hm2 = list2[1].split(":");
    
    // index=0;
    // for(var tt2 in hm1){
    //     var a2 = parseInt(tt2);
    //     var b2 = parseInt(hm2[index]);
    //     if(a2 > b2){
    //         return true;
    //     }
    //     if(b2 > a2){
    //         return false;
    //     }
    //     index++;
    // }
    // return true;
}
//返回连个时间相差的日期
function DateDiff(sDate1, sDate2) {
    var date1,date2;
    date1 = sDate1.split(" ");
    date2 = sDate2.split(" ");
    var aDate, oDate1, oDate2, iDays;
    aDate = date1[0].split("-");
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);  //转换为yyyy-MM-dd格式
    aDate = date2[0].split("-");
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
    return iDays;  //返回相差天数
}
//页面加载时的初始化参数
function init() {
    autologin();
    
    getInfomation();
}
window.onload = init()


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