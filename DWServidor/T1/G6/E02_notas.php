<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $alumnos = ["Ana"=> 3, "Luis"=> 6];
        foreach($alumnos as $nombre=> $nota) {
            echo $nombre.":".$nota."<br>";
        }
    ?>
</body>
</html>