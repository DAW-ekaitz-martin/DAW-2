<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php  
        $nombre = $_POST["nombre"] ?? "";
        $edad = (int)$_POST["edad"] ?? 0;
        $email = $_POST["email"] ?? "";
        $emailValido = filter_var($email, FILTER_VALIDATE_EMAIL);
        $curso = $_POST["curso"] ?? "";
        $turno = (int)$_POST["turno"] ?? 0;
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            if($nombre=="") {
                echo "El nombre no puede estar vacío<br>";
            }
            else if($edad <16 || $edad > 99) {
                echo "Edad incorrecta<br>";
            }
            else if(!$emailValido ||  $email == "") {
                echo "Email inválido<br>";
            }
            else if($curso=="") {
                echo "El curso no puede estar vacío<br>";
            }
            else if($turno== 0) {
                echo "Turno incorrecto<br>";
            }
            else if(!isset($_POST["aceptacion"])) {
                echo "Terminos y condiciones sin aceptar<br>";
            } else {
                echo "Resumen: <br>"."Nombre: ".htmlspecialchars($nombre, ENT_QUOTES,"UTF-8")."<br> Edad: ".htmlspecialchars($edad, ENT_QUOTES,"UTF-8")."<br> Email: ".htmlspecialchars($email, ENT_QUOTES,"UTF-8")."<br> Curso: ".htmlspecialchars($curso, ENT_QUOTES,"UTF-8")."<br> Turno: ".htmlspecialchars($turno, ENT_QUOTES,"UTF-8")."<br> Términos y condiciones aceptados";
            }
        } else {
            echo "Petición incorrecta";
        }
    ?>  
</body>
</html>