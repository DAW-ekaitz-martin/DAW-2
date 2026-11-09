# EX2 · Préstamos de la biblioteca: explicación

## Idea general

Hay tres capas, y cada una se apoya en la anterior:

1. **Modelo (clases)**: `Material` y sus hijas `Libro`, `Revista` y `Videojuego`. Aquí están todas las reglas: plazos, multas, prestar y devolver. No tocan el DOM.
2. **Estado**: el array `catalogo` (solo los de código válido) y la variable `caja`.
3. **Vista**: `renderizar()` pinta la lista, las estadísticas y la caja **a partir del estado**. Cada acción del usuario cambia el modelo y después llama a `renderizar()`.

---

## Parte A · Clase base

### A.1 · Campo privado `#disponibles` con `get` sin `set`

```js
#disponibles;
constructor(codigo, titulo, ejemplares) {
  this.#disponibles = ejemplares;
}
get disponibles() { return this.#disponibles; }
```

- El `#` hace que **solo el código de dentro de la clase** pueda leerlo o cambiarlo. Desde fuera, `libro.#disponibles` es un error de sintaxis.
- Hay `get` pero **no `set`**. Si alguien escribe `libro.disponibles = 99`, no pasa nada (en código no estricto se ignora; en modo estricto lanzaría `TypeError`). La única forma de cambiarlo es `prestar()` o `devolver()`. Eso es la **encapsulación**: el objeto protege su propio estado.

### A.2 · `get` y `set` del título

```js
set titulo(nuevo) {
  const limpio = String(nuevo).trim();
  if (limpio.length < 2) return;   // se ignora
  this.#titulo = limpio;
}
```

- El título también es privado (`#titulo`). Si fuera público (`this.titulo`), el `set` se podría saltar.
- En el constructor hago `this.titulo = titulo`, que **pasa por el `set`**, así que el título inicial también se valida.
- `String(nuevo)` evita un error si alguien pasa un número o `null` (no tienen `.trim()`).

### A.3 · Método estático `codigoValido`

```js
static codigoValido(codigo) {
  return /^[A-Z]{3}-\d{3}$/.test(codigo);
}
```

- `^` y `$` obligan a que **todo** el texto cumpla el patrón. Sin ellos, `"XLIB-0012"` sería válido porque contiene `LIB-001`.
- `[A-Z]{3}`: tres mayúsculas. `\d{3}`: tres dígitos.
- Es `static` porque no depende de ningún material concreto: se llama sobre la clase, `Material.codigoValido("LIB-001")`, no sobre un objeto. `"rev-99"` falla (minúsculas y dos dígitos).

### A.4 · `prestar()` y `devolver(dias)`

```js
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
```

- "No había ejemplares prestados" equivale a que **todos están disponibles** (`disponibles === ejemplares`). En ese caso devuelvo `null` **antes** de cambiar nada.

---

## Parte B · Herencia y polimorfismo

### B.1 · Hijas con `extends` y `super`

```js
class Libro extends Material {
  constructor(codigo, titulo, ejemplares, autor, paginas) {
    super(codigo, titulo, ejemplares);   // primero, siempre
    this.autor = autor;
    this.paginas = paginas;
  }
  diasMaximos() { return 21; }
  multaDiaria() { return 0.2; }
  tipo() { return "libro"; }
}
```

- `super(...)` llama al constructor de `Material`, que guarda los datos comunes. **Debe ir antes de usar `this`**, o da error.
- Cada hija guarda solo **sus** datos propios (autor y páginas, número, plataforma y PEGI).
- En `Material`, `diasMaximos()` y `multaDiaria()` lanzan un error. Funcionan como métodos "abstractos": si alguien crea una hija y olvida sobrescribirlos, se entera enseguida.

### B.2 · `calcularMulta` escrito una sola vez

```js
calcularMulta(dias) {
  const retraso = Math.max(0, dias - this.diasMaximos());
  const multa = retraso * this.multaDiaria();
  return Math.round(multa * 100) / 100;
}
```

- `Math.max(0, ...)`: si lo devuelves antes del plazo, el retraso sería negativo. Así nunca baja de 0.
- `this.diasMaximos()` ejecuta **la versión del objeto real**. En un `Videojuego` es 5, en un `Libro` es 21. Eso es el **polimorfismo**: el mismo código hace cosas distintas según el objeto.
- `Math.round(x * 100) / 100` redondea a céntimos. Sin esto, `3 * 0.1` da `0.30000000000000004` por cómo guarda los decimales el ordenador.

### B.3 · `resumen()` ampliado con `super.resumen()`

```js
// Material
resumen() { return `${this.codigo} · ${this.titulo} · ${this.disponibles}/${this.ejemplares}`; }
// Libro
resumen() { return `${super.resumen()} · ${this.autor} · ${this.paginas} págs.`; }
```

`super.resumen()` llama a la versión del padre y la hija solo **añade** lo suyo. Si mañana cambia el formato común, se cambia en un solo sitio.

---

## Parte C · Interfaz

### C.1 · Catálogo filtrado y renderizado

```js
const catalogo = datos.filter(m => Material.codigoValido(m.codigo));
```

Quedan 4 materiales (sale `rev-99`). Cada `<li>` lleva un `<span>` con `resumen()` (escrito con `textContent`) y dos botones creados con `crearBoton(accion, codigo, texto)`, que pone `data-accion` y `data-codigo`.

### C.2 · Una única escucha delegada

```js
ulCatalogo.addEventListener("click", e => {
  const boton = e.target.closest("button[data-accion]");
  if (!boton) return;
  const material = catalogo.find(m => m.codigo === boton.dataset.codigo);
  ...
  renderizar();
});
```

- La escucha está en el `<ul>`, que **nunca se borra**. Los botones se recrean en cada `renderizar()`, pero da igual: el clic sube hasta el `<ul>`.
- Se registra **una vez**, fuera de `renderizar()`. Dentro, se duplicaría en cada pintado.
- `closest` sube desde el elemento pulsado hasta el botón. Si el botón tuviera un icono dentro, seguiría funcionando.
- **Días inválidos**: `leerDias()` devuelve `null` si el campo está vacío, no es entero o es menor que 1. En ese caso `gestionarDevolucion` muestra el aviso y **sale antes de llamar a `devolver()`**, así que el modelo no cambia.
  - Ojo: `Number("")` es `0`. Por eso compruebo antes que el campo no esté vacío.
- La caja se muestra con `caja.toFixed(2)`, que siempre da dos decimales (`"2.30"`).

### C.3 · Filtro con `instanceof` y estadísticas

```js
const CLASES = { libro: Libro, revista: Revista, videojuego: Videojuego };
function filtrarPorTipo(lista, tipo) {
  if (tipo === "todos") return lista;
  return lista.filter(m => m instanceof CLASES[tipo]);
}
```

- El objeto `CLASES` relaciona el `value` del `<select>` con **la clase**, y así no hace falta un `if` por tipo.
- Las estadísticas se calculan siempre con `catalogo` (completo), **no** con los visibles. Por eso, al filtrar "Revistas", siguen diciendo `6 de 7`.
- Disponibles y ejemplares se suman con `reduce`.

---

## Parte D · Comprobación por consola

Está en la función `comprobacionConsola()` al final de `app.js`. Abre la consola (F12) al cargar la página y verás:

| Llamada | Resultado |
|---|---|
| `for...in` | `codigo, ejemplares, autor, paginas, centro` |
| `Object.getOwnPropertyNames` | `codigo, ejemplares, autor, paginas` |

**Diferencia**: `for...in` recorre también las propiedades **enumerables heredadas** del prototipo. `centro` se añadió a `Material.prototype`, así que el libro la hereda. `getOwnPropertyNames` solo devuelve las **propias** del objeto.

**¿Por qué no sale `#disponibles`?** Un campo privado **no es una propiedad** del objeto. Se guarda aparte y solo es accesible con la sintaxis `this.#disponibles` desde dentro de la clase. Ningún método de recorrido lo ve. Tampoco sale `titulo`: es un *getter* definido en el prototipo y los métodos de clase no son enumerables.

**D.2**: se añade `libro.oferta`, aparece en `Object.keys`, se borra con `delete` y desaparece. `"oferta" in libro` da `false` y `resumen()` sigue mostrando todo bien.

---

## Casos de prueba (comprobados)

| Acción | Resultado obtenido |
|---|---|
| Estado inicial | 4 filas · `Libros: 2 · Revistas: 1 · Videojuegos: 1 · Disponibles: 7 de 7` |
| Libro `calcularMulta(21)` · `(25)` | `0` · `0.8` |
| Revista `calcularMulta(7)` · `(10)` | `0` · `0.3` |
| Videojuego `calcularMulta(8)` | `1.5` |
| Prestar Portal 2 dos veces | 2.ª: "No quedan ejemplares de «Portal 2»", sigue en `0/1` |
| Devolver Patria sin prestar | Aviso, caja `0.00 €` |
| Portal 2 con 8 días + Patria con 25 | Caja `2.30 €` · `7 de 7` |
| Filtrar Revistas y prestar Muy Interesante | Una fila con `2/3` · estadísticas `6 de 7` |
| `libro.titulo = " "` · `libro.disponibles = 99` | No cambian (`Patria`, `2`) |

---

## Preguntas de defensa

**¿Dónde está guardado `calcularMulta` y cómo lo encuentra un `Videojuego`?**
En `Material.prototype`. Al llamar `juego.calcularMulta(8)`, JavaScript lo busca en el propio objeto y no está. Pasa a `Videojuego.prototype` y tampoco está. Sube a `Material.prototype` y ahí lo encuentra. Es la **cadena de prototipos**.

**¿Por qué `this.diasMaximos()` ejecuta una versión distinta en cada objeto?**
Porque `this` es el objeto real que llamó al método. La búsqueda de `diasMaximos` empieza en **su** prototipo (`Videojuego.prototype`), que tiene su propia versión, y la encuentra antes de llegar a `Material`.

**¿Por qué contar con `instanceof Material` no serviría para separar tipos?**
Porque **todos** son `Material`: un libro es `instanceof Libro` y también `instanceof Material`. `instanceof Material` daría 4 para todo. Para separar hay que preguntar por la clase hija concreta.
