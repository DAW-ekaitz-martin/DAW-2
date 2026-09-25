<?php 
    session_start();
    if(!isset($_SESSION["productos"])) {
        $_SESSION["productos"] = [];
    }
    $teclado = $_POST["teclado"] ?? "";
    $raton = $_POST["raton"] ?? "";
    $monitor = $_POST["monitor"] ?? "";
    
    if($teclado != "") {
        array_push($_SESSION["productos"], $teclado);
    }
    if($raton != "") {
        array_push($_SESSION["productos"], $raton);
    }
    if($monitor != "") {
        array_push($_SESSION["productos"], $monitor);
    }
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
        $cont = 0;
        $productos = $_SESSION["productos"];
        echo "Contenido del array:<br>";
        foreach($productos as $producto) {
            echo $producto."<br>";
            $cont ++;
        }
        echo "Total de productos guardados en el carrito: ".$cont;
    ?> 
</body>
</html>