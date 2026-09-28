<?php
    session_start();
    session_unset();
    session_destroy();
    header("Location:E10_formulario.php");
    exit;
?>