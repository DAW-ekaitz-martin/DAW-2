<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $numero = 12449583;
        $cont = 0;
        while($numero > 9) {
            $cont++;
            $numero/=10;
        }
        $cont++;
        echo $cont;
    ?>
</body>
</html>