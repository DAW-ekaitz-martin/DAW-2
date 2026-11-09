// EX4 · Parte A · Código del enunciado, sin cambios.
// Para la pregunta 4, cambia stopPropagation() por stopImmediatePropagation().
const panel = document.querySelector("#panel");
const tarjeta = document.querySelector("#tarjeta");
const accion = document.querySelector("#accion");

panel.addEventListener("click", () => console.log("A"), { capture: true });

tarjeta.addEventListener("click", (e) => {
  console.log("B", e.target.id, e.currentTarget.id);
});

accion.addEventListener("click", (e) => {
  console.log("C");
  e.stopPropagation();
  console.log("D");
});

accion.addEventListener("click", () => console.log("E"));

panel.addEventListener("click", () => console.log("F"));

accion.addEventListener("click", () => console.log("G"), { once: true });
