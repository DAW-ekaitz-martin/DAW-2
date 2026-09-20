<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $mes = 11;
        if($mes == 12 || $mes<=2) {
    ?>
        <p>Invierno</p>
    <?php 
        }else if($mes <=5){
    ?>
        <p>Primavera</p>
        <?php 
        }else if($mes <=8){
    ?>
        <p>Verano</p>
        <?php 
        }else if($mes <=11){
    ?>
        <p>Otoño</p>
    <?php } else {
    ?>
    <p>Ese numero de mes no existe</p>
    <?php }
    ?>
</body>
</html>