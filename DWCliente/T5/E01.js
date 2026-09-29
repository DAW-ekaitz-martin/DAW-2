const pelicula = {
    titulo:"Origen",
    direccion: "Christopher Nolan",
    anioDeEstreno: 2005,
    duracionMinutos: 150
}
console.log(pelicula.anioDeEstreno);
console.log(pelicula.titulo);
console.log(pelicula["direccion"]);
console.log(pelicula["duracionMinutos"]);
pelicula.duracionMinutos = 160;
console.log(pelicula["duracionMinutos"]);
