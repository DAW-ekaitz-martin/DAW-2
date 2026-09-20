<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $numero1 = filter_var($_GET["numero1"] ?? 4, FILTER_VALIDATE_INT, ["options" => ["default" => 4]]);
        $numero2 = filter_var((int)$_GET["numero2"] ?? 4, FILTER_VALIDATE_INT, ["options" => ["default" => 4]]);
        $suma = $numero1 + $numero2;
        $resta = $numero1 - $numero2; 
        $multi = $numero1 * $numero2; 
        $divi = $numero1 / $numero2; 
        echo "Suma: ".$suma."<br>";
        echo "resta: ".$resta."<br>";
        echo "Multi: ".$multi."<br>";
        echo "Divi: ".$divi."<br>";
    ?>
    
</body>
</html>