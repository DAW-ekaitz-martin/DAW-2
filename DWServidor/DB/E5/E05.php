<?php
    require '../db.php';
    if(isset($_POST["nombre"]) && isset($_POST["email"]) && isset($_POST["nota"]) && (float)$_POST["nota"] > 0 && (float)$_POST["nota"] < 10) {
        $nombre = $_POST["nombre"];
        $email = $_POST["email"];
        $nota = (float)$_POST["nota"];
        if($nombre && $email && $nota) {
            //Comprobar si el nuevo registro existe en la tabla
            $stmtCheck = $cn->prepare("SELECT * FROM alumnos WHERE nombre = ? AND email = ? AND nota = ?;");
            $stmtCheck->bind_param('ssd', $nombre, $email, $nota);
            $stmtCheck->execute();
            $find = $stmtCheck->get_result()->fetch_assoc();
            if($find) {
                echo "El registro que intentas añadir ya existe en la tabla";
            } else {
                $stmt = $cn->prepare("INSERT INTO alumnos (nombre, email, nota) VALUES (?, ?, ?);");
                $stmt->bind_param('ssd',$nombre, $email, $nota);
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