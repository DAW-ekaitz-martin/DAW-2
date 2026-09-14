//E1
/*const nombre = prompt("Tu nombre:");
const veces = Number(prompt("¿Cuántas veces?:"));
for (let i = 0; i < veces; i++) {
    console.log(`Hola, ${nombre}`)
}*/

//E2
/*const precio = Number(prompt("Precio unitario:"));
const cantidad = Number(prompt("Cantidad:"));
const IVA = 0.21;
const subtotal = precio * cantidad;
const ivaImporte = subtotal*IVA;
const total = subtotal + ivaImporte;
console.log(`Subtotal: ${subtotal.toFixed(2)}€`);
console.log(`IVA: ${ivaImporte.toFixed(2)}€`);
console.log(`Total: ${total.toFixed(2)}€`);*/

//E3
/*const n = Number(prompt("Nota (0-10):"));
if (Number.isNaN(n)) {
console.log("Entrada no válida");
} else {
const nRounded = n.toFixed(1);
console.log(`Nota: ${nRounded}`);
}*/

//E4
/*const dni = prompt("DNI con letra:");
const limpio = dni.trim().toUpperCase();
console.log(limpio);*/

//E5
/*const pass = prompt("Contraseña:") ?? "";
const larga = pass.length >= 8;
const tieneNumero = /[0-9]/.test(pass); // TODO: completa el patrón
if (larga && tieneNumero) {
console.log("Fuerte");
} else {
console.log("Falta:", [
larga ? null : "8+ caracteres",
tieneNumero ? null : "un número",
].filter(Boolean).join(", "));
}*/


//E6
/*const dias = Number(prompt("Días:"));
const horas = Number(prompt("Horas:"));
const segundos = (dias * 24 + horas) * 3600;
console.log(segundos);*/

//E7
/*let a = 5;
let b = 8;
[ a,b ] = [ b,a ];
console.log(a, b);*/

//E8
/*const nombre = prompt("Nombre:")?.trim();
const email = prompt("Email:") ?? "";
const normalizado = email.trim().toLowerCase();
// TODO: usa template literal
console.log(`Hola, ${nombre}. Te escribimos a ${normalizado}`);*/

//E9
const tiradas = [];
for (let i = 0; i < 10; i++) {
const d = Math.floor(Math.random() * 6) + 1;
tiradas.push(d);
}
const suma = tiradas.reduce((acc, n) => acc + n, 0);
const media = suma / tiradas.length;
console.log(tiradas, `Media: ${media.toFixed(2)}`);







