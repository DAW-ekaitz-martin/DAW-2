class Producto2 {
    constructor(precio, unidades, descuentoTemp) {
        this.precio = precio;
        this.unidades = unidades;
        this.descuentoTemp = descuentoTemp;
    }
    toString() {
        return `Precio: ${this.precio}, Unidades : ${this.unidades}, Descuento Temp: ${this.descuentoTemp}`;
    }
}
const p1 = new Producto2 ("Camiseta", 43, 10);
console.log(p1.descuentoTemp);
delete p1.descuentoTemp;
console.log(p1.descuentoTemp);