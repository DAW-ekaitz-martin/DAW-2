<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="E06.php" method="post">
        <label for="tema">Seleccione la variable a eliminar</label>
        <input type="radio" id="tema" name="tema" value="tema">Tema
        <button type="submit">Restablecer tema</button>
    </form>
</body>
</html>