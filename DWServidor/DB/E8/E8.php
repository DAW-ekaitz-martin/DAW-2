<?php
    require '../db.php';
?>
    <form action="E8.php" method="post">
        <label for="nombre">Ingrese el nombre:</label>
        <input type="text" id="nombre" name=nombre>

        <label for="nota">Ingrese la nota:</label>
        <input type="number" id="nota" name=nota>

        <button type="submit">Enviar</button>
    </form>
<?php
    if(isset($_POST["nombre"]) && isset($_POST["nota"]) && $_POST["nota"] >=0 && $_POST["nota"] <=10) {
        $nombre = trim($_POST["nombre"]);
        $like = "%{$nombre}%";
        $nota = (int)$_POST["nota"];
        //Buscar
        $stmt = $cn ->prepare("SELECT * FROM alumnos WHERE nombre LIKE ? AND nota >= ?;");
        $stmt -> bind_param('si',$like, $nota);
        
    } else if(isset($_POST["nombre"])) {
        $nombre = trim($_POST["nombre"]);
        $like = "%{$nombre}%";
        $stmt = $cn ->prepare("SELECT * FROM alumnos WHERE nombre LIKE ?;");
        $stmt -> bind_param('s',$like);
    } else if(isset($_POST["nota"]) && $_POST["nota"] >=0 && $_POST["nota"] <=10) {
        $nota = (int)$_POST["nota"];
        $stmt = $cn ->prepare("SELECT * FROM alumnos WHERE nota >= ?;");
        $stmt -> bind_param('i',$nota);
    } else {
        $stmt = $cn ->prepare("SELECT * FROM alumnos;");
        $stmt -> bind_param('i',$nota);
    }
    $stmt->execute();
    $res = $stmt->get_result();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        if($res->num_rows == 0) {
            echo "El resultado de la busqueda está vacío";
        } else {
    ?>
            <table border="1" cellpadding="6">
                <tr><th>ID</th> <th>Nombre</th> <th>Email</th> <th>Nota</th> <th>Fecha de Alta</th></tr>
                <?php 
                while($r = $res->fetch_assoc()) {?>
                <tr>
                    <td><?= htmlspecialchars($r["id"], ENT_QUOTES,"UTF-8") ?></td>
                    <td><?= htmlspecialchars($r["nombre"], ENT_QUOTES,"UTF-8") ?></td>
                    <td><?= htmlspecialchars($r["email"], ENT_QUOTES,"UTF-8") ?></td>
                    <td><?= number_format((float)$r["nota"],2,',', '.') ?></td>
                    <td><?= htmlspecialchars($r["created_at"], ENT_QUOTES,"UTF-8") ?></td>
                </tr>
                <?php } ?>
            </table>
    <?php
        } ?>
</body>
</html>
