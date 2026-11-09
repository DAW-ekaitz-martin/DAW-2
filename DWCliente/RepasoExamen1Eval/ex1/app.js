
const tablebody = document.getElementById("tabla");
const pResumen = document.getElementById("resumen");
const selectCategoria = document.getElementById("categoria");
const inputBuscar = document.getElementById("buscar");
const checkRetirados = document.getElementById("retirados");
const pVacio = document.getElementById("vacio");
const pFicha = document.getElementById("ficha");

const DISTANCIA_KM = 10;
const corredores = [
{ dorsal: 101, nombre: "Mikel Arana", edad: 28, segundos: 2462 },
{ dorsal: 102, nombre: "Ane Etxeberria", edad: 34, segundos: 2530 },
{ dorsal: 103, nombre: "Lucía Romero", edad: 19, segundos: 2605 },
{ dorsal: 104, nombre: "Jon Ugalde", edad: 45, segundos: 2688 },
{ dorsal: 105, nombre: "Nerea Goñi", edad: 22, segundos: 2755 },
{ dorsal: 106, nombre: "Iker Soto", edad: 41, segundos: 2911 },
{ dorsal: 107, nombre: "Maite Olano", edad: 52, segundos: 3067 },
{ dorsal: 108, nombre: "Unai Prieto", edad: 17, segundos: 3120 },
{ dorsal: 109, nombre: "Leire Vidal", edad: 30, segundos: null },
{ dorsal: 110, nombre: "Asier Mora", edad: 48, segundos: null }
];

function obtenerCategoria(edad) {
    if(edad<23) {
        return "sub23";
    }
    else if(edad <= 39) {
        return "senior"
    }
    return "veterano";
}

function formatearTiempo(segundos) {
    if(segundos === null) {
        return "Retirado";
    }
    const minutos = Math.floor(segundos /60);
    const seg = segundos%60;
    return `${String(minutos).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;//padStart sirve para poner un 0 delante en caso de que los segundos solo tengan una cifra. Transformo en String antes porque padStart solo funciona con strings
}
function calcularRitmo(segundos) {
    if(segundos === null) {
        return "-";
    }
    const kmPorSegundo = formatearTiempo(Math.round(segundos/DISTANCIA_KM));
    return kmPorSegundo;
}
function asignarPosiciones(lista) {
    let posicion = 0;
    let nueva = lista.map(corredor=> {
        if(corredor.segundos === null) {
            return {...corredor, posicion:null};
        }
        posicion ++;
        return {...corredor, posicion:posicion};
    })
    return nueva;
}
function calcularResumen(lista) {
  let finalistas = 0;
  let suma = 0;
  let mejor = null;

  lista.forEach(corredor => {
    if (corredor.segundos !== null) {
      finalistas++;
      suma += corredor.segundos;
      if (mejor === null || corredor.segundos < mejor.segundos) {
        mejor = corredor;
      }
    }
  });

  return {
    numParticipantes: lista.length,
    finalistas: finalistas,
    mediaSegundos: finalistas > 0 ? suma / finalistas : null,
    corredorMasRapido: mejor
  };
}
console.log(calcularResumen(corredores));

/*
Funcion auxiliar para crear las td de la tabla:
function crearCelda(texto) {
  const td = document.createElement("td");
  td.textContent = texto;
  return td;
}
*/

//PARTE B
function renderizar() {
    tablebody.textContent = "";

    const lista = obtenerVisibles(); //Antes de programar los filtros estaba puesto como: asignarPosiciones(corredores);
    lista.forEach(corredor => {
        const fila = document.createElement("tr");
        //const dato = document.createElement("td"); Con crear una no vale, porque no se duplican, simplemente se cambian de posición en el DOM, para crear uno por cada dato hay 3 opciones: O creas una función, o uso insertCell() o hago un bucle.
        /*
            El bucle sería así:
            const valores = [
            corredor.posicion ?? "—",
            corredor.dorsal,
            corredor.nombre,
            obtenerCategoria(corredor.edad),
            formatearTiempo(corredor.segundos),
            calcularRitmo(corredor.segundos)
            ];
            valores.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            fila.appendChild(td);
            });
        */

        fila.insertCell().textContent=corredor.posicion ?? "-";
        fila.insertCell().textContent=corredor.dorsal;
        fila.insertCell().textContent=corredor.nombre;
        fila.insertCell().textContent=obtenerCategoria(corredor.edad);
        fila.insertCell().textContent=formatearTiempo(corredor.segundos);
        fila.insertCell().textContent=calcularRitmo(corredor.segundos);
        
        const boton = document.createElement("button");
        boton.type = "button";
        boton.textContent = "Ver ficha";
        boton.dataset.dorsal = corredor.dorsal; // genera data-dorsal="101"

        const tdBoton = document.createElement("td");
        tdBoton.appendChild(boton);
        fila.appendChild(tdBoton);

        tablebody.appendChild(fila);

    });

    resumen(lista);
    pVacio.hidden = lista.length > 0;
}
renderizar();

function resumen(lista) {
    const datos = calcularResumen(lista);
    if(datos.corredorMasRapido != null) { //Si el más rapido es null es que no hay corredores o que ninguno ha acabado
        const media = Math.round(datos.mediaSegundos);
        const mejortiempo = datos.corredorMasRapido.segundos;
        pResumen.textContent=`Visibles: ${datos.numParticipantes} · Media: ${formatearTiempo(media)} · Mejor: ${datos.corredorMasRapido.nombre} (${formatearTiempo(mejortiempo)})`;
    } else {
        pResumen.textContent=`Visibles: ${datos.numParticipantes} · Sin tiempos`;
    }
    
}

selectCategoria.addEventListener("change", renderizar);
checkRetirados.addEventListener("change", renderizar);
inputBuscar.addEventListener("input", renderizar);
//Parte C => 3
inputBuscar.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    inputBuscar.value = "";
    renderizar();   // hace falta: cambiar value por código no dispara "input"
  }
});
//Parte C => 1
function obtenerVisibles() {
  const categoria = selectCategoria.value;
  const texto = inputBuscar.value.trim().toLowerCase();
  const verRetirados = checkRetirados.checked;

  //FUNCIONAMIENTO DEL || :Si lo de la izquierda de los || es true, no comprueba lo de la derecha. Si es false, si comprueba lo de la derecha.
  return asignarPosiciones(corredores)   // Parte C => 2; primero posiciones sobre TODOS
    .filter(c => categoria === "todas" || obtenerCategoria(c.edad) === categoria)//Si la catagoría es todos, se muestran todos, sino solo los que pertenezcan a esa catagoría en concreto. 
    .filter(c => c.nombre.toLowerCase().includes(texto))
    .filter(c => verRetirados || c.segundos !== null);//Si la casilla de ver retirados está marcada, muestra todos(retirados y no retirados). Si no está marcada, muestra solo los que han terminado(lo que hay a la derecha del || )
}

//Parte D => 1
//PARTE D
tablebody.addEventListener("click", e => {
  const boton = e.target.closest("button[data-dorsal]");//busca, empezando por el propio elemento pulsado y subiendo por sus padres, el primer <button> que tenga data-dorsal. Esto cubre la otra condición del enunciado, “al pulsar un elemento interior del botón”. Si el botón tuviera dentro un <span> o un icono y pulsaras ahí, e.target sería el <span>, no el botón. closest sube hasta encontrarlo.
  if (!boton) return;   // el clic no fue en un botón "Ver ficha"

  const dorsal = Number(boton.dataset.dorsal);//Number(...): dataset siempre devuelve strings ("101"), y en los datos el dorsal es un número (101). Sin convertirlo, "101" === 101 es false y find no encontraría a nadie.
  const corredor = corredores.find(c => c.dorsal === dorsal);//find: devuelve el primer corredor que cumple la condición.

  pFicha.textContent =
    `${corredor.nombre} · dorsal ${corredor.dorsal} · ${corredor.edad} años · ${obtenerCategoria(corredor.edad)}`;
});