<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php  
        $texto = $_POST["texto"] ?? "";
        $genero = $_POST["genero"] ?? "";
        $maxPrice = (int)$_POST["maxPrice"] ?? 0;
        $activo = false;
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            if($texto!="") {
                echo "Filtro de texto activo<br>";
                $activo = true;
            }
            if($genero!="") {
                echo "Filtro de genero activo<br>";
                $activo = true;
            }
            if($maxPrice!="" && $maxPrice>0) {
                echo "Filtro de precio máximo activo<br>";
                $activo = true;
            } 
            if (!$activo){
                echo "No hay ningún filtro activo<br>";
            }
        } else {
            echo "Petición incorrecta";
        }
    ?>  
</body>
</html>