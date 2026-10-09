<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="editar.php" method="post">

        <label for="id">Introduce el id del alumno que quieres cambiar: </label><br>
        <input type="number" name="id" id="id"><br><br>


        <label for="nombre">Introduce el nombre nuevo: </label><br>
        <input type="text" name="nombre" id="nombre"><br><br>

        <label for="nota">Introduce la nota nueva(0-10): </label><br>
        <input type="number" step="0.1" name="nota" id="nota"><br><br>

        <button type="submit">Enviar</button>
    </form>
</body>
</html>
