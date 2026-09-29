<?php
    setcookie("nombre", "Ane", time()+3600);
    setcookie("curso", "DAW2", time()+3600);
    header("Location:mostrar.php")
?>