<?php 
$username=$_POST['username'];
$password=$_POST['pass'];
session_start();
$_SESSION['one']=$username;
$_SESSION['loginfailname']=0;
$_SESSION['loginfailpass']=0;
$link = mysqli_connect('localhost','one','wjhz4Z7mriacnNkL','one');
if ($link->connect_error){
    echo '数据库连接失败！';
    exit(0);
}
$sql="SELECT name,password FROM client WHERE name = '$username'";
$result = $link->query($sql);
$row = mysqli_fetch_array($result);

if($_POST['submit']){    
    if($row['name']==$username){
        if($row['password']==$password){
            $_SESSION['loginfailname']=0;
            $_SESSION['loginfailpass']=0;
            
            setcookie("username",$username,time()+60*24*60,"/");
            setcookie("password",$row['password'],time()+60*24*60,"/");
            $str = "<script>window.location= \"../Home.html?\";</script>";
            echo $str;
        }else{
            $_SESSION['loginfailpass']=1;
            echo "<script>window.location.href = \"login.html?msg=password\"</script>";//返回之前的页面
        }
    }else {
        $_SESSION['loginfailname']=1;
        echo "<script>window.location.href = \"login.html?msg=name\"</script>";//返回之前的页面
    }
}
include('login.html');?>