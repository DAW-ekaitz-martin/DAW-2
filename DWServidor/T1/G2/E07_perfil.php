<?php
    $nombre = "Ekaitz";
    $curso = "DAW_2";
    $email = null;
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
        if($email) {
    ?>
            <p><?= $nombre ?></p>
            <p><?= $curso ?></p>
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