<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <?php
        $aficiones = $_POST["aficiones"] ?? [];
        foreach($aficiones as $aficion) {
            if(isset($aficion)) {
                echo $aficion." seleccionada<br>";
            }
        }
        if($aficiones == []) {
            echo "Ninguna afición seleccionada<br>";
        }
    ?>  
</body>
</html>