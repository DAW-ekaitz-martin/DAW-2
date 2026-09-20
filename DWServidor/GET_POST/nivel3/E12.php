<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <?php
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            if(isset($_POST["condiciones"])) {
                echo "Registro enviado";
            }
            else {
                echo "Debes aceptar las condiciones";
            }
        } else {
            echo "Petición incorrecta";
        }
    ?>  
</body>
</html>