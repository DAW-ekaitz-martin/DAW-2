
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        for($i = 0; $i <= 4; $i ++) {
            $numero = rand(1,100); 
        
    ?>
    <p><?= $numero ?></p>
    <?php 
        }
    ?>
</body>
</html>