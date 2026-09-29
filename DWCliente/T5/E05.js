const videoJuego = new Object();
videoJuego.nombreUsuario = "eka29";
videoJuego.nivel=32;
videoJuego.puntosAcumulados = 84;
videoJuego.aumentarPuntos = function(puntos) {
    videoJuego.puntosAcumulados+=puntos;
}
console.log(videoJuego);
videoJuego.aumentarPuntos(23);
videoJuego.aumentarPuntos(23);
console.log(videoJuego);