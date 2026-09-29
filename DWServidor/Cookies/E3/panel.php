<?php
    if(isset($_POST["color"])) {
        setcookie("color", $_POST["color"], time()+3600);
        echo "El color es: ".$_COOKIE["color"];
    } else {
        echo "No has elegido ningún color todavía";
    }
    

?>