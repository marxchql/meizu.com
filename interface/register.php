<?php
     include('./conn.php');


     $phone=$_REQUEST['phone'];
     $password=$_REQUEST['password'];
     $email=$_REQUEST['email'];
  
     $sql="select * from meiusers where phone='$phone'";
     $result=$mysqli->query($sql);
     if($result->num_rows){
        //  echo 'rwerwer5345345were';
        echo '{"status":300,"msg":"用户已经存在","register":false,"has":true}';
       
        }else{
          
            $insert="insert into meiusers (phone,password,email) values('$phone','$password','$email')";
           $res= $mysqli->query($insert);
           $mysqli->close();
          ;
            echo '{"status":200,"msg":"注册成功","register":true,"has":false}';
            // echo 'rwerwerwere';
 
         }
?>