const sumarbtn = document.getElementById("sumar");
const restarbtn = document.getElementById("restar");
const contador = document.getElementById("contador");
const aviso = document.getElementById("aviso");
sumarbtn.addEventListener('click', ()=>{
    contador.value++;
    aviso.innerHTML="";
})
restarbtn.addEventListener('click', ()=>{
    if(contador.value == 0) {
        aviso.innerHTML="El mínimo es 0";
    } else {
        contador.value--;
    }
        
})
console.log(contador.value);