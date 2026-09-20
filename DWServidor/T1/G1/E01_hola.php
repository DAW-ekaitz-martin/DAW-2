<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        // Configura tu zona horaria
        date_default_timezone_set("Europe/Madrid");
        $ahora = date("Y-m-d H:i"); // formato simple
        $nombre = "Ekaitz";
        echo "Hola, Mi nombre es: $nombre, Hora: $ahora"
    ?>
</body>
</html>