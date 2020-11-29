<?php

$username = $_POST['username'];
    $link = mysqli_connect('localhost','one','wjhz4Z7mriacnNkL','one');
    if ($link->connect_error){
        echo '数据库连接失败！';
        exit(0);
    }
    $sql = "SELECT * FROM client WHERE name = '$username'";
    $result =  $link->query($sql);
    $row = mysqli_fetch_array($result);
     $json = json_encode($row,JSON_UNESCAPED_UNICODE);
    echo $json;
?>