const escucharbtn = document.getElementById("escuchar");
const pausarbtn = document.getElementById("pausar");
const probarbtn = document.getElementById("probar");
const contador = document.getElementById("contador");
const aviso = document.getElementById("aviso");
function sumar() {
    contador.value++;
}

escucharbtn.addEventListener('click', ()=>{
    probarbtn.addEventListener('click', sumar);
})
pausarbtn.addEventListener('click', ()=>{
    probarbtn.removeEventListener('click', sumar);
        
})
