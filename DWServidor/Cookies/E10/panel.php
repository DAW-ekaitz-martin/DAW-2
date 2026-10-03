<?php 
        
    $tema = $_COOKIE["tema"] ?? "white";
    if($tema == "black") {
        $colorLetra = "white";
    } else {
        $colorLetra = "black";
    }
    $idioma = $_COOKIE["idioma"] ?? "es";
    if(isset($_COOKIE["nombre"])) {
        $nombre = $_COOKIE["nombre"];
    }
        
?>
<!DOCTYPE html>
<html lang=<?=$idioma?>>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="background-color: <?= $tema ?>; color: <?= $colorLetra ?>">
    <form action="preferencias.php" method="post">
        <label for="tema">Elige un tema:</label><br>
        <select name="tema" id="tema">
            <option value="white">Claro</option>
            <option value="black">Oscuro</option>
        </select><br><br>

        <label for="idioma">Elige un diioma:</label><br>
        <select name="idioma" id="idioma">
            <option value="es">Español</option>
            <option value="eu">Euskera</option>
            <option value="en">Inglés</option>
        </select><br><br>

        <label for="nombre">Ingrese su nombre: </label><br>
        <input type="text" name="nombre" id="nombre">

        <button type="submit">Enviar</button>
    </form>
    <?php
        if($nombre) {
            echo"Bienvenido ".$nombre;
        }
    ?>
</body>
</html>