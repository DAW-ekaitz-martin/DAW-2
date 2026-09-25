<?php
    session_start();
    $_SESSION["usuario"] = "Ane";
    $_SESSION["curso"] = "2DAW";
    $_SESSION["tema"] = "oscuro";
    //echo "Tema: ".$_SESSION["tema"];
    if($_POST["tema"]) {
        unset($_SESSION["tema"]);
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        echo $_POST["tema"]. " eliminado";
        //echo "Tema: ".$_SESSION["tema"];

    ?>
</body>
</html>