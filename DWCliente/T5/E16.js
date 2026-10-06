import { Alumno } from './E14.js';
import { Profesor, Miembro } from './E13.js';
const al1 = new Alumno("Ekaitz", "ninguno", 6);
const al2 = new Alumno("Walid", "ninguno", 6);
const al3 = new Alumno("Mateo", "ninguno", 6);
const pr1 = new Profesor("Aritz", "ninguno", "Programación")
const pr2 = new Profesor("Alex", "ninguno", "IA")
const miembros = [al1, pr1, al2, pr2, al3];
let contAl = 0;
let contPr = 0;
miembros.forEach(element => {
    if(element instanceof Alumno) {
        console.log(`${element.nombre} es un Alumno`);
        contAl++;
    } else {
        console.log(`${element.nombre} es un Profesor`);
        contPr++;

    }
    if(element instanceof Miembro) {
        console.log(`${element.nombre} es un Miembro`);
    }
});
console.log(`Hay ${contAl} alumnos y ${contPr} profesores`);