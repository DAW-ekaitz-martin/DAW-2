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
    <form action="E05.php" method="post">
        <label for="teclado"></label>
        <input type="text" id="teclado" name="teclado" value="Teclado">Teclado
        <button type="submit">Enviar</button>
    </form>
    <form action="E05.php" method="post">
        <label for="raton"></label>
        <input type="text" id="raton" name="raton" value="Raton">Raton
        <button type="submit">Enviar</button>
    </form>
    <form action="E05.php" method="post">
        <label for="monitor"></label>
        <input type="text" id="monitor" name="monitor" value="Monitor">Monitor
        <button type="submit">Enviar</button>
    </form>
</body>
</html>