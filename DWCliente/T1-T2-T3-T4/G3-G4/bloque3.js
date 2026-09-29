//19
function mostrarBienvenida() {
    console.log(`Bienvenido a JavaScript`);
}
//mostrarBienvenida();
//mostrarBienvenida();
//20
function saludar(nombre) {
    console.log(`Hola, ${nombre}`);
}
//saludar("Ane");
//saludar("Mikel");
//21
/*function sumar(a,b) {
    return a + b;
}*/
//console.log(sumar(5,5));
//22
/*const num1 = parseInt(prompt("Ingrese un número: "));
const num2 = parseInt(prompt("Ingrese otro número: "));
function sumar(a,b) {
    return a + b;
}
function restar(a,b) {
    return a - b;
}function multiplicar(a,b) {
    return a * b;
}function dividir(a,b) {
    return a / b;
}
console.log(sumar(num1,num2));
console.log(restar(num1,num2));
console.log(multiplicar(num1,num2));
console.log(dividir(num1,num2));*/
//23
/*function esPar(numero) {
    if(numero %2==0) {
        return true;
    }
    return false;
}
console.log(esPar(4));
console.log(esPar(7));
console.log(esPar(10));*/
//24
/*function sumarArray(numeros) {
    let suma = 0;
    numeros.forEach(element => {
        suma+=element;
    });
    return suma;
}
const numeros = [4, 7, 2, 9];
console.log(sumarArray(numeros));*/
//25
/*function calcularMedia(notas) {
    let media = 0;
    notas.forEach(element => {
        media+=element;
    });
    media /= notas.length;
    return media;
}
const notas = [7, 5, 8, 9, 6];
console.log(calcularMedia(notas));*/
//26
/*function contarAprobados(notas) {
    let contAprobados = 0;
    notas.forEach(element => {
        if(element>=5)
        contAprobados++;
    });
    return contAprobados;
}
const notas = [3, 7, 5, 9, 2, 8];
console.log(contarAprobados(notas))*/
//27
/*function notaMasAlta(notas) {
    let mayor = notas[0];
    notas.forEach(element => {
        if(element>mayor)
        mayor = element;
    });
    return mayor;
}
const notas = [5, 8, 4, 10, 7, 6];
console.log(notaMasAlta(notas))*/
//28
/*function obtenerAprobados(notas) {
    let notasAprobadas = [];
    notas.forEach(element => {
        if(element>=5) {
            notasAprobadas.push(element);
        }
    });
    return notasAprobadas;
}
const notas = [2, 5, 8, 4, 7, 10];
console.log(obtenerAprobados(notas));*/
//29
/*const productos = [
{ nombre: "Ratón", stock: 3 },
{ nombre: "Teclado", stock: 0 },
{ nombre: "Monitor", stock: 5 },
{ nombre: "Webcam", stock: 0 }
];
function productosDisponibles(productos) {
    let productosDisponibles = productos.filter(producto => producto.stock > 0);
    return productosDisponibles;
}
console.log(productosDisponibles(productos));*/
//30
const alumnos = [
{ nombre: "Ane", nota: 8 },
{ nombre: "Jon", nota: 4 },
{ nombre: "Mikel", nota: 7 },
{ nombre: "Lucía", nota: 9 },
{ nombre: "Iker", nota: 3 }
];
function mostrarAlumnos(alumnos) {
    alumnos.forEach(element => {
        console.log(element.nombre);
        console.log(element.nota);
    });
}
function contarAprobados(alumnos) {
    let cont = 0;
    alumnos.forEach(element => {
        if(element.nota >=5) {
            cont ++;
        }
    });
    return cont;
}
function calcularMedia(alumnos) {
    let media = 0;
    alumnos.forEach(element => {
        media += element.nota;
    });
    media/=alumnos.length;
    return media;
}
function mejorAlumno(alumnos) {
    let mejor = alumnos[0];
    let nota = alumnos[0].nota;
    alumnos.forEach(element => {
        if(element.nota > nota) {
            nota = element.nota;
            mejor = element;
        }
    });
    return mejor;
}
mostrarAlumnos(alumnos);
console.log(contarAprobados(alumnos));
console.log(calcularMedia(alumnos));
console.log(mejorAlumno(alumnos));
