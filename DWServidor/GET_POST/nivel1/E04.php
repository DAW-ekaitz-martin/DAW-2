<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        $productos = ["Camiseta", "Pantalones", "PC"];
        $producto = $_GET["q"];
        $encontrado = false;
        foreach($productos as $prod) {
            if($producto == $prod) {
                echo "Resultados para: ".htmlspecialchars($producto, ENT_QUOTES, "UTF-8");
                $encontrado = true;
            }
        }
        if(!$encontrado) {
            echo "No se ha encontrado el producto";
        }
    ?>
    
</body>
</html>