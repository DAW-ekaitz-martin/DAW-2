<?php 
    $a = 3.4;
    $round = round($a); 
    $ceil = ceil($a);
    $floor = floor($a);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>Redondeado: <?= $round ?></p>
    <p>Ceiling: <?= $ceil ?></p>
    <p>Floor: <?= $floor ?></p>
</body>
</html>