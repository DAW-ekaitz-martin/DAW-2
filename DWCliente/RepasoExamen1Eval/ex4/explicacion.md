# EX4 · Tablón de incidencias: explicación

## Archivos de esta carpeta

| Archivo | Para qué |
|---|---|
| `laboratorio/` | Parte A: el código de eventos del enunciado, para comprobar tus predicciones en la consola. |
| `codigo-original/` | Parte B: el código **con los 10 fallos**, tal cual venía. Para reproducir síntomas y practicar breakpoints. |
| `index.html` + `app.js` | Versión **corregida y ampliada** (partes B y C). Cada arreglo está marcado con un comentario `FALLO n`. |

---

## Parte A · Predice sin ejecutar

### Cómo viaja un clic

Un evento recorre el DOM en **tres fases**:

1. **Captura**: baja desde `document` hasta el elemento pulsado. Solo se ejecutan las escuchas con `{ capture: true }`.
2. **Objetivo**: llega al elemento pulsado (`e.target`).
3. **Burbuja**: sube de vuelta hasta `document`. Se ejecutan las escuchas normales.

En **cada elemento**, las escuchas se ejecutan **en el orden en que se registraron**.

El camino del clic en «Cerrar» es `panel → tarjeta → accion (button) → texto (span)`:

```
CAPTURA   panel(A, capture) ──▶ tarjeta ──▶ accion ──▶ span (objetivo)
BURBUJA   span ──▶ accion(C, D, E, G) ──▶ tarjeta(B) ──▶ panel(F)
                          ▲ stopPropagation corta aquí la subida
```

### Respuestas (comprobadas en el navegador)

**1. Primer clic sobre «Cerrar»** → `A C D E G`
- `A`: escucha de **captura** en `panel`, se ejecuta al bajar.
- `C` y `D`: primera escucha del botón. `stopPropagation()` **no detiene la propia función**, así que `D` se imprime igualmente.
- `E` y `G`: `stopPropagation()` impide pasar a **otros elementos**, pero las demás escuchas **del mismo elemento** (`accion`) sí se ejecutan.
- `B` y `F` no salen: están en `tarjeta` y `panel` en fase de burbuja, y la propagación se cortó en el botón.

**2. Segundo clic** → `A C D E`
`G` tenía `{ once: true }`: se ejecuta una vez y el navegador la elimina automáticamente.

**3. Clic en la tarjeta, fuera del botón** → `A`, `B tarjeta tarjeta`, `F`
- `A` en captura, `B` en la tarjeta (que ahora es el objetivo) y `F` al subir al panel.
- `e.target.id` = `"tarjeta"` (donde se hizo clic) y `e.currentTarget.id` = `"tarjeta"` (quien tiene la escucha). Coinciden porque el clic fue en la propia tarjeta.
- No hay `stopPropagation` en este camino, así que `F` sí sale.

**4. Con `stopImmediatePropagation`** → `A C D`
Desaparecen **`E` y `G`**. A diferencia de `stopPropagation`, `stopImmediatePropagation` también impide que se ejecuten **las demás escuchas del mismo elemento**. `B` y `F` seguían sin salir. Como `G` nunca llega a ejecutarse, tampoco se elimina: en el segundo clic seguiría registrada (aunque bloqueada).

**5. Si la escucha de `tarjeta` llegara a ejecutarse tras pulsar el span**
- `e.target.id` = **`"texto"`**: el elemento **exacto** donde se hizo clic, el más profundo.
- `e.currentTarget.id` = **`"tarjeta"`**: el elemento **al que pertenece la escucha** que se está ejecutando.

> Truco para recordarlo: `target` = **dónde** se hizo clic; `currentTarget` = **quién** está escuchando.

---

## Parte B · Los 10 fallos

| N.º | Dónde está | Causa | Corrección | Cómo lo he comprobado |
|---|---|---|---|---|
| **1** | `index.html`, `<script>` en el `<head>` | Sin `defer`, el script se ejecuta **antes** de que exista el `<body>`. Todos los `querySelector` devuelven `null` y `form.addEventListener` lanza `TypeError: Cannot read properties of null`. | `<script src="app.js" defer>` | La consola mostraba el error al cargar. Tras el cambio, desaparece. |
| **2** | `filtro.addEventListener("change", aplicarFiltro())` | Con paréntesis se **ejecuta** la función al registrar y se pasa su resultado (`undefined`). La escucha no hace nada. | Pasar la función sin paréntesis: `filtro.addEventListener("change", renderizar)` | Cambiar «Ver» no hacía nada. Ahora filtra. |
| **3** | `<button id="limpiar">` | Un `<button>` dentro de un `<form>` es **`type="submit"` por defecto**. Pulsarlo envía el formulario. | `type="button"` | Pulsar «Limpiar» con el título corto mostraba el error de validación. Ahora solo vacía. |
| **4** | `validar()` | `setCustomValidity` se ponía pero **nunca se quitaba**. Una vez inválido, el título seguía inválido aunque se corrigiera. | `titulo.setCustomValidity("")` al empezar `validar()` y al escribir en el título. | Enviar "Hola", corregir a "Hola mundo" y reenviar: antes se rechazaba, ahora se añade. |
| **5** | `<input id="prioridad">` | Sin `required`, el campo vacío es válido. `Number("")` da **0** y aparece `P0`. | Añadir `required` (y `step="1"` para exigir enteros). | Añadir sin prioridad: antes salía `P0`, ahora se rechaza. |
| **6** | `aplicarFiltro()` | Hacía `incidencias = incidencias.filter(...)`: **sobrescribía el array original** y las filtradas se perdían para siempre. | Nueva función `filtrar(lista)` que **devuelve una lista nueva**. `renderizar` pinta esa copia y `incidencias` no se toca. | "Abiertas" → "Todas": antes la cerrada desaparecía; ahora vuelve. |
| **7** | `gestionarClic`, `evento.target.dataset` | El botón tiene un `<span>` dentro. Al pulsar el texto, `target` es el **span**, que no tiene `data-accion`. | `evento.target.closest("button[data-accion]")` | Pulsar el texto del botón no hacía nada. Ahora funciona. |
| **8** | `gestionarClic`, `const id = ...dataset.id` | `dataset` siempre devuelve **strings** (`"2"`) y los id son **números** (`2`). `"2" === 2` es `false`: `find` devuelve `undefined` (error al hacer `.abierta`) y el `filter` de borrar no quita nada. | `Number(boton.dataset.id)` | Breakpoint en `gestionarClic`: `id` aparecía como `"2"` entre comillas. |
| **9** | `renderizar()`, `listado.addEventListener(...)` | Cada renderizado **añadía otra escucha** con una flecha nueva. Tras N renderizados, un clic ejecutaba la acción N veces. | Registrar `listado.addEventListener("click", gestionarClic)` **una sola vez**, fuera de `renderizar`. | Filtrar varias veces y pulsar «Cerrar»: antes la incidencia se cerraba y reabría (número par de veces); ahora cambia una vez. |
| **10** | `fila.innerHTML = \`<strong>${i.titulo}</strong>...\`` | `innerHTML` **interpreta** el texto como HTML. `<b>Hola</b>` se ve en negrita. Además es un agujero de seguridad (XSS). | Crear el `<strong>` con `createElement` y poner el título con `textContent`. | Añadir `<b>Hola</b>`: ahora se ve literal y no hay ningún `<b>` en el DOM. |

### Fallos que se ocultaban detrás de otros

- **El 1 ocultaba todos**: con el script sin cargar, no se podía probar nada.
- **El 7 ocultaba el 8**: mientras pulsar el texto no hacía nada, no se veía que el id era un string. Al arreglar el 7 aparece el error de `incidencia` `undefined`.
- **El 8 ocultaba el 9**: mientras «Cerrar» daba error y «Borrar» no hacía nada, no se notaba que cada clic se ejecutaba varias veces.

---

## Parte C · Ampliación

### C.1 · Clase `Incidencia`

```js
class Incidencia {
  constructor(id, titulo, prioridad, abierta = true) { ... }
  alternar() { this.abierta = !this.abierta; }
  get urgente() { return this.prioridad >= 4; }
}
```

`abierta = true` es un **valor por defecto**: al crear una nueva desde el formulario no hace falta pasarlo. Los datos iniciales se crean con `new Incidencia(...)`, y `gestionarClic` llama a `incidencia.alternar()` en vez de cambiar la propiedad a mano.

### C.2 · Contador

```js
function calcularContador(visibles) {
  return {
    visibles: visibles.length,                       // ← lo único que depende del filtro
    abiertas: incidencias.filter(i => i.abierta).length,
    urgentesAbiertas: incidencias.filter(i => i.abierta && i.urgente).length,
    total: incidencias.length
  };
}
```

`visibles` sale de la lista filtrada y el resto, de `incidencias` (el array completo).

### C.3 · Búsqueda combinada y Escape

- `filtrar()` encadena dos `filter`: estado y texto. Así se combinan.
- La búsqueda escucha `input`, que se lanza en cada letra.
- **Escape**:

```js
buscar.addEventListener("keydown", e => {
  if (e.key !== "Escape" || e.repeat) return;
  e.preventDefault();
  buscar.value = "";
  renderizar();
});
```

- `e.repeat` es `true` en las repeticiones automáticas que lanza el sistema al **mantener** una tecla pulsada. Ignorándolas, el trabajo se hace una sola vez.
- `e.preventDefault()`: en un `type="search"`, el navegador ya vacía el campo con Escape. Así lo controlamos nosotros y no se hace dos veces.
- Hay que llamar a `renderizar()` porque asignar `value` por código **no lanza `input`**.

### C.4 · Mensaje vacío y foco

- `vacio.hidden = visibles.length > 0;` al final de `renderizar`.
- `titulo.focus()` después de un alta correcta (dentro de `guardar`, tras `renderizar`). Así se puede escribir la siguiente sin coger el ratón.

---

## Comprobación final (hecha)

| Prueba | Resultado |
|---|---|
| Datos iniciales | `Visibles: 3 · Abiertas: 2 · Urgentes abiertas: 1 · Total: 3` |
| Cerrar «Wifi lento» + filtro «Abiertas» | `Visibles: 1 · Abiertas: 1 · Urgentes abiertas: 0 · Total: 3` |
| Dos con el mismo título y borrar una | La otra permanece (se borra por **id**, no por título) |
| Filtrar 10 veces y pulsar «Cerrar» | Una sola operación |
| Pulsar el `<span>` de cada botón | Funciona |
| Título corto → corregir → reenviar | Se acepta |
| `<b>Hola</b>` | Se ve literal |

---

## Preguntas de defensa

**¿Qué fallo se ocultaba detrás de otro?**
El 8 (id string) detrás del 7 (span). Mientras el clic en el texto no llegaba al botón, nunca se ejecutaba el `find`, así que no se veía que el id no coincidía. El 9 se veía aún más tarde, cuando las acciones ya funcionaban.

**¿Por qué registrar la escucha dentro de `renderizar` duplica acciones aquí, pero no lo haría con una función con nombre?**
`addEventListener` **no añade dos veces la misma función** en el mismo elemento y evento: si recibe exactamente la misma referencia, la ignora. Con `(e) => gestionarClic(e)`, cada `renderizar()` crea **una flecha nueva**, que es una función distinta aunque haga lo mismo, y se acumulan. Con `listado.addEventListener("click", gestionarClic)`, la referencia es siempre la misma y no se duplicaría. Aun así, lo correcto es registrarla una vez fuera.

**Elige un fallo y muéstralo con un breakpoint.**
Con el **fallo 8**, en `codigo-original/` (tras arreglar el 1 y el 7 para poder llegar):
1. DevTools → *Sources* → `app.js` → clic en el número de línea de `const id = evento.target.dataset.id;`.
2. Pulsa «Cerrar» en una incidencia. La ejecución se para.
3. Pulsa *Step over* (F10) y, en *Scope*, mira `id`: aparece **`"2"`** (con comillas, string).
4. En la consola, en pausa, escribe `incidencias[1].id === id` → `false`. Y `incidencias[1].id === Number(id)` → `true`.
