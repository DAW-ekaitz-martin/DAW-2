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
        $email = $_POST["email"] ?? "";
        $emailValidado = filter_var($email, FILTER_VALIDATE_EMAIL);
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            if($nombre=="") {
                echo "El nombre no puede estar vacío";
            }
            else if (!$emailValidado) {
                echo "Email incorrecto";
            } else {
                echo "Email correcto";
            }
        } else {
            echo "Petición incorrecta";
        }
    ?>  
</body>
</html>