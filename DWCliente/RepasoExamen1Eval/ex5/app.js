// =====================================================================
// EX5 · Taquilla de un festival
// =====================================================================

// ---------------------------------------------------------------------
// PARTE A · MODELO CON CLASES
// ---------------------------------------------------------------------
class Entrada {
  static AFORO = 20;
  static FACTOR_ABONO = 1.8;
  static DESCUENTO_SOCIO = 0.9;
  static NOMBRES_DIA = { sabado: "sábado", domingo: "domingo", ambos: "ambos días" };

  #validada = false;

  // A.1 · datos comunes a todos los tipos
  constructor(id, comprador, correo, dia, socio) {
    this.id = id;
    this.comprador = comprador;
    this.correo = correo;
    this.dia = dia;            // "sabado" | "domingo" | "ambos"
    this.socio = socio;        // "" si no tiene código
  }

  // A.2 · cada hija sobrescribe importe(); precio() se escribe UNA vez aquí
  importe() {
    throw new Error("importe() debe implementarse en la clase hija");
  }

  precio() {
    let total = this.importe();
    if (this.socio !== "") total *= Entrada.DESCUENTO_SOCIO;   // 10 % sobre el importe final
    return Math.round(total * 100) / 100;
  }

  // Multiplicador del abono: lo usan las hijas dentro de importe()
  get factorDia() {
    return this.dia === "ambos" ? Entrada.FACTOR_ABONO : 1;
  }

  // A.3 · getter polimórfico (las hijas lo sobrescriben si hace falta)
  get personas() {
    return 1;
  }

  get validada() {
    return this.#validada;
  }

  validar() {
    this.#validada = true;
  }

  // Una entrada validada no se puede editar ni eliminar
  get modificable() {
    return !this.#validada;
  }

  ocupaDia(dia) {
    return this.dia === dia || this.dia === "ambos";
  }

  tipo() { return "entrada"; }
  nombreTipo() { return "Entrada"; }

  // A.4 · personas que ocupan un día (sin contar la entrada con idExcluido)
  static ocupacion(lista, dia, idExcluido = null) {
    return lista
      .filter(e => e.id !== idExcluido && e.ocupaDia(dia))
      .reduce((suma, e) => suma + e.personas, 0);
  }
}

class General extends Entrada {
  static PRECIO = 35;
  importe() {
    return General.PRECIO * this.factorDia;
  }
  tipo() { return "general"; }
  nombreTipo() { return "General"; }
}

class VIP extends Entrada {
  static PRECIO = 80;
  static BACKSTAGE = 20;

  constructor(id, comprador, correo, dia, socio, backstage) {
    super(id, comprador, correo, dia, socio);
    this.backstage = backstage;   // dato propio
  }
  importe() {
    // el backstage es fijo: NO se multiplica por el abono
    return VIP.PRECIO * this.factorDia + (this.backstage ? VIP.BACKSTAGE : 0);
  }
  tipo() { return "vip"; }
  nombreTipo() { return this.backstage ? "VIP + backstage" : "VIP"; }
}

class Grupo extends Entrada {
  static PRECIO_PERSONA = 30;
  static MINIMO_DESCUENTO = 6;

  constructor(id, comprador, correo, dia, socio, numPersonas) {
    super(id, comprador, correo, dia, socio);
    this.numPersonas = numPersonas;   // dato propio
  }
  get personas() {               // A.3 · polimorfismo: un grupo ocupa varias plazas
    return this.numPersonas;
  }
  importe() {
    let total = Grupo.PRECIO_PERSONA * this.numPersonas;
    if (this.numPersonas >= Grupo.MINIMO_DESCUENTO) total *= 0.9;
    return total * this.factorDia;
  }
  tipo() { return "grupo"; }
  nombreTipo() { return "Grupo"; }
}

// Crea el objeto de la clase que corresponda al tipo
function crearEntrada(id, datos) {
  const { comprador, correo, dia, socio } = datos;
  switch (datos.tipo) {
    case "general": return new General(id, comprador, correo, dia, socio);
    case "vip": return new VIP(id, comprador, correo, dia, socio, datos.backstage);
    case "grupo": return new Grupo(id, comprador, correo, dia, socio, datos.personas);
    default: throw new Error(`Tipo desconocido: ${datos.tipo}`);
  }
}

// ---------------------------------------------------------------------
// ESTADO
// ---------------------------------------------------------------------
let entradas = [];
let siguienteId = 1;
let idEdicion = null;   // null = creando; un número = editando esa entrada

// ---------------------------------------------------------------------
// DOM
// ---------------------------------------------------------------------
const form = document.getElementById("formEntrada");
const inputComprador = document.getElementById("comprador");
const selectTipo = document.getElementById("tipo");
const radiosDia = form.querySelectorAll('input[name="dia"]');
const inputPersonas = document.getElementById("personas");
const checkBackstage = document.getElementById("backstage");
const botonEnviar = document.getElementById("enviar");
const botonCancelar = document.getElementById("cancelar");
const pMensaje = document.getElementById("mensaje");
const selectFiltroDia = document.getElementById("filtroDia");
const inputBuscar = document.getElementById("buscar");
const checkPendientes = document.getElementById("pendientes");
const pPanel = document.getElementById("panel");
const pVacio = document.getElementById("vacio");
const ulEntradas = document.getElementById("entradas");

// ---------------------------------------------------------------------
// PARTE B · FORMULARIO Y VALIDACIÓN
// ---------------------------------------------------------------------

// B.1 · campos que dependen del tipo
function actualizarCamposTipo() {
  const tipo = selectTipo.value;

  const esGrupo = tipo === "grupo";
  inputPersonas.disabled = !esGrupo;
  inputPersonas.required = esGrupo;
  if (!esGrupo) inputPersonas.value = "";

  const esVip = tipo === "vip";
  checkBackstage.disabled = !esVip;
  if (!esVip) checkBackstage.checked = false;
}

function camposConErroresPropios() {
  return [inputComprador, inputPersonas, ...radiosDia];
}

function limpiarErroresPropios() {
  camposConErroresPropios().forEach(campo => campo.setCustomValidity(""));
}

function diaElegido() {
  return form.elements.dia.value;   // "" si no hay ninguno marcado
}

// B.3 · comprueba el aforo y pone el error en el campo que corresponda
function comprobarAforo() {
  const tipo = selectTipo.value;
  const dia = diaElegido();
  if (tipo === "" || dia === "") return;                      // ya lo avisa required
  if (tipo === "grupo" && !inputPersonas.validity.valid) return;  // personas mal: su propio error

  const necesarias = tipo === "grupo" ? Number(inputPersonas.value) : 1;
  const dias = dia === "ambos" ? ["sabado", "domingo"] : [dia];

  for (const d of dias) {
    // B.3 + C.4: en edición, las plazas de la propia entrada no cuentan
    const libres = Entrada.AFORO - Entrada.ocupacion(entradas, d, idEdicion);
    if (necesarias > libres) {
      const campo = tipo === "grupo"
        ? inputPersonas
        : form.querySelector('input[name="dia"]:checked');
      campo.setCustomValidity(
        `El ${Entrada.NOMBRES_DIA[d]} está completo para esta entrada: ` +
        `quedan ${libres} plazas y necesitas ${necesarias}.`
      );
      return;
    }
  }
}

function aplicarReglasPropias() {
  limpiarErroresPropios();

  // B.2 · nombre con al menos 3 caracteres tras trim
  if (inputComprador.value.trim().length < 3) {
    inputComprador.setCustomValidity("El nombre debe tener al menos 3 caracteres.");
  }

  comprobarAforo();
}

function leerFormulario() {
  const fd = new FormData(form);
  const tipo = fd.get("tipo");
  return {
    comprador: fd.get("comprador").trim(),
    correo: fd.get("correo").trim().toLowerCase(),
    tipo,
    dia: fd.get("dia"),
    personas: tipo === "grupo" ? Number(fd.get("personas")) : 1,
    backstage: fd.has("backstage"),          // casilla desmarcada o deshabilitada → no está
    socio: fd.get("socio").trim()
  };
}

// Deja el formulario como al cargar (modo "crear")
function reiniciarFormulario() {
  idEdicion = null;
  form.reset();
  limpiarErroresPropios();
  actualizarCamposTipo();
  botonEnviar.textContent = "Crear entrada";
  botonCancelar.hidden = true;
}

// ---------------------------------------------------------------------
// PARTE C · ALTAS, EDICIÓN Y ACCIONES
// ---------------------------------------------------------------------

// Única escucha de input en el formulario: retira errores y adapta campos
form.addEventListener("input", e => {
  limpiarErroresPropios();                 // B.4: un error corregido no bloquea el envío
  if (e.target === selectTipo) actualizarCamposTipo();
});

form.addEventListener("submit", e => {
  e.preventDefault();
  aplicarReglasPropias();
  if (!form.reportValidity()) {            // B.4: envío inválido → el modelo no cambia
    pMensaje.textContent = "Revisa los campos marcados.";
    return;
  }

  const datos = leerFormulario();

  if (idEdicion === null) {
    const nueva = crearEntrada(siguienteId++, datos);
    entradas.push(nueva);
    pMensaje.textContent = `Entrada creada para ${nueva.comprador}: ${nueva.precio().toFixed(2)} €.`;
  } else {
    // C.3: mismo id y misma posición, aunque cambie la clase
    const posicion = entradas.findIndex(en => en.id === idEdicion);
    entradas[posicion] = crearEntrada(idEdicion, datos);
    pMensaje.textContent = `Cambios guardados en la entrada de ${datos.comprador}.`;
  }

  reiniciarFormulario();
  renderizar();
  informeTipos();
});

// C.2 · cargar una entrada en el formulario
function empezarEdicion(entrada) {
  reiniciarFormulario();
  idEdicion = entrada.id;

  inputComprador.value = entrada.comprador;
  form.elements.correo.value = entrada.correo;
  selectTipo.value = entrada.tipo();
  form.elements.dia.value = entrada.dia;           // marca el radio con ese value
  form.elements.socio.value = entrada.socio;
  actualizarCamposTipo();                          // primero habilita los campos…
  if (entrada instanceof Grupo) inputPersonas.value = entrada.personas;   // …y luego los rellena
  if (entrada instanceof VIP) checkBackstage.checked = entrada.backstage;

  botonEnviar.textContent = "Guardar cambios";
  botonCancelar.hidden = false;
  pMensaje.textContent = `Editando la entrada de ${entrada.comprador}.`;
  inputComprador.focus();
}

function cancelarEdicion() {
  if (idEdicion === null) return;
  reiniciarFormulario();
  pMensaje.textContent = "Edición cancelada.";
  renderizar();
}

botonCancelar.addEventListener("click", cancelarEdicion);

// C.5 · Escape con el foco en el formulario cancela la edición
form.addEventListener("keydown", e => {
  if (e.key === "Escape" && idEdicion !== null) cancelarEdicion();
});

// C.1 · una única escucha delegada para las tres acciones
ulEntradas.addEventListener("click", e => {
  const boton = e.target.closest("button[data-accion]");
  if (!boton) return;

  const id = Number(boton.dataset.id);
  const entrada = entradas.find(en => en.id === id);
  if (!entrada) return;

  const accion = boton.dataset.accion;

  if (accion === "validar") {
    entrada.validar();
    if (idEdicion === id) reiniciarFormulario();   // ya no se puede editar
    pMensaje.textContent = `Entrada de ${entrada.comprador} validada en la puerta.`;
  }

  if (accion === "editar" && entrada.modificable) {
    empezarEdicion(entrada);
  }

  if (accion === "eliminar" && entrada.modificable) {
    if (idEdicion === id) reiniciarFormulario();   // C.5: eliminar la que se edita la cancela
    entradas = entradas.filter(en => en.id !== id);
    pMensaje.textContent = `Entrada de ${entrada.comprador} eliminada.`;
    informeTipos();
  }

  renderizar();
});

// ---------------------------------------------------------------------
// PARTE D · VISTA Y PANEL
// ---------------------------------------------------------------------
function leerFiltros() {
  return {
    dia: selectFiltroDia.value,
    texto: inputBuscar.value.trim().toLowerCase(),
    soloPendientes: checkPendientes.checked
  };
}

// D.1 · los tres filtros a la vez, sin tocar el array
function filtrar(lista, filtros) {
  return lista
    .filter(e => filtros.dia === "todos" || e.ocupaDia(filtros.dia))   // «ambos» sale en los dos
    .filter(e => e.comprador.toLowerCase().includes(filtros.texto))
    .filter(e => !filtros.soloPendientes || !e.validada);
}

// D.3 · siempre sobre el total
function calcularPanel(lista) {
  return {
    sabado: Entrada.ocupacion(lista, "sabado"),
    domingo: Entrada.ocupacion(lista, "domingo"),
    validadas: lista.reduce((n, e) => n + (e.validada ? 1 : 0), 0),
    total: lista.length,
    recaudacion: lista.reduce((suma, e) => suma + e.precio(), 0)
  };
}

function crearBoton(accion, id, texto) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.dataset.accion = accion;
  boton.dataset.id = id;
  boton.textContent = texto;
  return boton;
}

function crearFila(entrada) {
  const li = document.createElement("li");
  if (entrada.validada) li.classList.add("validada");
  if (entrada.id === idEdicion) li.classList.add("editando");

  const texto = document.createElement("span");
  texto.textContent = [
    entrada.comprador,
    entrada.nombreTipo(),
    Entrada.NOMBRES_DIA[entrada.dia],
    `${entrada.personas} ${entrada.personas === 1 ? "persona" : "personas"}`,
    `${entrada.precio().toFixed(2)} €`,
    entrada.validada ? "Validada" : "Sin validar"
  ].join(" · ");
  li.appendChild(texto);

  if (entrada.modificable) {
    li.append(
      crearBoton("editar", entrada.id, "Editar"),
      crearBoton("eliminar", entrada.id, "Eliminar"),
      crearBoton("validar", entrada.id, "Validar")
    );
  }
  return li;
}

// D.2 · renderizar solo pinta: filtra con filtrar() y calcula con calcularPanel()
function renderizar() {
  const visibles = filtrar(entradas, leerFiltros());
  ulEntradas.replaceChildren(...visibles.map(crearFila));
  pVacio.hidden = visibles.length > 0;

  const p = calcularPanel(entradas);   // el panel NO depende de los filtros
  pPanel.textContent =
    `Sábado ${p.sabado}/${Entrada.AFORO} · Domingo ${p.domingo}/${Entrada.AFORO} · ` +
    `Validadas: ${p.validadas} de ${p.total} · Recaudación: ${p.recaudacion.toFixed(2)} €`;
}

selectFiltroDia.addEventListener("change", renderizar);
checkPendientes.addEventListener("change", renderizar);
inputBuscar.addEventListener("input", renderizar);

// D.4 · recuento por tipo con instanceof (lo pide el enunciado en consola)
function contarPorTipo(lista) {
  return {
    general: lista.filter(e => e instanceof General).length,
    vip: lista.filter(e => e instanceof VIP).length,
    grupo: lista.filter(e => e instanceof Grupo).length
  };
}

function informeTipos() {
  const c = contarPorTipo(entradas);
  console.log(`Entradas por tipo → General: ${c.general} · VIP: ${c.vip} · Grupo: ${c.grupo}`);
}

// ---------------------------------------------------------------------
// INICIO
// ---------------------------------------------------------------------
reiniciarFormulario();
renderizar();
informeTipos();
