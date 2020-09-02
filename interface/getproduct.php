<?php
    include('./conn.php');

    $sql = "select * from product";

    $res = $mysqli->query($sql);

    $mysqli->close();

    $arr = array();

    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    $json = json_encode($arr);

    echo $json;

    
    // INSERT INTO `product`(`title`, `price`, `picture`, `num`, `details`) VALUES ('魅族 16Xs','1099.00','{[/img/15/small1.jpg],[/img/15/small2.jpg],[/img/15/small3.jpg],[/img/15/small4.jpg],[/img/15/big1.jpg],[/img/15/big2.jpg],[/img/15/big3.jpg],[/img/15/big4.jpg]}','33','极边全面屏 | 4800W AI三摄 | 疾速屏下指纹 | 4000mAh大电池 | 高通骁龙675 | Onemind 3.0 | 绚丽多彩新色系')

?>