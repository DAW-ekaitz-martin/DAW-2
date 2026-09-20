<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $nota = 7.5;
        if($nota < 5) {
    ?>
    <p>SS</p>
    <?php 
        }else if($nota < 7){
    ?>
    <p>AP</p>
    <?php }else if($nota < 9){
    ?>
    <p>NT</p>
    <?php } else {
    ?>
    <p>SB</p>
    <?php }
    ?>
</body>
</html>