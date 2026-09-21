<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="cambiarTema.php" method="post">
        <label for="tema"></label>
        <select name="tema" id="tema">
            <option value="claro" name="claro" id="claro" value="claro"></option>
            <option value="oscuro" name="oscuro" id="oscuro" value="oscuro"></option>
            <option value="azul" name="azul" id="azul" value="azul"></option>
            <button type="submit">Enviar</button>
        </select>
    </form>
</body>
</html>