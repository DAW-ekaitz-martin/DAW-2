//E11
/*let alumno = {
    nombre:"Ekaitz",
    edad:22,
    curso:"DAW2",
    nota:10,
}
console.log(alumno);
console.log(alumno.nombre);
console.log(`El alumno ${alumno.nombre} ha sacado un ${alumno.nota} en ${alumno.curso}`);*/

//12
/*const videojuego = {
titulo: "Minecraft",
horas: 25,
terminado: false
};
console.log(`Horas actuales: ${videojuego.horas}`);
videojuego.horas = 40;
videojuego.terminado = true;
console.log(videojuego);*/
//13
/*const productos = [
{ nombre: "Ratón", precio: 20 },
{ nombre: "Teclado", precio: 50 },
{ nombre: "Monitor", precio: 180 }
]
productos.forEach(producto=> console.log(`Nombre: ${producto.nombre} - Precio: ${producto.precio}`));*/
//14
/*const productos = [
{ nombre: "Ratón", precio: 20, stock: 4 },
{ nombre: "Teclado", precio: 50, stock: 0 },
{ nombre: "Monitor", precio: 180, stock: 3 },
{ nombre: "Auriculares", precio: 70, stock: 0 }
];
//Manera pro
let stock = productos.filter(producto => producto.stock>0);
//Manera fácil
/*productos.forEach(producto => {
    if(producto.stock > 0) {
        stock.push(producto);
    }
})*/
//console.log(stock);

//E15
/*const productos = [
{ nombre: "Ratón", precio: 20, stock: 4 },
{ nombre: "Teclado", precio: 50, stock: 0 },
{ nombre: "Monitor", precio: 180, stock: 3 },
{ nombre: "Auriculares", precio: 70, stock: 0 }
];
const precioAlto = productos.filter(producto => producto.precio < 80);
console.log(precioAlto);*/

//E16
const productos = [
{ nombre: "Ratón", precio: 20, stock: 4 },
{ nombre: "Teclado", precio: 50, stock: 0 },
{ nombre: "Monitor", precio: 180, stock: 3 },
{ nombre: "Auriculares", precio: 70, stock: 0 }
];
const nombres = [];
productos.forEach(producto => nombres.push(producto.nombre));
console.log(nombres);




