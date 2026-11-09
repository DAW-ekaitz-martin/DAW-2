// =====================================================================
// EX4 · Tablón de incidencias · versión CORREGIDA (parte B) y AMPLIADA (parte C)
// Los comentarios "FALLO n" señalan dónde estaba cada uno de los 10 fallos.
// =====================================================================

const form = document.querySelector("#formIncidencia");
const titulo = document.querySelector("#titulo");
const limpiar = document.querySelector("#limpiar");
const filtro = document.querySelector("#filtro");
const buscar = document.querySelector("#buscar");
const contador = document.querySelector("#contador");
const vacio = document.querySelector("#vacio");
const listado = document.querySelector("#listado");

// ---------------------------------------------------------------------
// PARTE C.1 · Clase Incidencia
// ---------------------------------------------------------------------
class Incidencia {
  constructor(id, titulo, prioridad, abierta = true) {
    this.id = id;
    this.titulo = titulo;
    this.prioridad = prioridad;
    this.abierta = abierta;
  }

  alternar() {
    this.abierta = !this.abierta;
  }

  get urgente() {
    return this.prioridad >= 4;
  }
}

let incidencias = [
  new Incidencia(1, "Proyector del aula 12", 3, true),
  new Incidencia(2, "Wifi lento en la biblioteca", 5, true),
  new Incidencia(3, "Teclado sin la tecla Ñ", 1, false)
];
let siguienteId = 4;

// ---------------------------------------------------------------------
// Validación y alta
// ---------------------------------------------------------------------
function validar() {
  // FALLO 4: el error propio nunca se limpiaba → el campo quedaba inválido para siempre
  titulo.setCustomValidity("");
  if (titulo.value.trim().length < 5) {
    titulo.setCustomValidity("Escribe al menos 5 caracteres.");
  }
  return form.reportValidity();
}

function guardar(evento) {
  evento.preventDefault();
  if (!validar()) return;
  const datos = new FormData(form);
  incidencias.push(new Incidencia(
    siguienteId++,
    String(datos.get("titulo")).trim(),
    Number(datos.get("prioridad"))
  ));
  form.reset();
  renderizar();
  titulo.focus();   // C.4: foco de vuelta al título tras un alta correcta
}

// Al escribir en el título se retira el error propio (así se puede reenviar)
titulo.addEventListener("input", () => titulo.setCustomValidity(""));

// ---------------------------------------------------------------------
// Filtros
// FALLO 6: aplicarFiltro() SOBRESCRIBÍA el array incidencias con el filtrado,
// así que las cerradas se perdían. Ahora filtrar devuelve una lista NUEVA.
// ---------------------------------------------------------------------
function filtrar(lista) {
  const estado = filtro.value;
  const texto = buscar.value.trim().toLowerCase();
  return lista
    .filter(i => estado === "todas" || (estado === "abierta" ? i.abierta : !i.abierta))
    .filter(i => i.titulo.toLowerCase().includes(texto));
}

// ---------------------------------------------------------------------
// Acciones de la lista (delegación)
// ---------------------------------------------------------------------
function gestionarClic(evento) {
  // FALLO 7: al pulsar el <span>, evento.target era el span (sin dataset).
  // closest sube hasta el botón.
  const boton = evento.target.closest("button[data-accion]");
  if (!boton) return;

  const accion = boton.dataset.accion;
  // FALLO 8: dataset devuelve strings ("2") y los id son números (2) → === fallaba.
  const id = Number(boton.dataset.id);

  if (accion === "alternar") {
    const incidencia = incidencias.find(i => i.id === id);
    incidencia.alternar();
  }
  if (accion === "borrar") {
    incidencias = incidencias.filter(i => i.id !== id);
  }
  renderizar();
}

function crearBoton(accion, id, texto) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.dataset.accion = accion;
  boton.dataset.id = id;
  // Se mantiene el <span> interior (la parte C pide probar a pulsarlo),
  // pero creado con el DOM y textContent en lugar de innerHTML.
  const span = document.createElement("span");
  span.textContent = texto;
  boton.appendChild(span);
  return boton;
}

// ---------------------------------------------------------------------
// Vista
// ---------------------------------------------------------------------
function calcularContador(visibles) {
  return {
    visibles: visibles.length,                                        // depende del filtro
    abiertas: incidencias.filter(i => i.abierta).length,              // total
    urgentesAbiertas: incidencias.filter(i => i.abierta && i.urgente).length,
    total: incidencias.length
  };
}

function renderizar() {
  listado.replaceChildren();
  const visibles = filtrar(incidencias);

  for (const i of visibles) {
    const fila = document.createElement("li");
    if (!i.abierta) fila.classList.add("cerrada");

    // FALLO 10: innerHTML interpretaba el título como HTML (<b>Hola</b> salía en negrita).
    const strong = document.createElement("strong");
    strong.textContent = i.titulo;

    fila.append(
      strong,
      ` · P${i.prioridad} `,     // append acepta strings y los inserta como texto
      crearBoton("alternar", i.id, i.abierta ? "Cerrar" : "Reabrir"),
      crearBoton("borrar", i.id, "Borrar")
    );
    listado.append(fila);
  }

  // FALLO 9: aquí había un listado.addEventListener(...) con una flecha nueva en
  // cada renderizado → se acumulaban escuchas. Ahora se registra una vez abajo.

  const c = calcularContador(visibles);
  contador.textContent =
    `Visibles: ${c.visibles} · Abiertas: ${c.abiertas} · Urgentes abiertas: ${c.urgentesAbiertas} · Total: ${c.total}`;

  vacio.hidden = visibles.length > 0;   // C.4
}

// ---------------------------------------------------------------------
// Escuchas (se registran UNA sola vez)
// ---------------------------------------------------------------------
form.addEventListener("submit", guardar);

// FALLO 2: se pasaba aplicarFiltro() (el RESULTADO, undefined) en vez de la función.
filtro.addEventListener("change", renderizar);

buscar.addEventListener("input", renderizar);

// C.3: Escape vacía la búsqueda. Si se mantiene pulsada, e.repeat es true
// en las repeticiones automáticas y no se repite el trabajo.
buscar.addEventListener("keydown", e => {
  if (e.key !== "Escape" || e.repeat) return;
  e.preventDefault();          // evita que el navegador lo vacíe también por su cuenta
  buscar.value = "";
  renderizar();                // asignar value por código no lanza "input"
});

limpiar.addEventListener("click", () => {
  form.reset();
  titulo.setCustomValidity("");
});

listado.addEventListener("click", gestionarClic);   // FALLO 9 corregido

renderizar();
