<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $elementos = [3,6,5,5,8];
        foreach($elementos as $elemento) {
            echo $elemento.",";
        }
        echo "<br>";
        $limpio = array_unique($elementos);
        foreach($limpio as $elemento) {
            echo $elemento.",";
        }
    ?>
</body>
</html>