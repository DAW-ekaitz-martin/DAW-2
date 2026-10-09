<?php
    require '../db.php';
    if(isset($_POST["nombre"]) && isset($_POST["id"]) && isset($_POST["nota"]) && (float)$_POST["nota"] > 0 && (float)$_POST["nota"] < 10) {
        $id =   $_POST["id"];  
        $nombre = $_POST["nombre"];
        $nota = (float)$_POST["nota"];
        if($nombre && $nota) {
            //Comprobar si el registro existe en la tabla
            //$stmtCheck = $cn->prepare("SELECT * FROM alumnos WHERE nombre = ? AND nota = ?;");
            $stmtCheck = $cn->prepare("SELECT * FROM alumnos WHERE id = ?;");
            $stmtCheck->bind_param('i', $id);
            $stmtCheck->execute();
            $find = $stmtCheck->get_result()->fetch_assoc();
            if(!$find) {
                echo "El registro que intentas modificar no existe en la tabla";
            } else {
                $stmt = $cn->prepare("UPDATE alumnos SET nombre = ?,nota = ? WHERE id = ?;");
                $stmt->bind_param('sdi',$nombre, $nota, $id);
                $stmt->execute();
            }
        }
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
        $stmt2= $cn->prepare("SELECT * FROM alumnos;");
        $stmt2->execute();
        $res = $stmt2->get_result();
        if($res) {?>
            <table border="1" cellpadding="6">
                <tr><th>ID</th> <th>Nombre</th> <th>Email</th> <th>Nota</th> <th>Fecha de Alta</th></tr>
                <?php
                while($r = $res->fetch_assoc()) {
        ?>
                    <tr>
                        <td><?= htmlspecialchars($r["id"], ENT_QUOTES,"UTF-8") ?></td>
                        <td><?= htmlspecialchars($r["nombre"], ENT_QUOTES,"UTF-8") ?></td>
                        <td><?= htmlspecialchars($r["email"], ENT_QUOTES,"UTF-8") ?></td>
                        <td><?= number_format((float)$r["nota"],2,',', '.') ?></td>
                        <td><?= htmlspecialchars($r["created_at"], ENT_QUOTES,"UTF-8") ?></td>
                    </tr>
    <?php
            }
    ?>      
            </table>
    <?php
        } else {
            echo "No existe ningún registro en la tabla";;
        }
    } else {
        echo "Formulario incompleto o campo de nota inválido";
    }
    ?>
</body>
</html>