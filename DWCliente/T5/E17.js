class Producto {
    constructor(nombre, stock) {
        this.nombre = nombre;
        this.stock = stock;
    }
}
let p1 = new Producto("Camiseta", 23);
let p2 = new Producto("Pantalones", 39);
let p3 = new Producto("PC", 94);
const productos = [p1,p2,p3];
for (let produco of productos) {
    console.log(Object.getOwnPropertyNames(produco));
}