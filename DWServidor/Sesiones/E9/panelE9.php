<?php
    session_start();
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
        $username = $_POST["username"] ?? "";
        $password = (int)$_POST["password"] ?? "";
        if($username == "admin" && $password == 1234) {

            $_SESSION["username"] = $username;
            $_SESSION["password"] = $password;
            echo "Bienvenido admin";
    ?>
            <a href="logout.php">Cerrar Sesión</a>
    <?php
        } else {
            header("Location:E09_formulario.php");
            exit;
        }
    ?>
</body>
</html>