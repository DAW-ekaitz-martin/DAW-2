<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php  
        $nombre = trim($_POST["nombre"]) ?? "";
        $email = trim($_POST["email"]) ?? "";
        $asunto = trim($_POST["asunto"]) ?? "";
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            if($nombre=="" || $email=="" || $asunto == "") {
                echo "Faltan campos obligatorios";
            }
            else {
                echo "Formulario válido";
            }
        } else {
            echo "Petición incorrecta";
        }
    ?>  
</body>
</html>