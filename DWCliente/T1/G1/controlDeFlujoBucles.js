//E1
/*
const edad = prompt(("Ingresa tu edad: "))
if(edad >= 18) {
    console.log("Mayor de edad")
} else {
    console.log("Menor de edad")
}*/
//E2
/*const numero = parseInt(prompt(("Ingresa un número: ")))
if(numero > 0) {
    console.log("Positivo")
} else if (numero == 0){
    console.log("Cero")
} else {
    console.log("Negativo")
}*/
//E3
/*const accion = parseInt(prompt(("1 o 2: ")))
switch(accion) {
    case 1:
        const numero = parseInt(prompt(("Ingresa un número: ")))
        const numero2 = parseInt(prompt(("Ingresa un número: ")))

        console.log("Resultado de la suma:", numero+numero2)
        break;
    case 2:
        const numero3 = prompt(("Ingresa un número: "))
        const numero4 = prompt(("Ingresa un número: "))

        console.log("Resultado de la resta:", numero3-numero4)
        break;
    default:
        console.log("Opción inválida")
}*/
//E4
/*let string = "";
for(let i=1; i<= 10; i++) {
    string += i;
    
    if(i != 10) {
        string +=",";
    }
    
}
console.log(string);*/
//E5
/*const secreto = Math.floor((Math.random()*5)+1);
let cont = 0;
let num = 0;
do {
    let numero = prompt("Ingrese un número: ");
    num=numero
    cont++;
}
while (num != secreto);
console.log(`Has necesitado ${cont} intentos para acertarlo paquete`);*/
//E6
const texto = "Hola como estás"
let cont = 0;
for(let frase of texto) {
    for(let letra of frase) {
        if(letra.includes("a")) {
            cont ++;
        }
    }
}
console.log(`La frase tiene ${cont} vocales`);

