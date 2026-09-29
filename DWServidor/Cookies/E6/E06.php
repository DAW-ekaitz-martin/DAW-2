<?php
    setcookie("preferencia", "hola",time() + 3600);
    echo "Cookie:". $_COOKIE["preferencia"];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="panel.php" method="post">
        <button type="submit">Enviar</button>
    </form>
</body>
</html>