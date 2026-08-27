/* Interruptor de tema, filtro de módulos y año del pie. */
(function () {
  'use strict';

  var raiz = document.documentElement;

  /* --- Tema claro / oscuro --- */
  var boton = document.getElementById('tema');

  function guardar(tema) {
    try { localStorage.setItem('tema', tema); } catch (e) {}
  }

  function pintar(tema) {
    raiz.dataset.theme = tema;
    if (boton) boton.setAttribute('aria-pressed', tema === 'light' ? 'true' : 'false');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', tema === 'light' ? '#fbfbf9' : '#121214');
  }

  pintar(raiz.dataset.theme || 'dark');

  if (boton) {
    boton.addEventListener('click', function () {
      var nuevo = raiz.dataset.theme === 'light' ? 'dark' : 'light';
      pintar(nuevo);
      guardar(nuevo);
    });
  }

  /* --- Filtro por ciclo --- */
  var chips = document.querySelectorAll('[data-filtro]');
  var tarjetas = document.querySelectorAll('#lista-modulos .card');
  var vacio = document.getElementById('vacio');

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var ciclo = chip.dataset.filtro;
      var visibles = 0;

      chips.forEach(function (c) {
        var activo = c === chip;
        c.classList.toggle('is-on', activo);
        c.setAttribute('aria-pressed', activo ? 'true' : 'false');
      });

      tarjetas.forEach(function (card) {
        var ciclos = (card.dataset.ciclo || '').split(' ');
        var mostrar = ciclo === 'todos' || ciclos.indexOf(ciclo) !== -1;
        card.hidden = !mostrar;
        if (mostrar) visibles++;
      });

      if (vacio) vacio.hidden = visibles !== 0;
    });
  });

  /* --- Correo: se compone aquí para no dejarlo escrito en el HTML --- */
  document.querySelectorAll('.mail').forEach(function (nodo) {
    var u = nodo.dataset.u, d = nodo.dataset.d;
    if (!u || !d) return;
    var enlace = document.createElement('a');
    enlace.href = 'mailto:' + u + '@' + d;
    enlace.textContent = u + '@' + d;
    nodo.replaceWith(enlace);
  });

  /* --- Año del pie --- */
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
})();
