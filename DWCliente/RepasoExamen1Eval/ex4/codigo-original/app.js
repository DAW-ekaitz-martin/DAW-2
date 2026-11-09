// CÓDIGO ORIGINAL CON LOS 10 FALLOS (copiado del enunciado, sin corregir).
// Úsalo para reproducir los síntomas y practicar con breakpoints.
const form = document.querySelector("#formIncidencia");
const titulo = document.querySelector("#titulo");
const limpiar = document.querySelector("#limpiar");
const filtro = document.querySelector("#filtro");
const contador = document.querySelector("#contador");
const listado = document.querySelector("#listado");

let incidencias = [
  { id: 1, titulo: "Proyector del aula 12", prioridad: 3, abierta: true },
  { id: 2, titulo: "Wifi lento en la biblioteca", prioridad: 5, abierta: true },
  { id: 3, titulo: "Teclado sin la tecla Ñ", prioridad: 1, abierta: false }
];
let siguienteId = 4;

function validar() {
  if (titulo.value.trim().length < 5) {
    titulo.setCustomValidity("Escribe al menos 5 caracteres.");
  }
  return form.reportValidity();
}

function guardar(evento) {
  evento.preventDefault();
  if (!validar()) return;
  const datos = new FormData(form);
  incidencias.push({
    id: siguienteId++,
    titulo: String(datos.get("titulo")).trim(),
    prioridad: Number(datos.get("prioridad")),
    abierta: true
  });
  form.reset();
  renderizar();
}

function aplicarFiltro() {
  if (filtro.value === "abierta") {
    incidencias = incidencias.filter((i) => i.abierta);
  } else if (filtro.value === "cerrada") {
    incidencias = incidencias.filter((i) => !i.abierta);
  }
  renderizar();
}

function gestionarClic(evento) {
  const accion = evento.target.dataset.accion;
  const id = evento.target.dataset.id;
  if (accion === "alternar") {
    const incidencia = incidencias.find((i) => i.id === id);
    incidencia.abierta = !incidencia.abierta;
  }
  if (accion === "borrar") {
    incidencias = incidencias.filter((i) => i.id !== id);
  }
  renderizar();
}

function crearBoton(accion, id, texto) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.dataset.accion = accion;
  boton.dataset.id = id;
  boton.innerHTML = `<span>${texto}</span>`;
  return boton;
}

function renderizar() {
  listado.replaceChildren();
  for (const i of incidencias) {
    const fila = document.createElement("li");
    fila.innerHTML = `<strong>${i.titulo}</strong> · P${i.prioridad} `;
    fila.append(
      crearBoton("alternar", i.id, i.abierta ? "Cerrar" : "Reabrir"),
      crearBoton("borrar", i.id, "Borrar")
    );
    listado.append(fila);
  }
  listado.addEventListener("click", (e) => gestionarClic(e));
  contador.textContent = `Total: ${incidencias.length}`;
}

form.addEventListener("submit", guardar);
filtro.addEventListener("change", aplicarFiltro());
limpiar.addEventListener("click", () => form.reset());
renderizar();
