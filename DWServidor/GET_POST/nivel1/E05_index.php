<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="E05.php" method="get">
        <label for="categoria">Producto:</label>
        <select name="categoria" id="categoria">
            <option value="Portatiles">Portatiles</option>
            <option value="Moviles">Moviles</option>
            <option value="Accesorios">Accesorios</option>
        </select>
        <label for="maxprice">Producto:</label>
        <input type="number" name="maxprice" id="maxprice">
        <button type="submit">Enviar</button>
    </form>
</body>
</html>