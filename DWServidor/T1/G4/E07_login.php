<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $user = "eka";
        $pass = 1234;
        if($user=="eka"&&$pass==1234) {
    ?>
        <p>Acceso conseguido</p>
    <?php } else {
    ?>
    <p>Acceso denegado</p>
    <?php }
    ?>
</body>
</html>