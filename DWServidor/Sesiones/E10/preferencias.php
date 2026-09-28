<?php
    session_start();
    $_SESSION["tema"] = $_POST["tema"];
    $_SESSION["idioma"] = $_POST["idioma"];
    if($_SESSION["tema"] == "black") {
        $_SESSION["fontColor"] = "white";
    } else {
        $_SESSION["fontColor"] = "black";
    }
    header("Location:panelE10.php");
?>