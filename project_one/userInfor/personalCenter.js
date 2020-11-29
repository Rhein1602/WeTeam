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
    /*var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
        }
    }*/
    let username = $.cookie("username");

    var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    httpRequest.open('POST', 'person.php', true); //第二步：打开连接
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
    httpRequest.send('username='+username);//发送请求 将情头体写在send中
    var list;
    /**
    * 获取数据后的处理程序
    */
                
    httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
            var json = httpRequest.responseText;//获取到服务端返回的数据
            console.log(json);
            list = JSON.parse(json);
            var user={flag:0, //0代表学生，1代表发布者
                name:'陶元',
                school:'npu',
                major: 'software',
                grade: '3' ,
                studentid:'2018303039',
                age: "19",
                sex: "男",
                phoneno:'14755304987',
                nickname:'启翔湖大水怪',
                description:'xxxxx默认描述'
                };
            user.flag=list.flag;
            user.name=list.name;
            user.school=list.schoolname;
            user.major=list.major;
            user.grade=list.grade;
            user.studentid=list.studentid;
            user.age=list.age;
            user.sex=list.sex;
            user.phoneno=list.phonenumber;
            user.nickname=list.nickname;
            user.description=list.description;
            return user;
           /* $(".event-title").text(list.gameName);
            x = document.getElementById("gameInfo");
            x.innerHTML=list.gameInfo;
            //$(".event4-1-detail-text-box").text(list.gameInfo)
            $("span[id='level'").text(list.gameLevel);
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
            */
            
        }
    }
    return null;
}





$(document).ready(function(){

    //autologin();
    var user = getInfomation();
    console.log(user.flag);
    if(user.flag==0){
        $('.student-info').attr('id',"show-info");
        $('.sponsor-info').attr('id',"unshow-info");
        $('#playergame-info').show();
        $('#publishergame-info').hide();
        $('#info').hide();
        $('#fabu').hide();
        var str = "";
        var i =0;
        for(;i<5;i++)
        {
            str = str+'<li class="game-list"><a href="#"><img src="home/比赛1.png" class="game-img" alt=""><p class="game-name">'+'全国大赛'+'</p></a></li>';
        }
        $('#playgame-list').html(str);
        var st="";
        
            st=st+'<div class="info-box"><span class="info-text">'+'昵称: '+'</span>'+'<p>'+user.nickname +'</p>'+'</div>';
            st=st+'<div class="info-box"><span class="info-text">'+'姓名: '+'</span>'+'<p>'+user.name +'</p>'+'</div>';
            st=st+'<div class="info-box"><span class="info-text">'+'学校: '+'</span>'+'<p>'+user.school +'</p>'+'</div>';
            st=st+'<div class="info-box"><span class="info-text">'+'年级: '+'</span>'+'<p>'+user.grade +'</p>'+'</div>';
            st=st+'<div class="info-box"><span class="info-text">'+'专业: '+'</span>'+'<p>'+user.major +'</p>'+'</div>';
            st=st+'<div class="info-box"><span class="info-text">'+'学号: '+'</span>'+'<p>'+user.studentid +'</p>'+'</div>';
            st=st+'<div class="info-box"><span class="info-text">'+'年龄: '+'</span>'+'<p>'+user.age +'</p>'+'</div>';
            st=st+'<div class="info-box"><span class="info-text">'+'性别: '+'</span>'+'<p>'+user.sex +'</p>'+'</div>';
            st=st+'<div class="info-box"><span class="info-text">'+'电话: '+'</span>'+'<p>'+user.phoneno +'</p>'+'</div>';
       
        $('#student-info').html(st);

    }else if(user.flag==1){
        $('.student-info').attr('id',"unshow-info");
        $('.sponsor-info').attr('id',"show-info");
        $('#playergame-info').hide();
        $('#publishergame-info').show();
        $('#info').hide();
        $('#cansai').hide();
        var str = "";
        var i =0;
        for(i=0;i<6;i++)
        {
            str = str+'<li class="game-list"><a href="#"><img src="home/比赛1.png" class="game-img" alt=""><p class="game-name">'+'全国大赛'+'</p></a></li>';
        }
        $('#publishgame-list').html(str);
        var st="";
        
            st=st+'<div class="info-box"><span class="info-text">'+'名称: '+'</span>'+'<p>'+user.name +'</p>'+'</div>';
            st=st+'<div class="info-box"><span class="info-text">'+'描述: '+'</span>'+'<p>'+user.description +'</p>'+'</div>';
            
       
        $('#sponsor-info').html(st);
    }
    $('#show-info').show();
    $('#unshow-info').hide();


});

$('#cansai').click(function(){
    $('#cansai').attr('class','person-item on');
    $('#fabu').attr('class','person-item');
    $('#gerenxinxi').attr('class','person-item');
    $('#info').hide();
    $('#playergame-info').show();
    $('#publishergame-info').hide();
   
});
$('#fabu').click(function(){
    $('#cansai').attr('class','person-item');
    $('#fabu').attr('class','person-item on');
    $('#gerenxinxi').attr('class','person-item');
    $('#info').hide();
    $('#playergame-info').hide();
    $('#publishergame-info').show();
   
});
$('#gerenxinxi').click(function(){
    $('#cansai').attr('class','person-item');
    $('#fabu').attr('class','person-item');
    $('#gerenxinxi').attr('class','person-item on');
    $('#info').show();
    $('#playergame-info').hide();
    $('#publishergame-info').hide();
});
