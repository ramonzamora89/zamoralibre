/* #ZamoraLibre — contador de días, menú y carrusel. Sin dependencias. */
(function () {
  "use strict";

  /* ----- Contador de días de persecución judicial ------------------------ */
  /* Días completos desde la captura (2022-07-29). Los 1,295 días en prisión
     son una cifra fija y van escritos en el HTML. */
  function diasDesde(fechaISO) {
    var inicio = new Date(fechaISO);
    var ahora = new Date();
    return Math.floor((ahora - inicio) / 86400000);
  }

  function pintarContador() {
    document.querySelectorAll("[data-contador]").forEach(function (el) {
      var dias = diasDesde(el.getAttribute("data-desde") || "2022-07-29");
      var numero = el.querySelector(".dias-numero");
      if (numero) numero.textContent = dias.toLocaleString("en-US");
    });
  }

  /* ----- Menú ----------------------------------------------------------- */
  function iniciarMenu() {
    var boton = document.querySelector("[data-menu-boton]");
    var panel = document.querySelector("[data-menu-panel]");
    if (!boton || !panel) return;

    function abrir(estado) {
      boton.setAttribute("aria-expanded", String(estado));
      panel.setAttribute("data-abierto", String(estado));
      document.body.setAttribute("data-menu-abierto", String(estado));
      if (estado) {
        var primero = panel.querySelector("a");
        if (primero) primero.focus();
      }
    }

    boton.addEventListener("click", function () {
      abrir(boton.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && boton.getAttribute("aria-expanded") === "true") {
        abrir(false);
        boton.focus();
      }
    });

    panel.addEventListener("click", function (e) {
      if (e.target.tagName === "A") abrir(false);
    });
  }

  /* ----- Carrusel de organizaciones ------------------------------------- */
  function iniciarCarrusel() {
    document.querySelectorAll("[data-carrusel]").forEach(function (carrusel) {
      var pista = carrusel.querySelector("[data-carrusel-pista]");
      var anterior = carrusel.querySelector("[data-carrusel-anterior]");
      var siguiente = carrusel.querySelector("[data-carrusel-siguiente]");
      if (!pista) return;

      function paso() {
        var item = pista.firstElementChild;
        if (!item) return pista.clientWidth;
        var estilo = getComputedStyle(pista);
        return item.getBoundingClientRect().width + parseFloat(estilo.columnGap || 0);
      }

      function actualizarFlechas() {
        var max = pista.scrollWidth - pista.clientWidth - 1;
        if (anterior) anterior.disabled = pista.scrollLeft <= 0;
        if (siguiente) siguiente.disabled = pista.scrollLeft >= max;
      }

      if (anterior) {
        anterior.addEventListener("click", function () {
          pista.scrollBy({ left: -paso(), behavior: "smooth" });
        });
      }
      if (siguiente) {
        siguiente.addEventListener("click", function () {
          pista.scrollBy({ left: paso(), behavior: "smooth" });
        });
      }

      pista.addEventListener("scroll", actualizarFlechas, { passive: true });
      window.addEventListener("resize", actualizarFlechas);
      actualizarFlechas();
    });
  }

  /* ----- Marquesina: duplica el contenido para que el bucle sea continuo -- */
  function iniciarMarquesina() {
    document.querySelectorAll("[data-marquesina]").forEach(function (m) {
      var pista = m.querySelector(".marquesina__pista");
      if (!pista) return;
      var copia = pista.cloneNode(true);
      copia.setAttribute("aria-hidden", "true");
      m.appendChild(copia);
    });
  }

  /* ----- Cronología horizontal del caso ---------------------------------- */
  /* Abre en el hecho más reciente; flechas, teclado y botones por año. */
  function iniciarCronologia() {
    var suave = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

    document.querySelectorAll("[data-cronologia]").forEach(function (bloque) {
      var pista = bloque.querySelector("[data-cronologia-pista]");
      if (!pista) return;
      var items = Array.prototype.slice.call(pista.children);
      var anterior = bloque.querySelector("[data-cronologia-anterior]");
      var siguiente = bloque.querySelector("[data-cronologia-siguiente]");
      var botonesAnio = bloque.querySelectorAll("[data-cronologia-anio]");

      function inicioVisible() {
        return pista.scrollLeft + parseFloat(getComputedStyle(pista).paddingLeft);
      }

      function irA(item, comportamiento) {
        var destino = item.offsetLeft - parseFloat(getComputedStyle(pista).paddingLeft);
        pista.scrollTo({ left: destino, behavior: comportamiento || suave });
      }

      function paso() {
        return Math.max(items[0].getBoundingClientRect().width, pista.clientWidth * 0.8);
      }

      function actualizar() {
        var max = pista.scrollWidth - pista.clientWidth - 1;
        if (anterior) anterior.disabled = pista.scrollLeft <= 0;
        if (siguiente) siguiente.disabled = pista.scrollLeft >= max;
        // Año del primer hecho visible a la izquierda.
        var borde = inicioVisible() + 20, anio = items[0].getAttribute("data-anio");
        items.forEach(function (it) { if (it.offsetLeft <= borde) anio = it.getAttribute("data-anio"); });
        if (pista.scrollLeft >= max) anio = items[items.length - 1].getAttribute("data-anio");
        botonesAnio.forEach(function (b) {
          b.setAttribute("aria-pressed", String(b.getAttribute("data-cronologia-anio") === anio));
        });
      }

      if (anterior) anterior.addEventListener("click", function () { pista.scrollBy({ left: -paso(), behavior: suave }); });
      if (siguiente) siguiente.addEventListener("click", function () { pista.scrollBy({ left: paso(), behavior: suave }); });

      botonesAnio.forEach(function (b) {
        b.addEventListener("click", function () {
          var anio = b.getAttribute("data-cronologia-anio");
          for (var i = 0; i < items.length; i++) {
            if (items[i].getAttribute("data-anio") === anio) { irA(items[i]); break; }
          }
        });
      });

      pista.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { e.preventDefault(); pista.scrollBy({ left: paso(), behavior: suave }); }
        if (e.key === "ArrowLeft") { e.preventDefault(); pista.scrollBy({ left: -paso(), behavior: suave }); }
        if (e.key === "Home") { e.preventDefault(); pista.scrollTo({ left: 0, behavior: suave }); }
        if (e.key === "End") { e.preventDefault(); pista.scrollTo({ left: pista.scrollWidth, behavior: suave }); }
      });

      pista.addEventListener("scroll", actualizar, { passive: true });
      window.addEventListener("resize", actualizar);

      // Empieza mostrando lo más reciente.
      pista.scrollLeft = pista.scrollWidth;
      actualizar();
    });
  }

  function iniciar() {
    pintarContador();
    iniciarMenu();
    iniciarCarrusel();
    iniciarMarquesina();
    iniciarCronologia();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
