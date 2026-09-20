<?php
    $nombre = "Ekaitz";
    $edad = "t";
    $ciudad = "Bilbao";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>Mi nombre es <?= $nombre ?></p>
    <?php
        if(is_numeric($edad)) {  
    ?>
            <p>Tengo <?= $edad ?> años</p>
    <?php
        } else {

        
    ?>
            <p>Edad no válida</p>
    <?php 
        }
    ?>
    <p>Vivo en <?= $ciudad ?></p>

</body>
</html>