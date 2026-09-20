<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $elementos1 = [3,6,5,5,8];
        $elementos2 = [14,56,74,2];
        $merge = array_merge($elementos1,$elementos2);
        foreach($merge as $elemento) {
            echo $elemento.",";
        }
    ?>
</body>
</html>