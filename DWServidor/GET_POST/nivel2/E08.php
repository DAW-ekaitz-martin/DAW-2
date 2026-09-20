<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php  
        $usuario = $_POST["usuario"] ?? "";
        $password = $_POST["password"] ?? "";
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            if($usuario=="admin" && $password=="1234") {
                echo "Acceso permitido";
            }
            else {
                echo "Datos incorrectos";
            }
        } else {
            echo "Petición incorrecta";
        }
    ?>  
</body>
</html>