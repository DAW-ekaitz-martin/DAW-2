<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="cambiarTema.php" method="post">
        <label for="tema">Elige una opcion</label>
        <select name="tema" id="tema">
            <option name="claro" id="claro" value="white">Claro</option>
            <option name="oscuro" id="oscuro" value="black">Oscuro</option>
            <option name="azul" id="azul" value="blue">Azul</option>
        </select>
        <button type="submit">Enviar</button>
    </form>
</body>
</html>