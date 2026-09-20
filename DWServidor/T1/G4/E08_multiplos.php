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
        if($numero %5==0 && $numero%3==0) {
    ?>
    <p>Ambos</p>
    <?php 
        }else if($numero %5==0){
    ?>
    <p>Multiplo de 5</p>
    <?php }else if($numero %3==0){
    ?>
    <p>Multiplo de 3</p>
    <?php } else {
    ?>
    <p>Ninguno</p>
    <?php }
    ?>
</body>
</html>