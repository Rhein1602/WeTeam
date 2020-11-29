<?php 
$username=$_POST['username'];
$password=$_POST['pass'];
$realname=$_POST['realname'];
$phonenumber=$_POST['phonenumber'];
$schoolname=$_POST['schoolname'];
$studentid=$_POST['studentid'];
$major=$_POST['major'];
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
        echo "<script>window.location.href = \"register.html?msg=name1\"</script>";//返回之前的页面
    }else{
        $query=mysqli_query($link,"insert into client (name,password,nickname,phonenumber,schoolname,studentid,major) values('$username','$password','$realname','$phonenumber','$schoolname','$studentid','$major')");
        if (!$query) { 
            printf("Error: %s\n", mysqli_error($link)); 
            echo "<script>alert('failed');history.go(-1)</script>";
            exit();
    
        }else {
            setcookie("username",$username,time()+60*24*60,"/");
                setcookie("password",$password,time()+60*24*60,"/");
                $str = "<script>window.location= \"../Home.html?\";</script>";
                echo $str;
        }
    }
    
   
}
include('register.html');?>