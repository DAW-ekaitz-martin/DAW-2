<?php
    if(isset($_POST["tema"])) {
        setcookie("tema", $_POST["tema"], time()+604800);
        echo $_COOKIE["tema"];
    } else {
        echo "No has elegido ningún tema";
    }
?>