<?php
    if(isset($_POST["tema"])) {
        setcookie("tema",$_POST["tema"],time() + 3600, "/", "", true, false);
    }
    if(isset($_POST["idioma"])) {
        setcookie("idioma",$_POST["idioma"],time() + 3600, "/", "", true, false);
    }
    if(isset($_POST["nombre"])) {
        setcookie("nombre",$_POST["nombre"],time() + 3600, "/", "", true, false);
    }
    header("Location:panel.php");
?>