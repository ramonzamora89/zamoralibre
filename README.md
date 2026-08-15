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
├── CNAME.pendiente         # Dominio propio, todavía sin activar (ver abajo)
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

El número de días de detención se calcula en el navegador, en `assets/js/site.js`:

```js
Math.floor((new Date() - new Date("2022-07-29")) / 86400000)
```

Sube solo cada día. La frase que lo acompaña viene del atributo `data-contador` del párrafo, en cada página:

```html
<p class="contador" data-contador="días de detención arbitraria">
```

Para congelarlo, reemplazar ese párrafo por el texto fijo y quitar el atributo.

## Ver el sitio localmente

```bash
python3 -m http.server 8000
```

Y abrir <http://localhost:8000>. Hace falta un servidor (no basta con abrir el archivo) para que funcionen las rutas absolutas y las tipografías.

## Publicación

Rama `main`, carpeta raíz, servido por GitHub Pages.

**Estado actual:** el sitio está en vivo en
<https://ramonzamora89.github.io/zamoralibre/>, sin dominio propio todavía.

### Activar www.zamoralibre.com

1. En GoDaddy, en el DNS de `zamoralibre.com`, borrar los registros que apuntan
   a Squarespace y dejar:
   - Cuatro registros `A` en `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - Un `CNAME` en `www` → `ramonzamora89.github.io`
2. En este repositorio, volver a nombrar el archivo y publicar:
   ```bash
   git mv CNAME.pendiente CNAME
   git commit -m "Activa el dominio propio"
   git push
   ```
3. En GitHub → Settings → Pages, esperar a que valide el dominio y marcar
   **Enforce HTTPS** (el certificado tarda unos minutos en emitirse).
4. Cuando `https://www.zamoralibre.com` cargue bien, recién ahí cancelar
   Squarespace.

El archivo se dejó en pausa porque, mientras exista un `CNAME`, GitHub Pages
redirige todo el tráfico al dominio propio, que todavía apunta a Squarespace.

## Notas

- El contenido es una copia fiel del sitio de Squarespace: la cronología llega hasta julio de 2024 y no se modificó nada.
- Cuatro enlaces a `state.gov` que ya venían en el sitio original devuelven 404 hoy; se conservaron tal cual.
- Las tipografías (Poppins y Montserrat) están autoalojadas, así que el sitio no hace peticiones a servidores externos.
