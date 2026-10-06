class Viaje {
    constructor (destino, duracion, precioTotal, numPersonas) {
        this.destino = destino;
        this.duracion = duracion;
        this.precioTotal = precioTotal;
        this.numPersonas = numPersonas;
    }
    precioPorPersona() {
        if(this.numPersonas != 0) {
            return this.precioTotal/this.numPersonas;
        } else {
            return 'El número de personas de este viaje no es válido';
        }
        
    }
    resumen() {
        console.log(`Destino: ${this.destino}`);
        console.log(`Duración: ${this.duracion}`);
        console.log(`Precio total: ${this.precioTotal}€`);
        console.log(`Núero de Personas: ${this.numPersonas}`);
    }
}
const viaje1 = new Viaje("Paris", 3, 1345, 2);
const viaje2 = new Viaje("Alabama", 3, 1345, 0);
console.log(viaje1.precioPorPersona());
console.log(viaje2.precioPorPersona());
viaje2.resumen();
