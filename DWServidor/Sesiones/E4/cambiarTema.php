<?php
    session_start();
    $_SESSION["tema"] = $_POST["tema"];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="background-color: <?= $_SESSION["tema"]  ?>;">
</body>
</html>