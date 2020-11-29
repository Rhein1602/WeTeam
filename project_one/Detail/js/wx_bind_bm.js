(function(){
        
    // 竞赛报名信息页弹出
    if(getCookie("time_wxcg") != 1){  //若cookie== 1弹 
        $('.alert-over-box').removeClass('hide'); 
        setCookie('time_wxcg', '1', { expires: 1 });   //设置cookie为1
        
    }else{ 
        return ;
    } 

    // 点击取消 遮罩层关闭
    $('.alert-over-box').off('click','.closeover').on('click','.closeover',function(){  
        clearInterval(timeInter); 
        var $t=$(this);   
        $t.parents('.alert-over-box').hide(); 
        setCookie('time_wxcg', "1", {expire:24*3600,path:'/',domain:'saikr.com'});
    })

    // 点击继续 
    $(".continu-link").bind("click",function(){  
        setCookie('time_wxcg', "1", {expire:24*3600,path:'/',domain:'saikr.com'});
        $(".alert-over-box").hide(); 
        clearInterval(timeInter);
    }) 

    // 之前保留
    /*if(getCookie("time_wxcg") == 1){ 
        $('.alert-over-box').addClass('hide');   
        clearInterval(timeInter);
    }  

    if(getCookie("time_wxcg") == 2){
        $('.alert-over-box').removeClass('hide'); 
    }*/

    //判断绑定
    if($('.alert-over-box').css("display") == "block"){   
        var url = '/wechat/check_wechat_bind';
        var timeInter = setInterval(function () {
            $.ajax({
                url : url,
                type : 'get',
                success : function(data){
                    data = eval("(" + data + ")"); 
                    if(data.code == 0){//绑定成功  
                        setCookie('time_wxcg', "1", {expire:24*3600,path:'/',domain:'saikr.com'});
                        $('.bind-ever').css('display', "none");
                        $('.bind-success').css('display', "block");
                        // 3秒消失
                        var wait=$(".time-num").text();
                        timer = setInterval(function(){
                            if(wait==0){
                                $(".alert-over-box").hide();  
                                clearInterval(timer); 
                                clearInterval(timeInter); 
                            }else{
                                wait--;
                                $(".time-num").text(wait); 
                            }
                        },1000);
                        
                    }else if(data.code == 500){//未绑定  
                        $('.alert-over-box').removeClass('hide'); 
                    }else if(data.code == 300){ 
                        layer.msg("微信号已绑定，请更换微信重新扫码"); 
                        // ajax_message("微信号已绑定，请更换微信重新扫码");
                    }else{
                        $('.alert-over-box').removeClass('hide');

                    } 
                },error:function(){ 
                    //error
                }
            }); 
    
        },5000) 
    }else{ 
        clearInterval(timeInter); 
    }

   
    
    //微信绑定 3天不显示 
    $("#no-show").bind("click",function(){
        $.ajax({
            url : "/wechat/set_time_expire",
            type : 'get',
            success : function(data){
                data = eval("(" + data + ")"); 
                if(data.code == 0){
                    clearInterval(timeInter);
                    $('.alert-over-box').addClass('hide');
                    setCookie('is_onelogin', null, {
                        expire:-1, path: '/',domain:'saikr.com'
                    });   
                    setCookie('time_wxcg', null, {expire:3*24*3600,path:'/',domain:'saikr.com'});
                }
            },error:function(){ 
                //error
            }
        });
    });

})()

//设置cookie方法
function setCookie(c_name,value,json)
{
    var exdate=new Date();
    exdate.setTime(exdate.getTime()+json.expire*1000);
    document.cookie=c_name+ "=" +escape(value)+
    ((json.expire==null) ? "" : ";expires="+exdate.toGMTString())+";path="+json.path+";domain="+json.domain;
};

//获取cookie方法
function getCookie(c_name)
{
    var c_start,c_end;
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1)
        { 
            c_start=c_start + c_name.length+1 
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        } 
    }
    return ""
}; 

//清除cookie
function clearCookie(name) {
    setCookie(name, "", {expire:-1,path:'/',domain:'saikr.com'});
}