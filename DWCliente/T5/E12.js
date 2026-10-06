class Telefono{
    constructor(cpu, ram, almacenamiento, ancho, alto, numeroCamaras) {
        this.cpu = cpu;
        this.ram = ram;
        this.almacenamiento = almacenamiento;
        this.ancho = ancho;
        this.alto = alto;
        this.numeroCamaras = numeroCamaras;
    }
    toString() {
        return `Informacion del telefono:\n
                CPU: ${this.cpu}
                RAM: ${this.ram}
                Almacenamiento: ${this.almacenamiento}
                ancho: ${this.ancho}
                alto: ${this.alto}
                Numero de cámaras: ${this.numeroCamaras}
                `;
    }
}
const tel1 = new Telefono("Intel 5a", 24, 150, 34,56,2);
const tel2 = new Telefono("AMD 5a", 46, 350, 34,23,2);
const tel3 = new Telefono("Ryzen 5a", 65, 200, 34,56,2);
console.log(tel1.toString());
console.log(tel2.toString());
console.log(tel3.toString());