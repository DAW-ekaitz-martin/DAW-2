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
        $precio = $_GET["precio"];
        $stock = $_GET["stock"];  
        echo htmlspecialchars($nombre, ENT_QUOTES, "UTF-8")."<br>";  
        echo htmlspecialchars($precio, ENT_QUOTES, "UTF-8")."<br>";
        echo htmlspecialchars($stock, ENT_QUOTES, "UTF-8")."<br>";
        
    ?>
</body>
</html>