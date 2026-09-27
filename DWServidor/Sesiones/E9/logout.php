<?php
    session_start();
    session_unset();
    session_destroy();
    header("Location:E09_formulario.php");
    exit;
?>