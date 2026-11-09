# EX5 · Taquilla de un festival: explicación

## Idea general: tres estados que coordinar

| Estado | Variable | Qué guarda |
|---|---|---|
| **Modelo** | `entradas` (array de objetos `General`, `VIP`, `Grupo`) | Los datos reales |
| **Modo del formulario** | `idEdicion` (`null` o un id) | Si estás creando o editando, y cuál |
| **Filtros** | Los valores de `#filtroDia`, `#buscar` y `#pendientes` | Qué parte del modelo se ve |

Cada interacción sigue siempre el mismo camino: **evento → validación → lectura → modelo → `renderizar()`**. La vista nunca se toca a mano: siempre se repinta desde el modelo.

El código está ordenado en el mismo orden que el enunciado: modelo, estado, validación, acciones y vista.

---

## Parte A · Modelo con clases

### A.1 · Base e hijas

```
Entrada (id, comprador, correo, dia, socio, #validada)
 ├─ General   (nada propio)
 ├─ VIP       (backstage)
 └─ Grupo     (numPersonas)
```

Los datos comunes van en el constructor de `Entrada`. Cada hija solo añade lo suyo después de `super(...)`. `General` ni siquiera necesita constructor: si una clase hija no lo define, usa automáticamente el del padre.

### A.2 · `precio()` una vez, `importe()` en cada hija

```js
// Entrada
precio() {
  let total = this.importe();                  // ← la versión de cada hija
  if (this.socio !== "") total *= 0.9;
  return Math.round(total * 100) / 100;
}

// General
importe() { return 35 * this.factorDia; }

// VIP: el backstage se suma DESPUÉS del abono
importe() { return 80 * this.factorDia + (this.backstage ? 20 : 0); }

// Grupo: 10 % desde 6 personas, y después el abono
importe() {
  let total = 30 * this.numPersonas;
  if (this.numPersonas >= 6) total *= 0.9;
  return total * this.factorDia;
}
```

`factorDia` es un *getter* de la base: devuelve `1.8` si el día es `"ambos"` y `1` si no. Las tres hijas lo usan y así el 1,8 no se repite.

**Comprobación de un caso**: VIP · ambos · backstage · socio → `80 × 1,8 + 20 = 164` → `164 × 0,9 = 147,60 €` ✔.

### A.3 · `personas` polimórfico y `validar()`

```js
// Entrada
get personas() { return 1; }
// Grupo
get personas() { return this.numPersonas; }
```

Así `Entrada.ocupacion` puede sumar `e.personas` **sin preguntar de qué tipo es** cada entrada.

`#validada` es un campo **privado** con *getter* pero sin *setter*. Solo se puede cambiar llamando a `validar()`, y solo hacia `true`: no hay forma de "desvalidar". El *getter* `modificable` (`!validada`) se usa en dos sitios:
- En `crearFila`: si no es modificable, no se crean los botones.
- En la escucha delegada: `if (accion === "editar" && entrada.modificable)`. Esto protege **aunque alguien fuerce el clic** desde la consola.

### A.4 · `Entrada.ocupacion(lista, dia, idExcluido)`

```js
static ocupacion(lista, dia, idExcluido = null) {
  return lista
    .filter(e => e.id !== idExcluido && e.ocupaDia(dia))
    .reduce((suma, e) => suma + e.personas, 0);
}
```

`ocupaDia(dia)` devuelve `true` si la entrada es de ese día **o de ambos**. Esta única función resuelve tres cosas: el aforo, el panel y el filtro por día.

---

## Parte B · Formulario y validación

### B.1 · Campos según el tipo

`actualizarCamposTipo()` se llama cada vez que cambia el `<select>` de tipo:
- **Grupo**: habilita `personas` y lo hace `required`.
- **VIP**: habilita `backstage`.
- Lo que no aplica queda `disabled` **y vacío** (`value = ""`, `checked = false`). Si no lo vaciaras, al volver a habilitarlo reaparecería el valor anterior.

### B.2 · Nombre y personas

- Nombre: `setCustomValidity` si `trim().length < 3`. No sirve `minlength="3"` porque **no hace `trim`**: aceptaría `"   "`.
- Personas: `min="4" max="12" step="1"` en el HTML. Con `step` se rechaza `4.5`.

### B.3 · Aforo

```js
const necesarias = tipo === "grupo" ? Number(inputPersonas.value) : 1;
const dias = dia === "ambos" ? ["sabado", "domingo"] : [dia];

for (const d of dias) {
  const libres = 20 - Entrada.ocupacion(entradas, d, idEdicion);
  if (necesarias > libres) {
    const campo = tipo === "grupo" ? inputPersonas : radioMarcado;
    campo.setCustomValidity(`El sábado está completo para esta entrada: quedan ${libres} plazas y necesitas ${necesarias}.`);
    return;
  }
}
```

- Una entrada **«Ambos»** comprueba **los dos días**. Si el sábado está lleno, se rechaza aunque el domingo tenga sitio.
- **El campo que corresponde**: en un grupo, el error va en `personas`, porque reducir el número puede solucionarlo. En General o VIP va en el radio del día, porque la solución es cambiar de día.
- Si `personas` ya es inválido por sí mismo (por ejemplo, 3), no compruebo el aforo: el navegador ya mostrará su error.

### B.4 · Un error corregido no bloquea, un envío inválido no cambia nada

- En la escucha de `input` del formulario, lo primero es `limpiarErroresPropios()`. En cuanto el usuario toca un campo, los errores propios desaparecen y se recalculan en el siguiente envío.
- En `submit`, si `reportValidity()` es `false`, hay `return` **antes** de tocar `entradas`.

---

## Parte C · Altas, edición y acciones

### C.1 · Una única escucha delegada

```js
ulEntradas.addEventListener("click", e => {
  const boton = e.target.closest("button[data-accion]");
  if (!boton) return;
  const id = Number(boton.dataset.id);          // dataset → string, el id es número
  const entrada = entradas.find(en => en.id === id);
  ...
});
```

Un solo `if` por acción: `validar`, `editar` y `eliminar`.

### C.2 · Editar

`empezarEdicion(entrada)` rellena el formulario desde el objeto:
- `selectTipo.value = entrada.tipo()`: cada clase devuelve su tipo (`"general"`, `"vip"`, `"grupo"`).
- `form.elements.dia.value = entrada.dia`: con un grupo de radios, `form.elements.dia` es una `RadioNodeList` y asignarle `value` **marca el radio** que tenga ese valor.
- **El orden importa**: primero `actualizarCamposTipo()` (habilita personas y backstage) y **después** se rellenan. Si fuera al revés, `actualizarCamposTipo` los vaciaría.
- El botón cambia a «Guardar cambios» y aparece «Cancelar edición».

### C.3 · Guardar conservando id y posición

```js
const posicion = entradas.findIndex(en => en.id === idEdicion);
entradas[posicion] = crearEntrada(idEdicion, datos);
```

- Una General que pasa a Grupo **no puede cambiar de clase**: un objeto no se transforma en otra clase. Por eso se crea **un objeto nuevo** con `crearEntrada` (que elige la clase según el tipo) y se pone **en la misma posición**, con el **mismo id**.
- Con `push` cambiaría la posición y con `siguienteId++` cambiaría el id. Por eso se sustituye por índice.

### C.4 · Sus propias plazas no cuentan

`Entrada.ocupacion(entradas, d, idEdicion)`: al editar, la entrada que se está editando se excluye del recuento. Sin esto, editar el grupo de 10 con el sábado lleno contaría sus 10 plazas dos veces (las guardadas y las nuevas) y se rechazaría.

### C.5 · Escape y eliminar durante la edición

- `form.addEventListener("keydown", ...)`: el `keydown` de cualquier campo **sube** hasta el formulario. Si es Escape y se está editando, se cancela.
- Al eliminar la entrada que se está editando (o validarla), `reiniciarFormulario()` vuelve al modo crear. Si no, al guardar se buscaría un id que ya no existe.

---

## Parte D · Vista y panel

### D.1 y D.2 · Tres funciones separadas

```js
filtrar(lista, filtros)   // → array nuevo con los visibles
calcularPanel(lista)      // → objeto con los números del panel
renderizar()              // → pinta usando las otras dos
```

- `filtrar` encadena tres `filter`. Usa `e.ocupaDia(filtros.dia)`, así que una entrada «Ambos» aparece tanto con «Sábado» como con «Domingo».
- `renderizar` usa `replaceChildren(...visibles.map(crearFila))`: vacía la lista y mete todas las filas nuevas en una línea.

### D.3 · Panel siempre sobre el total

`calcularPanel(entradas)` recibe **el array completo**, nunca los visibles. Por eso, al filtrar, el panel no cambia. Validadas y recaudación se calculan con `reduce`.

### D.4 · Recuento con `instanceof`

`contarPorTipo(lista)` cuenta con `instanceof General / VIP / Grupo` e `informeTipos()` lo muestra en consola. Se llama al cargar y después de cada alta, edición o eliminación (lo pide el enunciado, no es un `console.log` temporal).

### D.5 · Breakpoint en la escucha delegada (guía para anotarlo)

1. DevTools → *Sources* → `app.js` → breakpoint en la línea `const boton = e.target.closest(...)` de la escucha de `ulEntradas`.
2. Crea una entrada y pulsa **Validar**.
3. Con la ejecución parada, en *Scope* verás:
   - `e.target` → `<button data-accion="validar" data-id="1">`
   - `e.currentTarget` → `<ul id="entradas">` (quien tiene la escucha)
4. Avanza con F10 hasta después de `const accion = ...` → `accion = "validar"`, `id = 1` (número, tras `Number`).
5. En la consola, **antes** de `entrada.validar()`: `entradas[0].validada` → `false`.
6. F10 una línea más y repite → `true`. El **modelo** ya ha cambiado, pero la pantalla todavía no: se actualiza al ejecutar `renderizar()`.

---

## Casos de prueba (comprobados)

| Entrada o acción | Resultado obtenido |
|---|---|
| General · sábado · General · ambos | `35.00 €` · `63.00 €` |
| VIP · domingo · backstage | `100.00 €` |
| VIP · ambos · backstage · con y sin `FEST-AB12` | `147.60 €` · `164.00 €` |
| Grupo de 4 · sábado · Grupo de 5 · domingo | `120.00 €` · `150.00 €` |
| Grupo de 6 · ambos | `291.60 €` |
| Socio `FEST-ab12` · `FEST-AB123` · vacío | Inválido · inválido · válido |
| Sábado: grupos de 8 y 10 + una General + una VIP | `Sábado 20/20` |
| Otra General de sábado / de domingo | Rechazada ("El sábado está completo…") / aceptada |
| Sábado lleno, General «Ambos» | Rechazada |
| Sábado lleno, editar el grupo de 10 sin cambios | Se guarda |
| Editar una General a Grupo de 4 | Mismo id y posición · `instanceof Grupo` → `true` |
| Validar una entrada | Desaparecen sus botones · panel `Validadas: 1 de N` |
| Domingo + «Solo sin validar» + buscar | Actúan a la vez y el panel no cambia |
| Escape editando · eliminar la que se edita | Se cancela la edición |

---

## Preguntas de defensa

**Sigue el recorrido completo de un «Guardar cambios».**
1. **Evento**: el clic en el botón submit lanza `submit` en el formulario. `preventDefault()` evita que la página se recargue.
2. **Validación**: `aplicarReglasPropias()` limpia los errores, comprueba el nombre y el aforo (excluyendo `idEdicion`) y pone los `setCustomValidity`. Después, `reportValidity()` revisa también los atributos HTML. Si algo falla, `return` y no cambia nada.
3. **Lectura**: `leerFormulario()` usa `FormData`, convierte los tipos (`Number`, `has`) y normaliza los textos (`trim`, `toLowerCase`).
4. **Modelo**: `findIndex` localiza la posición y `crearEntrada(idEdicion, datos)` crea el objeto de la clase que toque y lo pone en su sitio.
5. **DOM**: `reiniciarFormulario()` vuelve al modo crear (`idEdicion = null`, textos de botones, campos) y `renderizar()` repinta la lista y el panel.

**¿Qué tres estados coordinas?**
El modelo (`entradas`), el modo del formulario (`idEdicion`) y los filtros de la vista. El error típico es que se desincronicen: por ejemplo, eliminar la entrada en edición y que `idEdicion` siga apuntando a ella. Por eso eliminarla o validarla llama a `reiniciarFormulario()`.

**¿Por qué `importe()` se sobrescribe y `precio()` no?**
Porque `importe()` es lo que **cambia** entre tipos (cada uno calcula de forma distinta) y `precio()` es lo que **es igual** para todos (el descuento de socio). Poner la parte común en la base y la variable en las hijas evita repetir código. Si mañana el descuento pasa al 15 %, se cambia en un solo sitio.

**¿Qué parte moverías a otro archivo si la aplicación creciera?**
Las clases (`Entrada`, `General`, `VIP`, `Grupo` y `crearEntrada`) a un `modelo.js`, porque no dependen del DOM y se podrían reutilizar o probar por separado. Después, las funciones puras de cálculo (`filtrar`, `calcularPanel`, `contarPorTipo`), y en `app.js` solo los eventos y el renderizado. Se conectan con `import`/`export` y `<script type="module">`.
