<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $numero = 7;
        $numero2 = 7;
        if($numero>$numero2) {
    ?>
        <p>El <?= $numero ?> es mayor</p>
    <?php 
        }else if($numero<$numero2){
    ?>
        <p>El <?= $numero2 ?> es mayor</p>
    <?php } else {
    ?>
    <p>Son iguales</p>
    <?php }
    ?>
</body>
</html>