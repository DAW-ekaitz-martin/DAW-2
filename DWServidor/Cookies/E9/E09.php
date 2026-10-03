<?php 
    setcookie("identificador","hola",time() + 3600, "/","",true,true);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        echo "La cookie es: ".$_COOKIE["identificador"];
    ?>
</body>
</html>