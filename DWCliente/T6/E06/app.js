const padre = document.getElementById("padre");
const medio = document.getElementById("medio");
const btn = document.getElementById("boton");

padre.addEventListener('click', ()=>{
    console.log("Padre");
}, {capture:true});
medio.addEventListener('click', ()=>{
    console.log("Medio");
}, {capture:true});
btn.addEventListener('click', ()=>{
    console.log("Botón");
})
medio.addEventListener('click', ()=>{
    console.log("Medio");
});
padre.addEventListener('click', ()=>{
    console.log("Padre");
});
//El currentTarget simepre es BOTON, pero el target cambia en función de donde hago click
