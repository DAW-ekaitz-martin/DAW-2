<?php

use function PHPSTORM_META\type;

    $entero = 3;
    $real = 4.6;
    $cadena = "Hola";
    $booleano = true;
    $nulo = null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p><?php if(is_int($entero)) {
    ?> Es entero</p>
    <?php }
    ?>
    <p><?php if(is_float($real)) {
    ?> Es real</p>
    <?php }
    ?>
    <p><?php if(is_string($cadena)) {
    ?> Es cadena</p>
    <?php }
    ?>
    <p><?php if(is_bool($booleano)) {
    ?> Es booleano</p>
    <?php }
    ?>
    <p><?php if(is_null($nulo)) {
    ?> Es nulo</p>
    <?php }
    ?>
</body>
</html>