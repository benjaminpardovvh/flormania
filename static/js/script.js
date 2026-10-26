const enlaceEnvio = document.querySelector("#enlaceEnvio");
const iniciarSesion = document.querySelector("#iniciarSesion");
const verMas = document.querySelector("#verMas");
const contadorResultados = document.querySelector("#contadorResultados");
const sinResultados = document.querySelector("#sinResultados");
const productos = [...document.querySelectorAll(".producto")];
const enlacesCategoria = [...document.querySelectorAll("[data-categoria]")];

document.querySelector("#anio").textContent = new Date().getFullYear();

/* 1. Mouseover / mouseout:
   Al pasar el cursor sobre "Envía Flores", cambia a "Envía Bouquets".
   Cuando el cursor sale, vuelve al texto original.
*/
enlaceEnvio.addEventListener("mouseover", () => {
  enlaceEnvio.textContent = "Envía Bouquets";
});

enlaceEnvio.addEventListener("mouseout", () => {
  enlaceEnvio.textContent = "Envía Flores";
});

/* 2. Iniciar sesión:
   Al hacer clic aparece una alerta con el mensaje de bienvenida,
   como se muestra en la maqueta.
*/
iniciarSesion.addEventListener("click", () => {
  alert("Bienvenido a la tienda de flores");
});

/* 3. Comprar:
   Al hacer clic en Comprar, desaparece solamente el botón presionado.
*/
document.querySelectorAll(".comprar").forEach((boton) => {
  boton.addEventListener("click", () => {
    boton.remove();
  });
});

/* 4. Ver más flores:
   Muestra u oculta las dos tarjetas adicionales.
*/
verMas.addEventListener("click", () => {
  const adicionales = document.querySelectorAll(".adicional");
  const mostrar = verMas.dataset.mostrando !== "true";

  adicionales.forEach((producto) => {
    producto.hidden = !mostrar;
  });

  verMas.dataset.mostrando = String(mostrar);
  verMas.textContent = mostrar ? "Ver menos Flores" : "Ver más Flores";
  actualizarContador();
});

/* 5. Categorías:
   Filtra el catálogo según la categoría seleccionada.
*/
enlacesCategoria.forEach((enlace) => {
  enlace.addEventListener("click", (evento) => {
    evento.preventDefault();
    const categoria = enlace.dataset.categoria;
    const mostrandoAdicionales = verMas.dataset.mostrando === "true";

    productos.forEach((producto) => {
      const esAdicional = producto.classList.contains("adicional");
      producto.hidden = producto.dataset.categoria !== categoria ||
        (esAdicional && !mostrandoAdicionales);
    });

    enlacesCategoria.forEach((item) => item.classList.toggle("activa", item === enlace));
    actualizarContador();
    document.querySelector("#catalogo").scrollIntoView({ behavior: "smooth" });
  });
});

function actualizarContador() {
  const cantidad = productos.filter((producto) => !producto.hidden).length;
  contadorResultados.textContent = `Mostrando ${cantidad} resultado${cantidad === 1 ? "" : "s"}`;
  sinResultados.hidden = cantidad !== 0;
}
