<?php
     include('./conn.php');


     $phone=$_REQUEST['phone'];
     $password=$_REQUEST['password'];
     echo  $phone;
     echo $password;
    //  die();
  
     $sql="select * from meiusers where phone='$phone'and password='$password'";
     $result=$mysqli->query($sql);
     if($result->num_rows>0){
        //  echo 'rwerwer5345345were';
        
    //     $insert="insert into meiusers (phone,password,email) values('$phone','$password','$email')";
    //    $res= $mysqli->query($insert);
    //    $mysqli->close();
    //   ;
        // echo '{"status":200,"msg":"登录成功","login":true,"has":false}';
    }else{
        
        // echo '{"status":300,"msg":"密码不正确","login":false,"has":true}';
            // echo 'rwerwerwere';
 
         }
?>