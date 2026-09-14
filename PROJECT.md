# Estado del proyecto

Migración de **zamoralibre.com** de Squarespace a GitHub Pages.

| | |
|---|---|
| **Repositorio** | <https://github.com/ramonzamora89/zamoralibre> |
| **Sitio en vivo** | <https://zamoralibre.com> |
| **Dominio** | `zamoralibre.com` (sin *www*) — **activo** |
| **Registrador** | GoDaddy |
| **Última revisión** | 15 de agosto de 2026 |

## La migración está terminada

- Las 4 páginas replicadas: inicio (español), `/english/`, `/media-coverage/`, `/comparte/`.
- Contenido idéntico al original de Squarespace.
- Las 32 imágenes descargadas del CDN de Squarespace, en su formato original.
- Tipografías (Poppins y Montserrat) autoalojadas: el sitio no pide nada a servidores externos.
- Contador de días de detención funcionando, en vivo desde el 29 de julio de 2022.
- Redirección de la URL vieja `/home` a la portada, y página 404 propia.
- Publicado en GitHub Pages desde la rama `main`, carpeta raíz.
- **Dominio propio apuntando a GitHub**, con HTTPS y certificado válido.

Ya nada depende de Squarespace.

### Cómo quedó el dominio

El dominio canónico es **`zamoralibre.com`**, sin *www*. GitHub Pages redirige
`www.zamoralibre.com` hacia él con un 301, así que las dos direcciones llegan al
mismo lugar.

Registros en GoDaddy (**Mis productos** → `zamoralibre.com` → **DNS**):

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `ramonzamora89.github.io` |

Los `NS`, el `SOA`, el `CNAME _domainconnect` y el `TXT _dmarc` son de GoDaddy y
del correo: no se tocan.

> GoDaddy no permite `CNAME` en la raíz (`@`). Por eso el dominio sin *www* se
> resuelve con registros `A` y no con un `CNAME`. La contra es que esas cuatro
> IPs están escritas a mano: si GitHub las cambia algún día, hay que editarlas.

El archivo `CNAME` del repositorio contiene `zamoralibre.com` y lo creó GitHub
solo, al guardar el dominio en **Settings** → **Pages**. No hay que editarlo.

---

## Pendientes de infraestructura

### 1. Faltan tres registros A

Al 15 de agosto de 2026, el servidor autoritativo de GoDaddy solo devuelve
`185.199.108.153`. Faltan los otros tres:

```
185.199.109.153
185.199.110.153
185.199.111.153
```

El sitio funciona con uno solo, pero sin redundancia: si ese servidor de GitHub
se cae o entra en mantenimiento, el dominio deja de responder. Si GoDaddy se
resiste a guardar varios registros con el mismo nombre `@`, agregarlos de a uno.

Para comprobar:

```bash
dig +short @ns29.domaincontrol.com zamoralibre.com A   # deben salir las cuatro
```

### 2. Certificado de `www` en emisión

`https://zamoralibre.com` ya funciona con certificado válido. `www` responde por
HTTP (301 hacia el apex) pero todavía no por HTTPS: GitHub emite un certificado
que cubre las dos direcciones y la parte de `www` tarda un poco más. Es cuestión
de esperar, no hay nada que arreglar.

```bash
curl -sI https://www.zamoralibre.com | head -1   # cuando dé 301, ya está
```

### 3. Marcar Enforce HTTPS

En GitHub → repositorio `zamoralibre` → **Settings** → **Pages**, marcar
**Enforce HTTPS** una vez que el certificado cubra las dos direcciones.

### 4. Cancelar Squarespace

Recién después de comprobar, en el navegador, que cargan las fotos, que el
contador muestra el número de días y que funcionan los tres enlaces del menú.

---

## Actualización de contenido (14 de septiembre de 2026)

Hecho, en español e inglés, sin commit todavía:

- **Contador**: la premisa cambió. Salió de prisión el **12 de febrero de 2026** tras
  1,295 días y sigue bajo arresto domiciliario, con arraigo y tres procesos abiertos.
  La portada muestra «1,295 días en prisión» (fijo) y «días de persecución judicial»
  (en vivo desde el 29/7/2022). Ver README.
- **Lo más reciente**: 15 entradas nuevas, de agosto de 2024 al 13 de agosto de 2026, con fuente.
  Se corrigió la fecha de la primera anulación (10 de octubre de 2023).
- **Premios**: Cabot y CPJ corregidos a 1995; Rey de España atribuido a elPeriódico;
  agregados Antoni Traveria 2025, Albie 2025 y Hermann Kesten 2026 (entrega el 24/11/2026).
  El ONA Founder Award 2026 es de José Carlos Zamora: no va.
- **Páginas nuevas**: `/trayectoria/` y `/english/trajectory/`, con la línea del tiempo de
  investigaciones e impactos y la lista completa de premios.
- **Mensajes sugeridos** (portada y `/comparte/`) reescritos; ya no dicen «730 días».
- **Cobertura**: bloque 2024–2026 al inicio de `/media-coverage/`.
- **Enlaces de state.gov** apuntan al archivo oficial `2021-2025.state.gov`. El 14/9
  respondían «Technical Difficulties» a herramientas automáticas: comprobar en navegador
  y, si fallan, usar Internet Archive.

Pendiente:

- [ ] Revisar las novedades del caso justo antes de publicar (la última verificada es del
  13/8/2026: casación de Samari Gómez en la Cámara Penal y permiso de viaje negado).
- [ ] Los gráficos de `/comparte/` dicen «Dos años. El tiempo ya viene.»: rediseñar o retirar.
- [ ] Confirmar el año de fundación de Nuestro Diario (el sitio dice 1998; el dossier LASA, 1997).
- [ ] Antes del commit: `git config core.fileMode false` (el disco exFAT marca 56 archivos
  por cambio de permisos).
- [ ] Cuando se entregue el Premio Hermann Kesten (24/11/2026), cambiar «Se entregará» por la fecha.

## Plan de actualización del sitio (agosto de 2026, ya ejecutado en su mayoría)

El sitio quedó como una copia fiel de Squarespace, con el contenido congelado en
**julio de 2024**. Migrarlo era el objetivo; ponerlo al día es otro trabajo, y
es el que sigue.

Las tareas están en orden de urgencia. La primera no es opcional.

### Prioridad 1 — Verificar el estado del caso y decidir qué hace el contador

**Este es el riesgo real del sitio.**

La portada muestra un número que se calcula en el navegador, en
`assets/js/site.js`:

```js
Math.floor((new Date() - new Date("2022-07-29")) / 86400000)
```

Son días corridos desde la detención, sin ninguna condición. Al 15 de agosto de
2026 muestra **1.478 días de detención arbitraria**. Sube solo, todos los días,
sin importar lo que haya pasado con el caso.

La cronología, mientras tanto, se detiene el **18 de julio de 2024**. Hay más de
dos años sin registrar. Si en ese periodo hubo cambios en la situación de
Zamora, el número de la portada podría estar afirmando algo que ya no es cierto
—y es lo primero que ve cualquier visitante.

Antes de tocar una línea de HTML:

1. Verificar en fuentes primarias cuál es la situación hoy (CPJ, RSF, SIP,
   Grupo de Trabajo de la ONU sobre Detención Arbitraria, elPeriódico, prensa
   internacional).
2. Según lo que resulte, decidir qué hace el contador:
   - **Sigue igual**, si la detención continúa sin interrupción.
   - **Se congela** en una fecha, si terminó. Se reemplaza el párrafo por texto
     fijo y se quita el atributo `data-contador`.
   - **Cambia de premisa**, si la situación es intermedia (arresto domiciliario,
     medidas sustitutivas, proceso abierto sin prisión). Aquí el número deja de
     ser un dato limpio y conviene reformular la frase, no solo el número.

El contador aparece en `index.html` y en `english/index.html`. **Los dos textos
tienen que decir lo mismo**, o el sitio se contradice a sí mismo entre idiomas:

```html
<p class="contador" data-contador="días de detención arbitraria">
<p class="contador" data-contador="Days of Arbitrary Detention">
```

### Prioridad 2 — Extender la cronología

La lista «Lo más reciente» termina en `index.html:138` (18 de julio de 2024).
Cada entrada es un `<li>` con esta forma:

```html
<li><p><strong>18 de julio de 2024.</strong>&nbsp; Texto de la entrada.
<a href="URL" target="_blank" rel="noopener">Fuente</a>.</p></li>
```

Las entradas van **de más nueva a más vieja**: lo nuevo se agrega arriba.

Criterios para mantener el tono del sitio:
- Una fuente citada por entrada, como mínimo. Preferir organismos y prensa
  reconocida, no redes sociales.
- Hechos verificables con fecha, no interpretaciones.
- Frases cortas, como las que ya están. No cambiar la voz del sitio.

**Hay que hacerlo en los dos idiomas**: `index.html` y `english/index.html`.

### Prioridad 3 — Arreglar los cuatro enlaces rotos

Cuatro enlaces a `state.gov` devuelven 404. Ya venían rotos del sitio de
Squarespace y se conservaron tal cual:

```
state.gov/designation-of-attorney-general-maria-consuelo-porras-argueta-de-porres-...
state.gov/persecution-of-journalists-in-guatemala/
state.gov/reports/section-353-corrupt-and-undemocratic-actors-report-2022
state.gov/united-states-announces-actions-against-seven-central-american-officials-...
```

Dos caminos: buscar la URL vigente en state.gov, o enlazar la copia guardada en
Internet Archive (`https://web.archive.org/web/*/URL-original`). El Archive es
más estable para documentos oficiales que cambian de administración.

### Prioridad 4 — Revisar la cobertura de prensa

`/media-coverage/` también quedó en 2024. Menos urgente que la cronología, pero
es la sección que sostiene la credibilidad del caso ante prensa internacional.

### Prioridad 5 — Revisar los materiales de `/comparte/`

Los gráficos descargables y los mensajes sugeridos pueden tener fechas, cifras o
consignas desactualizadas. Revisar que lo que se invita a compartir siga siendo
cierto.

---

## Ritmo sugerido

- **Ahora**: prioridades 1 y 2. Son las que pueden hacer que el sitio diga algo
  falso.
- **Después, sin apuro**: prioridades 3, 4 y 5.
- **De ahí en adelante**: revisar cuando haya novedades en el caso. No hace
  falta un calendario fijo; hace falta que el contador y la cronología nunca se
  contradigan.

## Cómo publicar un cambio

```bash
cd ~/Documents/JRZ
python3 -m http.server 8000     # revisar en http://localhost:8000
git add -A
git commit -m "Actualiza la cronología hasta agosto de 2026"
git push
```

GitHub Pages republica solo, en un par de minutos.

Para el detalle de dónde vive cada cosa, ver [README.md](README.md).
