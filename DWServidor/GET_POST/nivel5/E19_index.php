<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="E19.php" method="post">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" >

        <label for="edad">Edad:</label>
        <input type="number" id="edad" name="edad" >

        <label for="email"></label>Email: </label>
        <input type="email" name="email" id="email">

        <label for="curso">Curso:</label>
        <input type="text" id="curso" name="curso" >

        <label for="turno">Turno:</label>
        <input type="number" id="turno" name="turno" >

        <label for="aceptacion">Aceptacion:</label>
        <input type="checkbox" id="aceptacion" name="aceptacion" >
        <button type="submit">Enviar</button>
    </form>
</body>
</html>