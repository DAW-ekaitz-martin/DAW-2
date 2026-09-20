<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $elementos = [1,2,3,4];
        sort($elementos);
        foreach($elementos as $elemento) {
            echo $elemento.",";
        }
        echo"<br>";
        rsort($elementos);
        foreach($elementos as $elemento) {
            echo $elemento.",";
        }
        
    ?>
</body>
</html>