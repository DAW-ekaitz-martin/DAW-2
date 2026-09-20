<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
     <?php  
        $importe = $_POST["importe"] ?? 0;
        $codPromocional = $_POST["codPromocional"] ?? "";
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            if($codPromocional=="DAW10") {
                $importe -= $importe*0.10;
            }
            echo "Importe: ".$importe;
        } else {
            echo "Petición incorrecta";
        }
    ?>  
</body>
</html>