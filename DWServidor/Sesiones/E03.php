<?php
    session_start();
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
        if($_SESSION["visitas"]) {
            $_SESSION["visitas"]++;
        } else {
            $_SESSION["visitas"] = 1;
        }
        echo "Has visitado esta página ".$_SESSION["visitas"]." veces";
    ?>
</body>
</html>