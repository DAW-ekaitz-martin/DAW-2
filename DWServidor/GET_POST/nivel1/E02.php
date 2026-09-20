<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $nombre = $_GET["nombre"];
        $ciudad = $_GET["ciudad"];
        echo $nombre." vive en ".$ciudad;
    ?>
    
</body>
</html>