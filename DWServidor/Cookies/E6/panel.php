<?php
    setcookie("preferencia", "hola",time() - 3600);
    header("Location:E06.php");
?>