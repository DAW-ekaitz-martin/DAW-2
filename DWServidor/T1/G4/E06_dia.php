<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $numero = 3;
        switch($numero) {
            case 1:
    ?>
                <p>Lunes</p>
    <?php 
            break;
            case 2:
    ?>
                <p>Martes</p>
    <?php 
            break;
            case 3:
    ?>
                <p>Miercoles</p>
    <?php
            break; 
            case 4:
    ?>
                <p>Jueves</p>
    <?php 
            break;
            case 5:
    ?>
                <p>Viernes</p>
    <?php 
            break;
            case 6:
    ?>
                <p>Sabado</p>
    <?php 
            break;
            case 7:
    ?>
                <p>Domingo</p>
    <?php 
        }
    ?>
</body>
</html>