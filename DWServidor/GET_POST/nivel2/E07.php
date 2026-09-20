<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php  
        $nombre = $_POST["nombre"] ?? "Sin nombre";
        $apellidos = $_POST["apellidos"] ?? "Sin apellidos";
        if($_SERVER["REQUEST_METHOD"] != "POST") {
            echo "La petición no es post, los datos no se procesarán";
        } else {
            echo "Hola ".htmlspecialchars($nombre, ENT_QUOTES, "UTF-8")." ".htmlspecialchars($apellidos, ENT_QUOTES, "UTF-8");
        }
    ?>  
</body>
</html>