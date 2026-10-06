import { Miembro } from './E13.js';
export class Alumno extends Miembro {
    constructor(nombre, estadoVinculacion, numAsignaturas) {
        super(nombre, estadoVinculacion);
        this.numAsignaturas = numAsignaturas;
    }
    presentacion() {
        return `${super.presentacion()} y mi número de asignaturas es ${this.numAsignaturas}`;
    }
}
/*const alumno = new Alumno("Ekaitz", "hola", 7);
console.log(alumno.presentacion());*/