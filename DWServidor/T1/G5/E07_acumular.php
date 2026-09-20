<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
    $suma = 0;
        while($suma <50) {
            echo $suma."<br>";
            $suma+= ($suma+1);
        }
        echo "Suma superior a 50";
    ?>
</body>
</html>