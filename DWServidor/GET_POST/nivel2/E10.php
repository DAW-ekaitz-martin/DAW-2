<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <?php  
        $edad = (int)$_POST["edad"] ?? -1;
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            if($edad< 0 || $edad >120) {
                echo "Edad inválida";
            }
            else {
                echo "Edad válida";
            }
        } else {
            echo "Petición incorrecta";
        }
    ?>  
</body>
</html>