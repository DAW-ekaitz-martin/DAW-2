<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $media = 0;
        $elementos = [3,6,5,8];
        foreach($elementos as $elemento) {
            $media+=$elemento;
        }
        $media/=count($elementos);
        echo $media;
        echo "<br>";
        $mayor = max($elementos);
        echo $mayor;
        echo "<br>";
        $menor = min($elementos);
        echo $menor;
    ?>
</body>
</html>