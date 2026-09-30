<?php
    if(!isset($_POST["nombre"])) {
        header("Location:E7.php");
    }
    else if(!isset($_COOKIE["nombre"])) {
        setcookie("nombre", $_POST["nombre"], time() + 604800);
    }
    else {
        echo "Bienvenido de nuevo, ".htmlspecialchars($_COOKIE["nombre"]);
    }  
?>