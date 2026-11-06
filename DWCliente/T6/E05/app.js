const btn = document.getElementById("boton");
function registrar() {
    
}

btn.addEventListener('click', (e)=>{
    console.log(e.target.tagName);
    console.log(e.currentTarget.tagName);
    
})
//El currentTarget simepre es BOTON, pero el target cambia en función de donde hago click
