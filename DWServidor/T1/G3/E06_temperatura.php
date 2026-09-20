<?php 
    $celsius = 0;
    $farenheit= 32;
    $CaF = $celsius*9/5+32;
    $FaC = ($farenheit-32)*5/9;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>Celsius a farenheit: <?= $CaF ?></p>
    <p>Farenheit a Celsius: <?= $FaC ?></p>
</body>
</html>