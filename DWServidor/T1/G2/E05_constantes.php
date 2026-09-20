<?php
    define("APP_NAME", "app");
    define("APP_ENV", "environment");
    define("APP_DEBUG", true);
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
        if(APP_DEBUG) {
    ?>
            <p>Modo debug activado</p>
            <p><?= APP_ENV ?></p>
            <p><p><?= APP_NAME ?></p></p>
    <?php

        } else {
    ?>
            <p>Modo debug desactivado</p>
    <?php 
            
        }
        ?>
</body>
</html>