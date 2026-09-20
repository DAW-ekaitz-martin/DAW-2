<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
     <?php  
        $curso = $_POST["curso"] ?? "";
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            if($curso=="") {
                echo "Curso no válido";
            } else {
                echo "Curso seleccionado: ".$curso;
            }
        } else {
            echo "Petición incorrecta";
        }
    ?>  
</body>
</html>