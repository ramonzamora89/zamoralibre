# Estado del proyecto

Migración de **zamoralibre.com** de Squarespace a GitHub Pages.

| | |
|---|---|
| **Repositorio** | <https://github.com/ramonzamora89/zamoralibre> |
| **Sitio en vivo (provisional)** | <https://ramonzamora89.github.io/zamoralibre/> |
| **Dominio final** | `www.zamoralibre.com` — **pendiente** |
| **Registrador** | GoDaddy (dominio ya transferido a la cuenta de Moncho) |

## Lo que ya está hecho

- Las 4 páginas replicadas: inicio (español), `/english/`, `/media-coverage/`, `/comparte/`.
- Contenido idéntico al original de Squarespace, sin cambios.
- Las 32 imágenes descargadas del CDN de Squarespace, en su formato original.
- Tipografías (Poppins y Montserrat) autoalojadas: el sitio no pide nada a servidores externos.
- Contador de días de detención funcionando, en vivo desde el 29 de julio de 2022.
- Publicado en GitHub Pages desde la rama `main`, carpeta raíz.
- Redirección de la URL vieja `/home` a la portada, y página 404 propia.

**Ya nada depende de Squarespace.** Solo falta apuntar el dominio.

---

## Único paso pendiente: apuntar el dominio en GoDaddy

### 1. Registros DNS

En GoDaddy → **Mis productos** → `zamoralibre.com` → **DNS** → **Administrar zonas de DNS**.

**Primero borrar** los registros que hoy apuntan a Squarespace: los cuatro `A` en `@` con valores `198.185.159.144`, `198.185.159.145`, `198.49.23.144`, `198.49.23.145`, y el `CNAME` de `www` que apunta a `ext-sq.squarespace.com`.

**Después agregar estos:**

| Tipo | Nombre | Valor | TTL |
|---|---|---|---|
| CNAME | `www` | `ramonzamora89.github.io` | 1 hora |
| A | `@` | `185.199.108.153` | 1 hora |
| A | `@` | `185.199.109.153` | 1 hora |
| A | `@` | `185.199.110.153` | 1 hora |
| A | `@` | `185.199.111.153` | 1 hora |

El **CNAME de `www`** es el que hace que funcione el sitio.
Los cuatro **A en `@`** son para que `zamoralibre.com` sin *www* también lleve al sitio.

Opcionalmente, para IPv6, cuatro registros `AAAA` en `@`:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

> **Nota:** GoDaddy no permite `CNAME` en la raíz (`@`). Por eso el dominio sin *www*
> se resuelve con registros `A` y no con un `CNAME`.

### 2. Activar el dominio en el repositorio

En el repositorio hay un archivo `CNAME.pendiente` con el dominio adentro. Está
así a propósito: mientras se llame `CNAME`, GitHub Pages redirige **todo** el
tráfico a `www.zamoralibre.com`, y hasta que el DNS no apunte a GitHub eso deja
el sitio inaccesible.

Cuando los registros del paso 1 estén guardados:

```bash
cd ~/Documents/JRZ
git mv CNAME.pendiente CNAME
git commit -m "Activa el dominio propio"
git push
```

### 3. Forzar HTTPS

En GitHub → repositorio `zamoralibre` → **Settings** → **Pages**:
esperar a que aparezca el dominio verificado y marcar **Enforce HTTPS**.
El certificado tarda entre unos minutos y una hora en emitirse.

### 4. Comprobar antes de cancelar Squarespace

```bash
dig +short www.zamoralibre.com      # debe responder ramonzamora89.github.io
curl -sI https://www.zamoralibre.com | head -1   # debe dar 200
```

Y abrir el sitio en el navegador: revisar que carguen las fotos, que el contador
muestre el número de días y que funcionen los tres enlaces del menú.

**Recién cuando eso esté bien, cancelar la suscripción de Squarespace.**

El DNS puede tardar desde unos minutos hasta 48 horas en propagarse.

---

## Pendientes opcionales

- La cronología («Lo más reciente») llega hasta julio de 2024, igual que el
  original. Se puede actualizar editando `index.html` y `english/index.html`.
- Cuatro enlaces a `state.gov` devuelven 404. Ya estaban rotos en el sitio de
  Squarespace y se conservaron tal cual; se pueden reemplazar por las URLs
  vigentes o por copias en Internet Archive.

Para editar el sitio, ver [README.md](README.md).
