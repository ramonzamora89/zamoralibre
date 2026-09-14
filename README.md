# zamoralibre.com

Sitio de la campaña por la libertad de **José Rubén Zamora**, fundador de *elPeriódico* de Guatemala.

Es una réplica estática del sitio que antes vivía en Squarespace: mismas secciones, mismo contenido y misma apariencia, pero en HTML, CSS y un JavaScript pequeño, sin dependencias ni proceso de compilación. Se publica con GitHub Pages.

## Estructura

```
.
├── index.html              # Inicio (español)
├── english/index.html      # Inicio (inglés)
├── media-coverage/         # Cobertura de prensa
├── comparte/               # Gráficos descargables y mensajes sugeridos
├── home/                   # Redirección de la URL vieja /home a /
├── 404.html
├── assets/
│   ├── css/style.css       # Toda la hoja de estilos
│   ├── css/fonts.css       # @font-face de las tipografías autoalojadas
│   ├── js/site.js          # Contador de días, menú y carrusel
│   ├── fonts/              # Poppins y Montserrat (woff2)
│   └── img/                # Fotografías, logotipos y gráficos de campaña
├── CNAME                   # Dominio propio (lo gestiona GitHub, no editar)
└── .nojekyll               # GitHub Pages sirve los archivos tal cual
```

## Cómo editar

Todo el texto está directamente en los archivos `.html`. Se abren con cualquier editor y se cambia lo que haga falta; no hay plantillas ni base de datos.

- **Texto, títulos y enlaces**: editar el `.html` de la página correspondiente.
- **Colores y tipografías**: las variables están al inicio de `assets/css/style.css`, en el bloque `:root`.
- **Imágenes**: reemplazar el archivo en `assets/img/` conservando el nombre, o cambiar el `src` en el HTML. Si se cambia la imagen, actualizar también `width`, `height` y el texto `alt`.
- **Cabecera y pie**: se repiten en cada archivo. Si se cambia un enlace del menú, hay que cambiarlo en las cuatro páginas.

Después de editar, hacer `git commit` y `git push`: GitHub Pages vuelve a publicar solo, en un par de minutos.

## Contador de días

Desde septiembre de 2026 la portada muestra dos cifras (en `index.html` y `english/index.html`):

- **1,295 días en prisión**: cifra fija, escrita en el HTML (del 29 de julio de 2022 al 12 de febrero de 2026).
- **Días de persecución judicial**: se calcula en el navegador, en `assets/js/site.js`, desde la fecha del atributo `data-desde`:

```html
<p class="contador" data-contador data-desde="2022-07-29">
  y <span class="dias-numero">&nbsp;</span> días de persecución judicial
</p>
```

El script solo rellena el `<span class="dias-numero">`; el texto se edita directamente en el HTML. Para congelarlo, escribir el número dentro del `span` y quitar `data-contador`.

## Cronología del caso (portada)

La sección `id="lo-mas-reciente"` (español) y `id="most-recent"` (inglés) es una línea del tiempo horizontal, del 29 de julio de 2022 en adelante, ordenada **del más antiguo al más reciente**. Al cargar se abre en el extremo más reciente; se recorre con las flechas, el teclado (← → Inicio Fin) o los botones de año. La lógica está en `iniciarCronologia()` de `assets/js/site.js`.

Para agregar un hecho, copiar un `<li>` al final de `<ol class="cronologia__pista">`, en los dos idiomas:

```html
<li class="cronologia__item" data-anio="2026">
  <div class="cronologia__tarjeta">
    <p class="cronologia__fecha"><time datetime="2026-08-13">13 de agosto de 2026</time></p>
    <p class="cronologia__texto">Texto breve y verificable.</p>
    <p class="cronologia__fuentes">Fuente: <a href="URL" target="_blank" rel="noopener">Medio</a></p>
  </div>
</li>
```

- `cronologia__item--hito` destaca los momentos clave (punto rojo grande).
- Si el hecho es el primero de un año nuevo, añadir `cronologia__item--anio`, el `<span class="cronologia__anio" aria-hidden="true">2027</span>` dentro del `<li>` y un botón `data-cronologia-anio="2027"` en `.cronologia__anios`.
- Actualizar el rango del encabezado (`cronologia__rango`).

## Trayectoria

`trayectoria/index.html` (español) y `english/trajectory/index.html` (inglés) contienen la línea del tiempo de investigaciones y la lista completa de premios. Cada entrada es un `<li class="linea__item">` con fecha, titular, resumen, un párrafo `linea__impacto` («Después:») y sus fuentes. Criterio: fechas confirmadas en el archivo de elPeriódico y desenlaces con fuente externa; la secuencia se narra sin atribuir causalidad que ninguna fuente respalde. Los cambios se hacen en los dos idiomas.

## Ver el sitio localmente

```bash
python3 -m http.server 8000
```

Y abrir <http://localhost:8000>. Hace falta un servidor (no basta con abrir el archivo) para que funcionen las rutas absolutas y las tipografías.

## Publicación

Rama `main`, carpeta raíz, servido por GitHub Pages.

**Estado actual:** el sitio está en vivo en <https://zamoralibre.com>, con
dominio propio y HTTPS. `www.zamoralibre.com` redirige al mismo lugar.

El archivo `CNAME` lo creó GitHub al guardar el dominio en **Settings** →
**Pages**; no hay que editarlo a mano. Los registros DNS, los pendientes de
infraestructura y el plan de actualización del contenido están en
**[PROJECT.md](PROJECT.md)**.

## Notas

- El contenido es una copia fiel del sitio de Squarespace: la cronología llega hasta julio de 2024 y no se modificó nada.
- Cuatro enlaces a `state.gov` que ya venían en el sitio original devuelven 404 hoy; se conservaron tal cual.
- Las tipografías (Poppins y Montserrat) están autoalojadas, así que el sitio no hace peticiones a servidores externos.
