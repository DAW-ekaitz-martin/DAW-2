<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $actividades = ["Futbol", "Natacion", "Tenis"];
        $actividad = $_GET["actividad"]?? "";
        $encontrada = false;
        if($actividad != "") {
            foreach($actividades as $act) {
                if($act == $actividad) {
                    $encontrada = true;?>
                    <form action="E20.php" method="post">
                        <p>Actividad: <?= htmlspecialchars($actividad, ENT_QUOTES, "UTF-8") ?></p>
                        <input type="hidden" name="actividad" value="<?= htmlspecialchars($actividad, ENT_QUOTES, "UTF-8") ?>">

                        <label for="nombre">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" >

                        <label for="email">Email: </label>
                        <input type="email" name="email" id="email">

                        <label for="numPlazas">Número de plazas:</label>
                        <input type="number" id="numPlazas" name="numPlazas" >

                        <label for="turno">Turno:</label>
                        <input type="radio" id="turno_m" name="turno" value="Mañana">Mañana
                        <input type="radio" id="turno_t" name="turno" value="Tarde">Tarde
                        <button type="submit">Enviar</button>
                    </form>
                <?php
                } 
            } 
            if(!$encontrada) {
                echo "La actividad selecionada no existe";
            }
        }else {
                echo "Ninguna actividad selecionada";
            }
    ?>
    
</body>
</html>