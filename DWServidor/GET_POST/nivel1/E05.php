<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        $categoria = $_GET["categoria"] ?? "Sin categoria";
        $maxPrice = $_GET["maxprice"] ?? "Sin límite de precio";
        if($maxPrice == "") {
            $maxPrice = "Sin límite de precio";
        }
        echo "Resumen: <br>";
        echo "Categoría: ".$categoria."<br>";
        echo "Precio máximo: ".$maxPrice;
    ?>
    
</body>
</html>