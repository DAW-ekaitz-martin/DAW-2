class Viaje {
    constructor(destino, duracion, precio) {
        this.destino = destino;
        this,duracion = duracion;
        this.precio = precio;
    }
    toString() {
        return `Destino: ${this.destino}, Duracion: ${this.duracion}, Precio: ${this.precio}`;
    }
}

class ViajeGrupo extends Viaje{
    constructor(destino, duracion, precio, numPersonas) {
        super(destino,duracion, precio);
        this.numPersonas = numPersonas;
    }
    toString() {
        return `${super.toString()}, Numero Personas: ${this.numPersonas}`;
    }
}
const v1 = new Viaje("Madrid", 22, 12000);
const v2 = new Viaje("Oslo", 5, 1500);
const v3 = new Viaje("Minsk", 9, 3000);

const vg1 = new ViajeGrupo("Madrid", 22, 12000, 5);
const vg2 = new ViajeGrupo("Oslo", 5, 1500, 7);
const vg3 = new ViajeGrupo("Minsk", 9, 3000, 9);
const viajes = [v1,v2,v3,vg1,vg2,vg3];
for(let viaje of viajes) {
    console.log(viaje.toString());
}
console.log("Borrando numero de personas de os viajes grupales")
for(let viaje of viajes) {
    if(viaje instanceof ViajeGrupo) {
        delete viaje.numPersonas;
    }
    console.log(viaje.toString());
}
