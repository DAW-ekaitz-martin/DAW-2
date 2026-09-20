<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <?php  
        $turno = $_POST["turno"] ?? "";
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            if($turno == "") {
                echo "Turno inválido";
            }
            else {
                echo "Turno seleccionado: ".$turno;
            }
        } else {
            echo "Petición incorrecta";
        }
    ?>  
</body>
</html>