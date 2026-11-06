const boton = document.getElementById("saludar");
const mensaje = document.getElementById("mensaje");
function saludar() {
    mensaje.innerHTML="Hola, DAW";
}

const evento = boton.addEventListener("click", saludar);