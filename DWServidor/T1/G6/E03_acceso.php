<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $elementos = [3,6,5,8];
        $ultimo = $elementos[count($elementos)-1];
        $primero = $elementos[count($elementos)-count($elementos)];
        echo "Primero: ".$primero."<br>";
        echo "Ultimo: ".$ultimo;
    ?>
</body>
</html>