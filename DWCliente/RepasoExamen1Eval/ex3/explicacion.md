# EX3 · Citas de un taller mecánico: explicación

## Idea general

En este ejercicio, lo importante es **quién valida qué**:

| Regla | Quién la valida | Por qué |
|---|---|---|
| Campos obligatorios, formato de correo | HTML (`required`, `type="email"`) | Ya venía en el HTML |
| Formato de matrícula | HTML (`pattern`) | Es un patrón fijo |
| Km entre 0 y 999 999, entero | HTML (`min`, `max`, `step`) | Son límites fijos |
| Los dos correos coinciden | JavaScript (`setCustomValidity`) | Compara **dos** campos |
| Matrícula no repetida | JavaScript | Depende del **array de citas** |
| Dirección con 8 caracteres si hay recogida | JavaScript | Depende de **otra casilla** y del `trim` |

Al enviar, JavaScript aplica sus reglas y después `reportValidity()` comprueba **todo junto** (HTML + propias) y muestra el primer error.

---

## Parte A · Modelo

### A.1 · Clase `Cita`

Guarda `id`, `matricula`, `correo`, `km`, `servicio`, `extras` (array de strings, p. ej. `["lavado"]`) y `direccion`. He decidido que `direccion` sea **`null` cuando no hay recogida**. Así `precioTotal()` sabe si sumar los 12 € sin mirar el formulario.

### A.2 · `precioServicio` estático con `switch`

```js
static precioServicio(servicio) {
  switch (servicio) {
    case "aceite": return 60;
    case "revision": return 90;
    case "frenos": return 120;
    default: return 0;
  }
}
```

Con `return` en cada `case` no hace falta `break`, porque el `return` ya sale de la función.

### A.3 · `recargoKm` y `precioTotal()`

```js
get recargoKm() { return this.km >= 150000; }

precioTotal() {
  const extras = this.extras.reduce((suma, extra) => suma + (Cita.PRECIOS_EXTRAS[extra] ?? 0), 0);
  let total = Cita.precioServicio(this.servicio) + extras;
  if (this.recargoKm) total *= 1.1;
  if (this.direccion !== null) total += 12;
  return Math.round(total * 100) / 100;
}
```

- **El orden importa**: primero el 10 % sobre servicio + extras y **después** los 12 € de recogida. Así la recogida no lleva recargo: frenos a 200 000 km con recogida da `120 × 1,1 + 12 = 144`, no `(120 + 12) × 1,1 = 145,20`.
- `>=` porque el enunciado dice "**desde** 150 000". Con 150 000 hay recargo (99 €) y con 149 999 no (90 €).
- `recargoKm` es un *getter*: se usa como propiedad (`cita.recargoKm`), sin paréntesis.

---

## Parte B · Validación

### B.1 · `pattern` de la matrícula

```html
pattern="[0-9]{4}[BCDFGHJKLMNPRSTVWXYZ]{3}"
```

- **Sin barras** `/.../` y **sin `^` ni `$`**: el atributo `pattern` ya obliga a que coincida el valor **entero**.
- La lista de consonantes excluye a mano las vocales (A, E, I, O, U), la **Ñ** y la **Q**. Por eso `1234BCÑ` y `1234BCQ` fallan.
- No hay flag de mayúsculas/minúsculas, así que `1234bcd` es inválida.

### B.2 · Kilómetros

```html
type="number" required min="0" max="999999" step="1"
```

`step="1"` hace que `1500.5` sea inválido (`stepMismatch`). Con `min="0"` el 0 es válido.

### B.3, B.4, B.5 · Reglas propias

Todas están en `aplicarReglasPropias()`, que **primero limpia** los errores y después pone los que toquen:

```js
function aplicarReglasPropias() {
  limpiarErroresPropios();
  if (inputCorreo2.value.trim() !== "" &&
      normalizarCorreo(inputCorreo.value) !== normalizarCorreo(inputCorreo2.value)) {
    inputCorreo2.setCustomValidity("Los dos correos no coinciden.");
  }
  ...
}
```

- **Correos**: `normalizarCorreo` hace `trim().toLowerCase()`, así que `Ana@Correo.com` y ` ana@correo.com ` coinciden. Si `correo2` está vacío no pongo mi error y dejo que salte el de `required`, que es más claro.
- **Matrícula repetida**: `citas.some(c => c.matricula === matricula)`. Como se busca en el array, al anular una cita la matrícula vuelve a estar libre sin hacer nada más.
- **Dirección**: solo se comprueba si la casilla está marcada.

### B.5 · Habilitar o deshabilitar la dirección

```js
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
```

Un campo **deshabilitado no se valida** ni se envía. Aun así lo vacío y le quito el error, para que al volver a marcar la casilla empiece limpio.

### B.6 · `setCustomValidity` y `reportValidity`

- `setCustomValidity("mensaje")` marca el campo como inválido con ese texto.
- `setCustomValidity("")` lo vuelve a marcar como válido. **Si no lo limpias, el campo sigue inválido para siempre**, aunque el usuario lo corrija.
- Por eso, en la escucha de `input`, lo primero es `limpiarErroresPropios()`: en cuanto el usuario toca algo, los errores propios se retiran y se recalculan en el siguiente envío.
- `reportValidity()` comprueba todo el formulario, muestra la burbuja del primer error y devuelve `true` o `false`.

---

## Parte C · Flujo del formulario

### C.1 · Una única escucha de `input`

```js
form.addEventListener("input", e => {
  limpiarErroresPropios();
  if (e.target === checkDomicilio) actualizarDireccion();
  actualizarPrevia();
});
```

- El evento `input` **sube** (burbujea) desde cualquier campo hasta el formulario, así que basta con una escucha. Los `checkbox` y el `select` también lanzan `input`.
- `e.target` dice qué campo ha cambiado. Solo si es la casilla de recogida hay que habilitar o deshabilitar la dirección.

**`actualizarPrevia()`**:

```js
if (servicio === "" || !inputKm.validity.valid) {
  pPrevia.textContent = "Precio estimado: —";
  return;
}
```

- **Un km vacío no es 0**: `Number("")` daría 0 y calcularía un precio. Con `inputKm.validity.valid`, el campo vacío es inválido (por el `required`) y se muestra `—`. Un `0` escrito sí es válido y calcula el precio.
- Para calcular, creo una `Cita` "borrador" y uso su `precioTotal()`. **El precio se calcula en un solo sitio** (el modelo), así que la previa y la lista nunca dan cifras distintas.

### C.2 · Envío con `FormData`

```js
const fd = new FormData(form);
new Cita(
  siguienteId,
  fd.get("matricula").trim(),
  normalizarCorreo(fd.get("correo")),
  Number(fd.get("km")),                 // FormData siempre da strings
  fd.get("servicio"),
  fd.getAll("extras"),                  // TODOS los checkbox marcados con name="extras"
  fd.has("direccion") ? fd.get("direccion").trim() : null
);
```

- `get` devuelve **el primer** valor; `getAll` devuelve **un array con todos**. Para checkboxes con el mismo `name` hay que usar `getAll`.
- **Un envío inválido no modifica el modelo**: el `return` tras `reportValidity()` sale antes del `push`.

### C.3 · Estado inicial tras alta y con «Vaciar»

```js
form.addEventListener("reset", () => {
  limpiarErroresPropios();
  inputDireccion.disabled = true;
  inputDireccion.required = false;
  pPrevia.textContent = "Precio estimado: —";
});
```

- `form.reset()` **lanza el evento `reset`**, igual que pulsar «Vaciar». Así el mismo código sirve para los dos casos.
- El navegador restaura los **valores** (textos, casillas, select), pero no `disabled`, `required` ni los errores propios. Esos los restauro yo.

---

## Parte D · Lista de citas

- `renderizar()` crea un `<li>` por cita con `cita.descripcion()` (matrícula · servicio · extras · precio con `toFixed(2)`) y un botón «Anular» con `data-id`.
- `#resumen` usa `reduce`: `citas.reduce((suma, c) => suma + c.precioTotal(), 0)`.
- «Anular» usa **delegación** en `#citas`, con `closest("button[data-id]")`. `Number(boton.dataset.id)` es necesario porque `dataset` siempre devuelve strings y el id de la cita es un número.

---

## Casos de prueba (comprobados)

| Datos | Resultado obtenido |
|---|---|
| `1234BCD`, `0042XYZ` | Válidas |
| `1234ABC`, `1234bcd`, `123BCD`, `12345BCD`, `1234BCÑ`, `1234BCQ` | Inválidas |
| Aceite + lavado · 90 000 km | `75.00 €` |
| Revisión · 150 000 · 149 999 km | `99.00 €` · `90.00 €` |
| Frenos + lavado + sustitución · 180 000 km | `181.50 €` |
| Frenos · 200 000 km · recogida | `144.00 €` |
| Servicio elegido y km `0` | Calcula `60.00 €` (km vacío muestra `—`) |
| `Ana@Correo.com` / ` ana@correo.com ` | Coinciden; se guarda `ana@correo.com` |
| Dos citas `1234BCD` | La 2.ª se rechaza; tras anular la 1.ª, se acepta |
| Recogida marcada sin dirección; luego desmarcada | Primero inválido; después se guarda con `direccion: null` y sin los 12 € |
| Altas de 75 €, 181,50 € y 144 € | `Citas: 3 · Facturación: 400.50 €` |

---

## Preguntas de defensa

**¿Por qué `direccion` no aparece en `FormData` cuando está deshabilitada?**
Porque los campos `disabled` **no forman parte del envío** del formulario. Es una regla del HTML: el navegador los salta al recoger los datos. Por eso uso `fd.has("direccion")` para saber si hay recogida.

**¿Por qué hace falta limpiar con `setCustomValidity("")`?**
Porque un mensaje propio **no se borra solo**. El campo queda inválido mientras tenga un texto puesto, aunque el usuario lo corrija. Solo vuelve a ser válido si le pasas una cadena vacía.

**¿Qué regla no puede expresarse solo con atributos HTML y por qué?**
Que los correos coincidan (compara dos campos), que la matrícula no esté repetida (depende de los datos guardados en el array) y que la dirección sea obligatoria solo con la casilla marcada (depende de otro campo). Los atributos HTML solo miran el valor de **un campo aislado**, y estas reglas dependen de otros datos.
