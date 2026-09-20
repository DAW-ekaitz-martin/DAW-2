<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $numeros = [4,65,7,8,9];
        foreach($numeros as $numero) {
            if($numero === 7) {
                echo "Encontrado";
                break;
            }
        }
    ?>
</body>
</html>