// =====================================================================
// EX2 · Préstamos de la biblioteca
// =====================================================================

// ---------------------------------------------------------------------
// PARTE A · CLASE BASE
// ---------------------------------------------------------------------
class Material {
  #disponibles;   // A.1: solo se modifica con prestar() y devolver()
  #titulo;        // A.2: privado para obligar a pasar por el set

  constructor(codigo, titulo, ejemplares) {
    this.codigo = codigo;
    this.ejemplares = ejemplares;
    this.#disponibles = ejemplares;   // empieza igual que ejemplares
    this.#titulo = "";
    this.titulo = titulo;             // pasa por el set (y su validación)
  }

  // A.1: get sin set → "disponibles" es de solo lectura desde fuera
  get disponibles() {
    return this.#disponibles;
  }

  // A.2: get y set del título
  get titulo() {
    return this.#titulo;
  }

  set titulo(nuevo) {
    const limpio = String(nuevo).trim();
    if (limpio.length < 2) return;    // se ignora y se conserva el anterior
    this.#titulo = limpio;
  }

  // A.3: tres letras mayúsculas, guion y tres dígitos (todo el texto)
  static codigoValido(codigo) {
    return /^[A-Z]{3}-\d{3}$/.test(codigo);
  }

  // A.4
  prestar() {
    if (this.#disponibles === 0) return false;
    this.#disponibles--;
    return true;
  }

  devolver(dias) {
    if (this.#disponibles === this.ejemplares) return null;  // nada prestado
    this.#disponibles++;
    return this.calcularMulta(dias);
  }

  // B.2: se escribe UNA vez aquí. Usa los métodos que cada hija sobrescribe.
  calcularMulta(dias) {
    const retraso = Math.max(0, dias - this.diasMaximos());
    const multa = retraso * this.multaDiaria();
    return Math.round(multa * 100) / 100;   // evita 0.30000000000000004
  }

  // Métodos "abstractos": cada hija debe sobrescribirlos
  diasMaximos() { throw new Error("diasMaximos() debe implementarse en la clase hija"); }
  multaDiaria() { throw new Error("multaDiaria() debe implementarse en la clase hija"); }
  tipo() { return "material"; }

  // B.3: texto común; las hijas lo amplían con super.resumen()
  resumen() {
    return `${this.codigo} · ${this.titulo} · ${this.disponibles}/${this.ejemplares}`;
  }
}

// ---------------------------------------------------------------------
// PARTE B · HERENCIA Y POLIMORFISMO
// ---------------------------------------------------------------------
class Libro extends Material {
  constructor(codigo, titulo, ejemplares, autor, paginas) {
    super(codigo, titulo, ejemplares);
    this.autor = autor;
    this.paginas = paginas;
  }
  diasMaximos() { return 21; }
  multaDiaria() { return 0.2; }
  tipo() { return "libro"; }
  resumen() {
    return `${super.resumen()} · ${this.autor} · ${this.paginas} págs.`;
  }
}

class Revista extends Material {
  constructor(codigo, titulo, ejemplares, numero) {
    super(codigo, titulo, ejemplares);
    this.numero = numero;
  }
  diasMaximos() { return 7; }
  multaDiaria() { return 0.1; }
  tipo() { return "revista"; }
  resumen() {
    return `${super.resumen()} · nº ${this.numero}`;
  }
}

class Videojuego extends Material {
  constructor(codigo, titulo, ejemplares, plataforma, pegi) {
    super(codigo, titulo, ejemplares);
    this.plataforma = plataforma;
    this.pegi = pegi;
  }
  diasMaximos() { return 5; }
  multaDiaria() { return 0.5; }
  tipo() { return "videojuego"; }
  resumen() {
    return `${super.resumen()} · ${this.plataforma} · PEGI ${this.pegi}`;
  }
}

// ---------------------------------------------------------------------
// Datos del enunciado
// ---------------------------------------------------------------------
const datos = [
  new Libro("LIB-001", "Patria", 2, "Fernando Aramburu", 648),
  new Libro("LIB-002", "Obabakoak", 1, "Bernardo Atxaga", 432),
  new Revista("REV-014", "Muy Interesante", 3, 512),
  new Revista("rev-99", "Código incorrecto", 1, 7),
  new Videojuego("JUE-007", "Portal 2", 1, "PC", 12)
];

// C.1: solo los de código válido
const catalogo = datos.filter(m => Material.codigoValido(m.codigo));

// Estado de la aplicación
let caja = 0;

// ---------------------------------------------------------------------
// PARTE C · INTERFAZ
// ---------------------------------------------------------------------
const selectTipo = document.getElementById("tipo");
const inputDias = document.getElementById("diasUso");
const pEstadisticas = document.getElementById("estadisticas");
const pMensaje = document.getElementById("mensaje");
const strongCaja = document.getElementById("caja");
const ulCatalogo = document.getElementById("catalogo");

// C.3: cada valor del select se asocia a su CLASE para usar instanceof
const CLASES = {
  libro: Libro,
  revista: Revista,
  videojuego: Videojuego
};

function filtrarPorTipo(lista, tipo) {
  if (tipo === "todos") return lista;
  const Clase = CLASES[tipo];
  return lista.filter(m => m instanceof Clase);
}

function crearBoton(accion, codigo, texto) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.textContent = texto;
  boton.dataset.accion = accion;
  boton.dataset.codigo = codigo;
  return boton;
}

function calcularEstadisticas(lista) {
  return {
    libros: lista.filter(m => m instanceof Libro).length,
    revistas: lista.filter(m => m instanceof Revista).length,
    videojuegos: lista.filter(m => m instanceof Videojuego).length,
    disponibles: lista.reduce((suma, m) => suma + m.disponibles, 0),
    ejemplares: lista.reduce((suma, m) => suma + m.ejemplares, 0)
  };
}

function renderizar() {
  // Lista filtrada
  ulCatalogo.replaceChildren();
  const visibles = filtrarPorTipo(catalogo, selectTipo.value);

  visibles.forEach(material => {
    const li = document.createElement("li");
    const texto = document.createElement("span");
    texto.textContent = material.resumen();   // polimorfismo: cada clase su resumen
    li.append(
      texto,
      crearBoton("prestar", material.codigo, "Prestar"),
      crearBoton("devolver", material.codigo, "Devolver")
    );
    ulCatalogo.appendChild(li);
  });

  // Estadísticas: SIEMPRE del catálogo completo, no de los visibles
  const e = calcularEstadisticas(catalogo);
  pEstadisticas.textContent =
    `Libros: ${e.libros} · Revistas: ${e.revistas} · Videojuegos: ${e.videojuegos} · ` +
    `Disponibles: ${e.disponibles} de ${e.ejemplares}`;

  // Caja con dos decimales
  strongCaja.textContent = `${caja.toFixed(2)} €`;
}

// Lee #diasUso. Devuelve un entero ≥ 1 o null si no es válido.
function leerDias() {
  if (inputDias.value.trim() === "") return null;   // vacío NO es 0
  const dias = Number(inputDias.value);
  if (!Number.isInteger(dias) || dias < 1) return null;
  return dias;
}

function gestionarPrestamo(material) {
  if (material.prestar()) {
    pMensaje.textContent = `Has prestado «${material.titulo}». Quedan ${material.disponibles}.`;
  } else {
    pMensaje.textContent = `No quedan ejemplares de «${material.titulo}».`;
  }
}

function gestionarDevolucion(material) {
  const dias = leerDias();
  if (dias === null) {
    pMensaje.textContent = "Indica cuántos días ha durado el préstamo (1 o más).";
    return;   // no se devuelve nada
  }
  const multa = material.devolver(dias);
  if (multa === null) {
    pMensaje.textContent = `«${material.titulo}» no tiene ejemplares prestados.`;
    return;   // la caja no cambia
  }
  caja += multa;
  pMensaje.textContent = multa > 0
    ? `Devuelto «${material.titulo}» con ${dias} días. Multa: ${multa.toFixed(2)} €.`
    : `Devuelto «${material.titulo}» a tiempo. Sin multa.`;
}

// C.2: UNA sola escucha delegada en la lista
ulCatalogo.addEventListener("click", e => {
  const boton = e.target.closest("button[data-accion]");
  if (!boton) return;

  const material = catalogo.find(m => m.codigo === boton.dataset.codigo);
  if (!material) return;

  if (boton.dataset.accion === "prestar") gestionarPrestamo(material);
  if (boton.dataset.accion === "devolver") gestionarDevolucion(material);

  renderizar();   // modelo → vista
});

selectTipo.addEventListener("change", renderizar);

renderizar();

// ---------------------------------------------------------------------
// PARTE D · COMPROBACIÓN POR CONSOLA
// (lo pide el enunciado, por eso estos console.log no son "temporales")
// ---------------------------------------------------------------------
function comprobacionConsola() {
  const libro = catalogo[0];   // Patria

  // D.1
  Material.prototype.centro = "Arangoya";

  const conForIn = [];
  for (const clave in libro) conForIn.push(clave);

  console.log("for...in:", conForIn);
  // → ["codigo", "ejemplares", "autor", "paginas", "centro"]
  console.log("getOwnPropertyNames:", Object.getOwnPropertyNames(libro));
  // → ["codigo", "ejemplares", "autor", "paginas"]
  // Diferencia: for...in recorre también las propiedades ENUMERABLES heredadas
  // del prototipo (centro). getOwnPropertyNames solo da las PROPIAS.
  // #disponibles no sale en ninguno: un campo privado no es una propiedad del
  // objeto, vive aparte y solo se accede desde dentro de la clase.

  // D.2
  libro.oferta = "Préstamo ampliado";
  console.log("Con oferta:", Object.keys(libro));
  delete libro.oferta;
  console.log("Tras delete:", Object.keys(libro));
  console.log("¿Sigue oferta?", "oferta" in libro);   // false
  console.log("El resto sigue intacto:", libro.resumen());
}

comprobacionConsola();
