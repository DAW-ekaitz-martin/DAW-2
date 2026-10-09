<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="E05.php" method="post">
        <label for="nombre">Introduce el nombre: </label><br>
        <input type="text" name="nombre" id="nombre"><br><br>

        <label for="email">Introduce el email: </label><br>
        <input type="email" name="email" id="email"><br><br>

        <label for="nota">Introduce la nota(0-10): </label><br>
        <input type="number" step="0.1" name="nota" id="nota"><br><br>

        <button type="submit">Enviar</button>
    </form>
</body>
</html>
