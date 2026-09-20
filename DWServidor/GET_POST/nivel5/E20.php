<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        $actividad = $_POST["actividad"] ?? "";  
        $nombre = trim($_POST["nombre"] ?? "");
        $email = $_POST["email"] ?? "";
        $numPlazas = (int)($_POST["numPlazas"] ?? 0);
        $emailValido = filter_var($email, FILTER_VALIDATE_EMAIL);
        $turno = $_POST["turno"] ?? "";
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            if($nombre=="") {
                echo "El nombre no puede estar vacío<br>";
            }
            else if($numPlazas <1 || $numPlazas > 4) {
                echo "Numero de plazas incorrectas<br>";
            }
            else if(!$emailValido ||  $email == "") {
                echo "Email inválido<br>";
            }
            else if($turno== "" && !in_array($turno, ["Mañana, Tarde"],true)) {
                echo "Turno inválido<br>";
            } else {
                echo "Resumen: <br>"."Actividad: ".htmlspecialchars($actividad, ENT_QUOTES,"UT-8")."<br>Nombre: ".htmlspecialchars($nombre, ENT_QUOTES,"UT-8")."<br> Email: ".htmlspecialchars($email, ENT_QUOTES,"UT-8")."<br> Número de plazas: ".htmlspecialchars($numPlazas, ENT_QUOTES,"UT-8")."<br> Turno: ".htmlspecialchars($turno, ENT_QUOTES,"UT-8");
            }
        } else {
            echo "Petición incorrecta";
        }
    ?>  
</body>
</html>