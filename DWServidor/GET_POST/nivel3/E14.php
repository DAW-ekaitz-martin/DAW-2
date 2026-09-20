<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <?php
        $nombre = $_POST["nombre"] ?? "";
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            echo "Nombre: ".$nombre;
        }
    ?>  
</body>
</html>