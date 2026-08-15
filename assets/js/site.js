/* #ZamoraLibre — contador de días, menú y carrusel. Sin dependencias. */
(function () {
  "use strict";

  /* ----- Contador de días de detención --------------------------------- */
  /* Misma lógica que el sitio original: días completos desde 2022-07-29. */
  function diasDesde(fechaISO) {
    var inicio = new Date(fechaISO);
    var ahora = new Date();
    return Math.floor((ahora - inicio) / 86400000);
  }

  function pintarContador() {
    var dias = diasDesde("2022-07-29");
    document.querySelectorAll("[data-contador]").forEach(function (el) {
      var texto = el.getAttribute("data-contador"); // p. ej. "días de detención arbitraria"
      el.innerHTML = '<span class="dias-numero">' + dias + "</span> " + texto;
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

  function iniciar() {
    pintarContador();
    iniciarMenu();
    iniciarCarrusel();
    iniciarMarquesina();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
