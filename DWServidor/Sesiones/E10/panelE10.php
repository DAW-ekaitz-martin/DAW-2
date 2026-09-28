<?php
    session_start();
    $tema = $_SESSION["tema"] ?? "white";
    $fontColor = $_SESSION["fontColor"] ?? "black";
    $idioma = $_SESSION["idioma"] ?? "es";
    $admin = $_SESSION["admin"] ?? "";
    echo $admin."<br>";
?>
<!DOCTYPE html>
<html lang="<?= $idioma?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="background-color: <?= $tema?>; color:<?=  $fontColor?>;">
    <?php
        if(isset($_SESSION["username"]) && isset($_SESSION["password"])){
            $username = $_SESSION["username"];
            $password = (int)$_SESSION["password"];
        } else {
            $username = $_POST["username"];
            $password = (int)$_POST["password"];
        }
        if($username == "admin" && $password == 1234) {

            $_SESSION["username"] = $username;
            $_SESSION["password"] = $password;
            if(isset($_SESSION["visitas"])) {
                $_SESSION["visitas"] ++;
            } else {
                $_SESSION["visitas"] = 1;
            }
            if(isset($_SESSION["admin"]) && $admin != "") {
                echo "Bienvenido admin<br>";
            } else {
                echo "Bienvenido usuario<br>";
            }
            
            echo "Total de visitas en la sesión: ".htmlspecialchars($_SESSION["visitas"])."<br>";
    ?>
            <a href="logout.php">Cerrar Sesión</a>
            <form action="preferencias.php" method="post">
                <label for="tema">Elige un Tema</label>
                <select name="tema" id="tema">
                    <option name="claro" id="claro" value="white">Claro</option>
                    <option name="oscuro" id="oscuro" value="black">Oscuro</option>
                    <option name="azul" id="azul" value="blue">Azul</option>
                </select>
                <br>
                <label for="idioma">Elige el idioma</label>
                <select name="idioma" id="idioma">
                    <option name="idioma" id="idioma" value="es">Español</option>
                    <option name="idioma" id="idioma" value="en">Inglés</option>
                    <option name="idioma" id="idioma" value="eus">Euskera</option>
                </select>
                <button type="submit">Enviar</button>
            </form>
    <?php
        } else {
            header("Location:E10_formulario.php");
            exit;
        }
    ?>
</body>
</html>