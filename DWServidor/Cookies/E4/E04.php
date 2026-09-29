<?php 
    setcookie("idioma", "es", time()+2592000);
    $fechaLimite = time()+2592000;
    echo date('Y-m-d H-i-s', $fechaLimite);
?>