class Producto{
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
    setStock(unidadesendidas) {
        this.stock -= unidadesendidas;
    }
}
const miProducto = new Producto("Movil",23.99,24);
const miProducto2 = new Producto("TV",45,63);
console.log(miProducto);
console.log(miProducto2);
miProducto2.setStock(21);
console.log(miProducto2);