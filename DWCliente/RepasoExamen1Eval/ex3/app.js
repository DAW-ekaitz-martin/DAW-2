// =====================================================================
// EX3 · Citas de un taller mecánico
// =====================================================================

// ---------------------------------------------------------------------
// PARTE A · MODELO
// ---------------------------------------------------------------------
class Cita {
  static RECARGO_KM = 150000;
  static PRECIO_RECOGIDA = 12;
  static PRECIOS_EXTRAS = { lavado: 15, sustitucion: 30 };
  static NOMBRES_SERVICIO = { aceite: "Cambio de aceite", revision: "Revisión completa", frenos: "Frenos" };
  static NOMBRES_EXTRA = { lavado: "lavado", sustitucion: "coche de sustitución" };

  // A.1 · extras es un array; direccion es null si no hay recogida
  constructor(id, matricula, correo, km, servicio, extras, direccion) {
    this.id = id;
    this.matricula = matricula;
    this.correo = correo;
    this.km = km;
    this.servicio = servicio;
    this.extras = extras;
    this.direccion = direccion;
  }

  // A.2 · método estático con switch
  static precioServicio(servicio) {
    switch (servicio) {
      case "aceite": return 60;
      case "revision": return 90;
      case "frenos": return 120;
      default: return 0;
    }
  }

  // A.3 · verdadero desde 150 000 km (incluido)
  get recargoKm() {
    return this.km >= Cita.RECARGO_KM;
  }

  precioTotal() {
    const extras = this.extras.reduce((suma, extra) => suma + (Cita.PRECIOS_EXTRAS[extra] ?? 0), 0);
    let total = Cita.precioServicio(this.servicio) + extras;
    if (this.recargoKm) total *= 1.1;                       // 10 % solo a servicio + extras
    if (this.direccion !== null) total += Cita.PRECIO_RECOGIDA;  // la recogida va después: sin recargo
    return Math.round(total * 100) / 100;
  }

  descripcion() {
    const extras = this.extras.length > 0
      ? this.extras.map(e => Cita.NOMBRES_EXTRA[e]).join(", ")
      : "sin extras";
    return `${this.matricula} · ${Cita.NOMBRES_SERVICIO[this.servicio]} · ${extras} · ${this.precioTotal().toFixed(2)} €`;
  }
}

// Estado
let citas = [];
let siguienteId = 1;

// ---------------------------------------------------------------------
// Referencias al DOM
// ---------------------------------------------------------------------
const form = document.getElementById("formCita");
const inputMatricula = document.getElementById("matricula");
const inputCorreo = document.getElementById("correo");
const inputCorreo2 = document.getElementById("correo2");
const inputKm = document.getElementById("km");
const selectServicio = document.getElementById("servicio");
const checkDomicilio = document.getElementById("domicilio");
const inputDireccion = document.getElementById("direccion");
const pPrevia = document.getElementById("previa");
const pMensaje = document.getElementById("mensaje");
const pResumen = document.getElementById("resumen");
const ulCitas = document.getElementById("citas");

// Campos que reciben errores PROPIOS (setCustomValidity)
const camposConReglasPropias = [inputMatricula, inputCorreo2, inputDireccion];

// ---------------------------------------------------------------------
// PARTE B · VALIDACIÓN
// ---------------------------------------------------------------------
function normalizarCorreo(texto) {
  return texto.trim().toLowerCase();
}

function limpiarErroresPropios() {
  camposConReglasPropias.forEach(campo => campo.setCustomValidity(""));
}

// B.3, B.4 y B.5: reglas que los atributos HTML no pueden expresar
function aplicarReglasPropias() {
  limpiarErroresPropios();

  // B.3 · los correos deben coincidir (el error va en correo2)
  if (inputCorreo2.value.trim() !== "" &&
      normalizarCorreo(inputCorreo.value) !== normalizarCorreo(inputCorreo2.value)) {
    inputCorreo2.setCustomValidity("Los dos correos no coinciden.");
  }

  // B.4 · matrícula repetida
  const matricula = inputMatricula.value.trim();
  if (citas.some(c => c.matricula === matricula)) {
    inputMatricula.setCustomValidity(`Ya hay una cita para la matrícula ${matricula}.`);
  }

  // B.5 · dirección obligatoria con recogida (mínimo 8 caracteres tras trim)
  if (checkDomicilio.checked && inputDireccion.value.trim().length < 8) {
    inputDireccion.setCustomValidity("Escribe la dirección de recogida (al menos 8 caracteres).");
  }
}

// B.5 · habilitar o deshabilitar la dirección según la casilla
function actualizarDireccion() {
  if (checkDomicilio.checked) {
    inputDireccion.disabled = false;
    inputDireccion.required = true;
  } else {
    inputDireccion.disabled = true;
    inputDireccion.required = false;
    inputDireccion.value = "";
    inputDireccion.setCustomValidity("");
  }
}

// ---------------------------------------------------------------------
// PARTE C · FLUJO DEL FORMULARIO
// ---------------------------------------------------------------------

// C.1 · precio estimado mientras se rellena
function actualizarPrevia() {
  const servicio = selectServicio.value;
  // km vacío NO es 0 → validity.valid es false si falta o está fuera de rango
  if (servicio === "" || !inputKm.validity.valid) {
    pPrevia.textContent = "Precio estimado: —";
    return;
  }
  const extras = [...form.querySelectorAll('input[name="extras"]:checked')].map(c => c.value);
  const borrador = new Cita(null, "", "", Number(inputKm.value), servicio, extras,
                            checkDomicilio.checked ? inputDireccion.value.trim() : null);
  pPrevia.textContent = `Precio estimado: ${borrador.precioTotal().toFixed(2)} €`;
}

// Única escucha de input en el formulario (C.1 + B.6 + B.5)
form.addEventListener("input", e => {
  limpiarErroresPropios();                 // B.6: al editar se retiran los errores propios
  if (e.target === checkDomicilio) actualizarDireccion();
  actualizarPrevia();
});

// C.2 · leer el envío con FormData y crear la cita
function leerCita() {
  const fd = new FormData(form);
  return new Cita(
    siguienteId,
    fd.get("matricula").trim(),
    normalizarCorreo(fd.get("correo")),
    Number(fd.get("km")),
    fd.get("servicio"),
    fd.getAll("extras"),                                 // array con los marcados
    fd.has("direccion") ? fd.get("direccion").trim() : null  // deshabilitado → no está
  );
}

form.addEventListener("submit", e => {
  e.preventDefault();
  aplicarReglasPropias();
  if (!form.reportValidity()) {            // envío inválido → el modelo no cambia
    pMensaje.textContent = "Revisa los campos marcados.";
    return;
  }

  const cita = leerCita();
  citas.push(cita);
  siguienteId++;
  pMensaje.textContent = `Cita reservada para ${cita.matricula}: ${cita.precioTotal().toFixed(2)} €.`;

  form.reset();                            // dispara "reset" → estado inicial (C.3)
  renderizar();
});

// C.3 · «Vaciar» y después de un alta: estado inicial
// El evento reset se lanza ANTES de que el navegador restaure los valores,
// por eso aquí solo se toca lo que reset no restaura por sí solo.
form.addEventListener("reset", () => {
  limpiarErroresPropios();
  inputDireccion.disabled = true;
  inputDireccion.required = false;
  pPrevia.textContent = "Precio estimado: —";
});

// ---------------------------------------------------------------------
// PARTE D · LISTA DE CITAS
// ---------------------------------------------------------------------
function renderizar() {
  ulCitas.replaceChildren();
  citas.forEach(cita => {
    const li = document.createElement("li");
    const texto = document.createElement("span");
    texto.textContent = cita.descripcion();

    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = "Anular";
    boton.dataset.id = cita.id;

    li.append(texto, boton);
    ulCitas.appendChild(li);
  });

  const facturacion = citas.reduce((suma, c) => suma + c.precioTotal(), 0);
  pResumen.textContent = `Citas: ${citas.length} · Facturación: ${facturacion.toFixed(2)} €`;
}

// D.2 · anular con delegación
ulCitas.addEventListener("click", e => {
  const boton = e.target.closest("button[data-id]");
  if (!boton) return;
  const id = Number(boton.dataset.id);
  const cita = citas.find(c => c.id === id);
  if (!cita) return;
  citas = citas.filter(c => c.id !== id);   // la matrícula vuelve a estar libre
  pMensaje.textContent = `Cita de ${cita.matricula} anulada.`;
  renderizar();
});

renderizar();
