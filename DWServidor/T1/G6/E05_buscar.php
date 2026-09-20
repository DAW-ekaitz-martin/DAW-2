<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $elementos = ["Manolo", "Pepe", "Cristóbal"];
        if(in_array("Pepe", $elementos)) {
            echo "Sí está";
        } else {
            echo "No está";
        }
        
    ?>
</body>
</html>