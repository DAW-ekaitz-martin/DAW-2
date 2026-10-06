<?php
    require 'db.php';
    
    //Buscar
    $stmt = $cn ->prepare("SELECT * FROM alumnos");
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
</body>
</html>
