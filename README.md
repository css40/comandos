# Pixel Terminal v2.0

Guía interactiva de comandos para Fedora, Ubuntu y Windows (PowerShell y CMD).
Sirve la carpeta desde `localhost` (o desde un sitio HTTPS) para habilitar la PWA y el Service Worker:

    python3 -m http.server 8000

Después abre `http://localhost:8000`. Una vez cargada, Pixel Terminal puede instalarse desde el navegador y usar su shell y datos sin conexión.

## Estructura
- `index.html`   Estructura de la página y del modal.
- `styles.css`   Diseño. Tema claro/oscuro con variables CSS (`data-theme`).
- `app.js`       Lógica: filtros, búsqueda, modal, tema, copiado.
- `data/`        Base de datos de comandos:
  - `linux-core.js`  comandos comunes de Linux (se muestran en Fedora y Ubuntu)
  - `fedora.js`, `ubuntu.js`, `powershell.js`, `cmd.js`
- `img/`         Imágenes de Mr. Pixel (recortadas) y favicon.

## Cómo añadir un comando
Agrega un objeto al archivo del sistema correspondiente:

    { c: 'files',                       // packages | files | system | network | extras
      t: 'Título',
      cmd: 'comando <marcador>',        // lo que está entre < > se resalta
      d: 'Descripción corta.',
      s: ['Paso 1', 'Paso 2 con `código`'],
      ex: 'comando de ejemplo',         // una línea por comando
      out: 'salida de ejemplo',
      n: ['Nota', '! Advertencia'],     // "!" al inicio = advertencia
      a: 1 }                            // (solo Windows) requiere administrador
