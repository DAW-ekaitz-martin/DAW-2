//E1
/*let tecnologias = ["JS", "Java", "Python", "PHP", "C"];
console.log(tecnologias);
console.log(tecnologias[0]);
console.log(tecnologias[2]);
console.log(tecnologias[tecnologias.length-1]);*/
//E2
/*let colores = ["rojo", "verde", "azul", "amarillo"];
console.log(colores);
colores[1] = "morado";
console.log(colores);*/
//E3
/*const tareas = ["Estudiar", "Comprar"];
tareas.push("Entrenar");
tareas.push("Preparar mochila");
console.log(tareas);
tareas.pop();
console.log(tareas)*/
//E4
/*const cola = ["Ane", "Jon", "Mikel"];
cola.push("Lucía");
console.log(cola);
const atendido = cola.shift();
console.log(`${atendido} ha sido atendido`)
console.log(`${cola} siguen esperando`);*/
//E5
/*const alumnos = ["Ane", "Mikel", "Jon", "Lucía", "Iker"];
for(alumno of alumnos) {
    console.log(`Alumno: ${alumno}`);
}*/
//E6
/*const gastos = [12, 8, 25, 5, 10];
let total = 0;
gastos.forEach(element => {
    total+= element;
});
console.log(total);*/
//E7
/*const notas = [3, 7, 5, 9, 4, 8, 2];
let cont = 0;
notas.forEach(nota => {
    if(nota >= 5) {
        cont++;
    }
})
console.log(cont);*/
//E8
/*const usuarios = ["admin", "ana", "mikel", "lucia"];
let nombre = prompt("Ingrese un nombre: ");
if(usuarios.includes(nombre)) {
    console.log("Usuario encontrado");
} else {
    console.log("Usuario no encontrado");
}*/
//E9
/*const notas = [3, 7, 5, 9, 4, 8, 2];
let notasAprobadas = [];
notas.forEach(nota => {
    if(nota >= 5) {
        notasAprobadas.push(nota);
    }
})
console.log(notasAprobadas)*/
//10
/*const precios = [100, 50, 20, 80];
let descuentos = precios.map(precio => precio*0.8);
console.log(precios);
console.log(descuentos);*/





