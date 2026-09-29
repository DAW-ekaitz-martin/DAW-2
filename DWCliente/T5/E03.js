const reserva = {
    origen: "Bilbao",
    destino:"Madrid",
    numeroViajeros: 12,
    precioTotal: 120,
    resumen: function () {
        const precioPorViajero = this.precioTotal/ this.numeroViajeros;
        console.log("Resumen de la reserva:");
        console.log(`Origen: ${this.origen}`);
        console.log("destino: ", this.destino);
        console.log("numeroViajeros: ", this.numeroViajeros);
        console.log("precioTotal: ", this.precioTotal);
        console.log("Por viajero: ", precioPorViajero);
    }
}
reserva.resumen();
reserva.numeroViajeros=3;
reserva.resumen();
