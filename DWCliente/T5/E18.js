import { Miembro } from './E13.js';
Miembro.prototype.estado = "De alta";

const m1 = new Miembro("Ekaitz", "nulo");
const m2 = new Miembro("Killian", "nulo");
console.log(m1.estado);
console.log(m2.estado);