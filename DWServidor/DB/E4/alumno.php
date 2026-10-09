<?php
    require '../db.php';

    if(isset($_GET['id']) && $_GET['id'] > 0) {
        $id = (int)$_GET['id'];
    }
    $stmt = $cn->prepare("SELECT * FROM alumnos WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $res = $stmt->get_result()->fetch_assoc();//Guardo el fetch_assoc aquí también porque sé que res solo va a tener 1 registro, ya que el id el PK
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <table border="1" cellpadding="6">
        
        <?php
            if($res) {?>
                <tr><th>ID</th> <th>Nombre</th> <th>Email</th> <th>Nota</th> <th>Fecha de Alta</th></tr>
                    <tr>
                        <td><?= htmlspecialchars($res["id"], ENT_QUOTES,"UTF-8") ?></td>
                        <td><?= htmlspecialchars($res["nombre"], ENT_QUOTES,"UTF-8") ?></td>
                        <td><?= htmlspecialchars($res["email"], ENT_QUOTES,"UTF-8") ?></td>
                        <td><?= number_format((float)$res["nota"],2,',', '.') ?></td>
                        <td><?= htmlspecialchars($res["created_at"], ENT_QUOTES,"UTF-8") ?></td>
                    </tr>
        <?php   } else {
                    http_response_code(404);
                    echo 'No se ha encontrado ningún alumno con ese id';
                }
        ?>
    </table>
</body>
</html>
