<?php 
    session_start();
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
        $nombre = $_SESSION["nombreAlumno"] ?? "";
        $curso = $_SESSION["curso"] ?? "";
        $asignatura = $_SESSION["AsignaturaFav"] ?? "";
        echo "Nombre: ".htmlspecialchars($nombre)."<br> Curso:".$curso."<br>Asignatura favorita:".$asignatura;
    ?>
</body>
</html>