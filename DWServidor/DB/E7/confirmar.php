<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1 style="color:red;"><strong>ATENCIÓN</strong></h1><br>
    <p>Vas a borrar al siguiente alumno de la base de datos:</p>
    <?php 
        if(isset($_POST["id"])) {
            $id = $_POST["id"];
            $stmt = $cn->prepare("SELECT * FROM alumnos WHERE id = ?;");
            $stmt->bind_param('i', $id);
            $stmt->execute();
            $res = $stmt->get_result();
            if($res){?>
                <table border="1" cellpadding="6">
                    <tr><th>ID</th> <th>Nombre</th> <th>Email</th> <th>Nota</th> <th>Fecha de Alta</th></tr>
    <?php 
                while($r= $res->fetch_assoc()){
        ?>
                <tr>
                    <td><?= htmlspecialchars($r["id"], ENT_QUOTES,"UTF-8") ?></td>
                    <td><?= htmlspecialchars($r["nombre"], ENT_QUOTES,"UTF-8") ?></td>
                    <td><?= htmlspecialchars($r["email"], ENT_QUOTES,"UTF-8") ?></td>
                    <td><?= number_format((float)$r["nota"],2,',', '.') ?></td>
                    <td><?= htmlspecialchars($r["created_at"], ENT_QUOTES,"UTF-8") ?></td>
                </tr>
        <?php
        }}} else {
            echo "Id inválido";
        }
    ?>
    <form action="confirmar.php" method="post">

        <label for="id">Introduce el id del alumno que quieres borrar: </label><br>
        <input type="number" name="id" id="id"><br><br>
        <button type="submit">Enviar</button>
    </form>
</body>
</html>
