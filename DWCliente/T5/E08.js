const articulo = {
    nombre:"Camiseta",
    categoria:"Moda",
    precio:24.45,
    unidades:12,
    describe: function() {
        console.log(this.nombre);
        console.log(this.categoria);
        console.log(this.precio);
        console.log(this.unidades);
    }
}
const nuevaPropiedad = "color";
articulo[nuevaPropiedad] = "rojo";
console.log(articulo);
articulo.describe();
articulo.precio=34;
articulo.describe();