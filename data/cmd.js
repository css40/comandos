/* =====================================================================
   WINDOWS · CMD (Símbolo del sistema)
   Comandos clásicos de cmd.exe. Los de PowerShell están en powershell.js.
   a: 1  →  requiere abrir CMD como Administrador.
   Nota: en cadenas JS las barras invertidas de rutas van dobles (\\).
   ===================================================================== */
window.PT = window.PT || {};

PT.cmd = [

/* ───────────────────────── PAQUETES ───────────────────────── */
{ c: 'packages', t: 'Buscar un programa (winget)', cmd: 'winget search <nombre>',
  d: 'Busca aplicaciones en el repositorio oficial de winget directamente desde CMD.',
  s: ['Abre CMD (Inicio → escribe "cmd").', 'Ejecuta `winget search vlc`.', 'Anota el `Id` del programa para instalarlo.'],
  ex: 'winget search vlc',
  out: `Nombre           Id               Versión  Origen
VLC media player VideoLAN.VLC     3.0.21   winget`,
  n: ['`winget` funciona igual en CMD y en PowerShell.'] },

{ c: 'packages', t: 'Instalar un programa (winget)', cmd: 'winget install <Id>',
  d: 'Descarga e instala un programa de forma automática.',
  s: ['Busca el Id con `winget search`.', 'Ejecuta `winget install VideoLAN.VLC`.', 'Acepta los avisos (UAC) si aparecen.'],
  ex: 'winget install --id VideoLAN.VLC -e',
  out: `Se encontró VLC media player [VideoLAN.VLC] Versión 3.0.21
Instalado correctamente`,
  n: ['Con `-e` la coincidencia es exacta.'] },

{ c: 'packages', t: 'Actualizar todos los programas', cmd: 'winget upgrade --all',
  d: 'Actualiza todas las aplicaciones con versiones nuevas disponibles.',
  s: ['Mira lo pendiente con `winget upgrade`.', 'Ejecuta `winget upgrade --all`.', 'Acepta los avisos de UAC.'],
  ex: 'winget upgrade --all',
  n: ['Puedes programarlo en el Programador de tareas para que sea automático.'] },

{ c: 'packages', t: 'Desinstalar un programa', cmd: 'winget uninstall <Id>',
  d: 'Elimina un programa instalado.',
  s: ['Obtén el Id con `winget list`.', 'Ejecuta `winget uninstall <Id>`.', 'Sigue los avisos.'],
  ex: 'winget uninstall --id VideoLAN.VLC',
  n: ['Alternativa gráfica: `appwiz.cpl` (Programas y características).'] },

{ c: 'packages', t: 'Abrir Programas y características', cmd: 'appwiz.cpl',
  d: 'Abre el panel clásico para desinstalar programas.',
  s: ['Escribe `appwiz.cpl` en CMD o en Win + R.', 'Selecciona el programa.', 'Pulsa "Desinstalar".'],
  ex: 'appwiz.cpl',
  n: ['También existe `ms-settings:appsfeatures` para la versión moderna: `start ms-settings:appsfeatures`.'] },

{ c: 'packages', t: 'Activar el Subsistema de Linux (WSL)', cmd: 'wsl --install', a: 1,
  d: 'Instala WSL con Ubuntu para ejecutar Linux dentro de Windows.',
  s: ['Abre CMD como administrador (clic derecho → Ejecutar como administrador).', 'Ejecuta `wsl --install`.', 'Reinicia y crea tu usuario de Linux.'],
  ex: 'wsl --install',
  n: ['`wsl --list --verbose` muestra las distros instaladas y su estado.'] },

/* ───────────────────────── ARCHIVOS ───────────────────────── */
{ c: 'files', t: 'Listar archivos y carpetas', cmd: 'dir',
  d: 'Muestra el contenido de la carpeta actual.',
  s: ['Ejecuta `dir`.', 'Añade `/a` para incluir ocultos y `/s` para recorrer subcarpetas.', '`dir /b` muestra solo los nombres.'],
  ex: 'dir /a',
  out: ` Directorio de C:\\Users\\Pixel\\Documentos

28/10/2026  10:12    <DIR>          proyectos
27/10/2026  18:40            12.288 informe.pdf
               1 archivos         12.288 bytes`,
  n: ['`dir /o:-d` ordena por fecha, de más nuevo a más antiguo.'] },

{ c: 'files', t: 'Cambiar de carpeta', cmd: 'cd <ruta>',
  d: 'Cambia el directorio actual.',
  s: ['Ejecuta `cd C:\\Users\\Pixel\\Documentos`.', 'Si cambias de unidad, usa `cd /d D:\\Datos`.', 'Sube un nivel con `cd ..`.'],
  ex: 'cd /d D:\\Proyectos',
  out: '',
  n: ['Sin `/d`, `cd` no cambia de unidad (para eso escribe `D:`).', 'Usa comillas si hay espacios: `cd "Mis Documentos"`.'] },

{ c: 'files', t: 'Ver la carpeta actual', cmd: 'cd',
  d: 'Sin argumentos, `cd` imprime la ruta actual.',
  s: ['Escribe `cd` y presiona Enter.', 'Lee la ruta.', 'Variable equivalente: `echo %CD%`.'],
  ex: 'cd',
  out: 'C:\\Users\\Pixel\\Documentos',
  n: ['El prompt de CMD también la muestra.'] },

{ c: 'files', t: 'Crear una carpeta', cmd: 'mkdir <nombre>',
  d: 'Crea una carpeta nueva (alias: `md`).',
  s: ['Ejecuta `mkdir proyectos`.', 'Para varios niveles: `mkdir a\\b\\c`.', 'Verifica con `dir`.'],
  ex: 'mkdir proyectos\\blog\\imagenes',
  n: ['En CMD las extensiones de comando crean la ruta intermedia automáticamente.'] },

{ c: 'files', t: 'Copiar archivos', cmd: 'copy <origen> <destino>',
  d: 'Copia uno o varios archivos. Para carpetas completas usa `xcopy` o `robocopy`.',
  s: ['Ejecuta `copy informe.pdf D:\\Respaldo\\`.', 'Con comodines: `copy *.txt D:\\Textos\\`.', 'Verifica en el destino con `dir`.'],
  ex: 'copy informe.pdf D:\\Respaldo\\',
  out: '        1 archivo(s) copiado(s).',
  n: ['Pregunta antes de sobrescribir salvo que añadas `/y`.'] },

{ c: 'files', t: 'Copiar carpetas y respaldos (robocopy)', cmd: 'robocopy <origen> <destino> /E',
  d: 'Copiador robusto: copia carpetas completas, reanuda y espeja directorios.',
  s: ['Ejecuta `robocopy C:\\Proyectos D:\\Respaldo /E`.', '`/E` incluye subcarpetas (también vacías).', 'Para espejar (borra en destino lo que ya no existe): `/MIR`.'],
  ex: 'robocopy C:\\Proyectos D:\\Respaldo /E /R:1 /W:1',
  out: `               Total  Copiado  Omitido
Directorios:      12       12        0
Archivos:        148      148        0`,
  n: ['! `/MIR` puede borrar archivos en el destino: revisa bien el sentido origen/destino.', 'Los códigos de salida 0 a 7 indican éxito.'] },

{ c: 'files', t: 'Mover o renombrar', cmd: 'move <origen> <destino>',
  d: 'Mueve archivos o carpetas; para renombrar usa `ren`.',
  s: ['Mover: `move informe.pdf D:\\Docs\\`.', 'Renombrar: `ren borrador.txt final.txt`.', 'Verifica con `dir`.'],
  ex: 'ren borrador.txt informe-final.txt',
  n: ['`ren` no puede mover entre carpetas, solo cambiar el nombre.'] },

{ c: 'files', t: 'Borrar archivos', cmd: 'del <archivo>',
  d: 'Elimina uno o varios archivos (no pasa por la Papelera).',
  s: ['Ejecuta `del archivo.txt`.', 'Con comodín: `del *.tmp`.', 'Usa `/p` para que pida confirmación de cada uno.'],
  ex: 'del /p *.tmp',
  n: ['! No es recuperable. Para carpetas usa `rmdir /s /q <carpeta>`.'] },

{ c: 'files', t: 'Eliminar una carpeta', cmd: 'rmdir /s /q <carpeta>',
  d: 'Borra una carpeta con todo su contenido (alias: `rd`).',
  s: ['Ejecuta `rmdir /s /q carpeta`.', '`/s` incluye subcarpetas y `/q` evita preguntar.', 'Sin `/q` pide confirmación.'],
  ex: 'rmdir /s carpeta-vieja',
  out: 'carpeta-vieja, ¿Está seguro (S/N)? s',
  n: ['! Es permanente. Revisa la ruta antes de ejecutar.'] },

{ c: 'files', t: 'Ver el contenido de un archivo', cmd: 'type <archivo>',
  d: 'Imprime un archivo de texto en pantalla; con `more` lo paginas.',
  s: ['Ejecuta `type notas.txt`.', 'Para archivos largos: `type log.txt | more`.', 'En `more`, Espacio avanza y `q` sale.'],
  ex: 'type notas.txt',
  out: 'Hola Pixel',
  n: ['Para escribir texto en un archivo: `echo Hola > notas.txt` (reemplaza) o `>>` (agrega).'] },

{ c: 'files', t: 'Buscar texto en archivos', cmd: 'findstr /s /i "<texto>" <archivos>',
  d: 'Equivalente a `grep`: busca texto dentro de archivos.',
  s: ['Ejecuta `findstr /s /i "error" *.log`.', '`/s` recorre subcarpetas e `/i` ignora mayúsculas.', 'Añade `/n` para mostrar el número de línea.'],
  ex: 'findstr /s /i /n "error" *.log',
  out: 'app.log:42:2026-10-28 09:12 error al conectar',
  n: ['También sirve en tuberías: `tasklist | findstr chrome`.'] },

{ c: 'files', t: 'Árbol de carpetas', cmd: 'tree /f',
  d: 'Dibuja la estructura de carpetas (y archivos con `/f`).',
  s: ['Ejecuta `tree` o `tree /f`.', 'Redirige a un archivo: `tree /f > estructura.txt`.', 'Útil para documentar proyectos.'],
  ex: 'tree /f proyectos',
  out: `C:\\USERS\\PIXEL\\PROYECTOS
└───web
        app.js
        index.html`,
  n: ['`tree /a` usa caracteres ASCII simples.'] },

{ c: 'files', t: 'Atributos de archivos', cmd: 'attrib <archivo>',
  d: 'Muestra o cambia atributos: oculto (H), solo lectura (R), sistema (S).',
  s: ['Ver: `attrib archivo.txt`.', 'Ocultar: `attrib +h archivo.txt`.', 'Mostrar de nuevo: `attrib -h archivo.txt`.'],
  ex: 'attrib +h secreto.txt',
  n: ['Con `dir /a:h` listas archivos ocultos.'] },

{ c: 'files', t: 'Localizar un ejecutable', cmd: 'where <programa>',
  d: 'Muestra dónde está un programa que se puede ejecutar desde CMD.',
  s: ['Ejecuta `where python`.', 'Lee las rutas encontradas (la primera es la que se usa).', 'Si no hay resultado, no está en el PATH.'],
  ex: 'where python',
  out: 'C:\\Users\\Pixel\\AppData\\Local\\Programs\\Python\\Python313\\python.exe',
  n: ['Equivale a `which` en Linux.'] },

{ c: 'files', t: 'Comprimir con tar (Windows 10/11)', cmd: 'tar -a -c -f <archivo.zip> <carpeta>',
  d: 'Windows incluye `tar`: crea y extrae .zip y .tar.gz desde CMD.',
  s: ['Comprimir: `tar -a -c -f respaldo.zip proyectos`.', 'Extraer: `tar -xf respaldo.zip -C D:\\salida`.', 'Ver contenido: `tar -tf respaldo.zip`.'],
  ex: 'tar -a -c -f respaldo.zip proyectos',
  n: ['`-a` elige el formato según la extensión.'] },

/* ───────────────────────── SISTEMA ───────────────────────── */
{ c: 'system', t: 'Listar procesos', cmd: 'tasklist',
  d: 'Muestra todos los procesos activos con su PID y memoria.',
  s: ['Ejecuta `tasklist`.', 'Filtra: `tasklist | findstr chrome`.', 'Anota el PID o el nombre para cerrarlo con `taskkill`.'],
  ex: 'tasklist | findstr chrome',
  out: `chrome.exe     4821 Console   1    312.480 KB
chrome.exe     5120 Console   1    120.064 KB`,
  n: ['`tasklist /svc` muestra qué servicios corre cada proceso.'] },

{ c: 'system', t: 'Cerrar un programa', cmd: 'taskkill /im <programa.exe> /f',
  d: 'Fuerza el cierre de un programa que no responde.',
  s: ['Identifica el nombre con `tasklist`.', 'Ejecuta `taskkill /im notepad.exe /f`.', 'Para cerrar por PID: `taskkill /pid 4821 /f`.'],
  ex: 'taskkill /im notepad.exe /f',
  out: 'CORRECTO: se terminó el proceso "notepad.exe" con PID 3204.',
  n: ['! `/f` fuerza el cierre sin guardar. `/t` cierra también los procesos hijos.'] },

{ c: 'system', t: 'Reparar archivos del sistema (SFC)', cmd: 'sfc /scannow', a: 1,
  d: 'Escanea y repara archivos corruptos de Windows.',
  s: ['Abre CMD como administrador.', 'Ejecuta `sfc /scannow`.', 'Espera (puede tardar 10–20 min) sin cerrar la ventana.', 'Reinicia si hizo reparaciones.'],
  ex: 'sfc /scannow',
  out: `Iniciando examen del sistema. Este proceso tardará algún tiempo.
La Protección de recursos de Windows encontró archivos dañados y los reparó correctamente.`,
  n: ['Si no puede reparar, ejecuta antes `DISM /Online /Cleanup-Image /RestoreHealth` y repite SFC.'] },

{ c: 'system', t: 'Reparar la imagen de Windows (DISM)', cmd: 'DISM /Online /Cleanup-Image /RestoreHealth', a: 1,
  d: 'Repara el almacén de componentes de Windows usando Windows Update.',
  s: ['Abre CMD como administrador y conéctate a internet.', 'Ejecuta el comando.', 'Cuando termine ejecuta `sfc /scannow`.'],
  ex: 'DISM /Online /Cleanup-Image /RestoreHealth',
  out: `[==========================100.0%==========================]
La operación de restauración se completó correctamente.`,
  n: ['Primero puedes comprobar con `DISM /Online /Cleanup-Image /CheckHealth`.'] },

{ c: 'system', t: 'Revisar el disco', cmd: 'chkdsk C: /f', a: 1,
  d: 'Analiza y corrige errores del sistema de archivos de una unidad.',
  s: ['Abre CMD como administrador.', 'Ejecuta `chkdsk C: /f`.', 'Si la unidad está en uso, escribe `S` para programarlo al reiniciar.', 'Reinicia y espera.'],
  ex: 'chkdsk D: /f',
  n: ['`/r` además busca sectores defectuosos (mucho más lento).', 'Sin parámetros solo analiza, no repara.'] },

{ c: 'system', t: 'Información del equipo', cmd: 'systeminfo',
  d: 'Muestra versión de Windows, hardware, RAM, BIOS y parches.',
  s: ['Ejecuta `systeminfo`.', 'Para filtrar: `systeminfo | findstr /i "Nombre del SO"`.', 'Guarda: `systeminfo > info.txt`.'],
  ex: 'systeminfo | findstr /b /c:"Nombre del sistema operativo"',
  out: 'Nombre del sistema operativo:    Microsoft Windows 11 Pro',
  n: ['Los textos dependen del idioma de Windows.', '`ver` imprime solo la versión.'] },

{ c: 'system', t: 'Apagar o reiniciar', cmd: 'shutdown /r /t 0',
  d: 'Reinicia (`/r`), apaga (`/s`) o cierra sesión (`/l`), con retardo opcional.',
  s: ['Reiniciar ahora: `shutdown /r /t 0`.', 'Apagar en 1 hora: `shutdown /s /t 3600`.', 'Cancelar: `shutdown /a`.'],
  ex: 'shutdown /s /t 600',
  out: '',
  n: ['`/t` indica los segundos de espera.', 'Con `/hybrid` apaga rápido y prepara el inicio rápido.'] },

{ c: 'system', t: 'Administrar servicios', cmd: 'sc query <servicio>',
  d: 'Consulta el estado de un servicio; `net start` / `net stop` lo inician o detienen.',
  s: ['Estado: `sc query Spooler`.', 'Detener (admin): `net stop Spooler`.', 'Iniciar: `net start Spooler`.'],
  ex: 'sc query Spooler',
  out: `SERVICE_NAME: Spooler
        STATE              : 4  RUNNING`,
  n: ['`sc config <servicio> start= disabled` desactiva uno (¡con espacio tras `=`!).'] },

{ c: 'system', t: 'Ver y crear variables de entorno', cmd: 'set',
  d: 'Muestra las variables de entorno; `setx` crea una permanente.',
  s: ['Ver todas: `set`.', 'Ver una: `echo %USERPROFILE%`.', 'Crear permanente: `setx MI_VAR "valor"` (aplica en nuevas ventanas).'],
  ex: 'echo %USERPROFILE%',
  out: 'C:\\Users\\Pixel',
  n: ['`set MI_VAR=valor` solo vale para la ventana actual.'] },

{ c: 'system', t: 'Informe de batería', cmd: 'powercfg /batteryreport',
  d: 'Genera un informe HTML con el estado y la capacidad de la batería del portátil.',
  s: ['Ejecuta `powercfg /batteryreport`.', 'Anota la ruta del informe generado.', 'Ábrelo en el navegador.'],
  ex: 'powercfg /batteryreport',
  out: 'El informe de duración de la batería se guardó en C:\\Users\\Pixel\\battery-report.html.',
  n: ['Compara "Capacidad de diseño" con "Capacidad de carga completa" para ver el desgaste.'] },

{ c: 'system', t: 'Drivers instalados', cmd: 'driverquery',
  d: 'Lista los controladores (drivers) cargados en el sistema.',
  s: ['Ejecuta `driverquery`.', 'Para más detalle: `driverquery /v`.', 'Exporta: `driverquery /fo csv > drivers.csv`.'],
  ex: 'driverquery | findstr /i nvidia',
  n: ['Útil para identificar un driver problemático.'] },

{ c: 'system', t: 'Abrir herramientas de Windows', cmd: 'start <herramienta>',
  d: 'Abre utilidades como el Administrador de tareas, Servicios o el Administrador de dispositivos.',
  s: ['Ejecuta `taskmgr` (Administrador de tareas).', 'Otros: `services.msc`, `devmgmt.msc`, `diskmgmt.msc`, `eventvwr`, `msinfo32`.', 'También funcionan en Win + R.'],
  ex: 'start devmgmt.msc',
  n: ['`control` abre el Panel de control clásico.'] },

{ c: 'system', t: 'Particionar discos (diskpart)', cmd: 'diskpart', a: 1,
  d: 'Abre la utilidad avanzada para gestionar discos y particiones.',
  s: ['Abre CMD como administrador y ejecuta `diskpart`.', 'Lista discos: `list disk` y selecciona: `select disk 1`.', 'Con `list partition` ves las particiones; sal con `exit`.'],
  ex: 'diskpart\nlist disk',
  out: `  Núm Disco  Estado   Tamaño  Libre
  Disco 0    En línea  238 GB  1024 KB
  Disco 1    En línea   29 GB     0 B`,
  n: ['! `clean` borra TODO el disco seleccionado. Verifica siempre el número de disco.'] },

/* ───────────────────────── RED ───────────────────────── */
{ c: 'network', t: 'Configuración de red (ipconfig)', cmd: 'ipconfig /all',
  d: 'Muestra IP, máscara, puerta de enlace, DNS y dirección MAC de cada adaptador.',
  s: ['Ejecuta `ipconfig` para el resumen o `ipconfig /all` para todo.', 'Busca tu adaptador activo (Wi-Fi o Ethernet).', 'Revisa `Dirección IPv4` y `Puerta de enlace`.'],
  ex: 'ipconfig',
  out: `Adaptador de LAN inalámbrica Wi-Fi:
   Dirección IPv4. . . . . . . . : 192.168.1.34
   Puerta de enlace . . . . . . . : 192.168.1.1`,
  n: ['La puerta de enlace es la IP de tu router.'] },

{ c: 'network', t: 'Probar conexión (ping)', cmd: 'ping -n 4 <host>',
  d: 'Comprueba si un equipo o sitio responde y mide la latencia.',
  s: ['Ejecuta `ping -n 4 google.com`.', 'Revisa el tiempo y el % de pérdida.', 'Si falla con nombre pero responde la IP (`ping 1.1.1.1`), es un problema de DNS.'],
  ex: 'ping -n 4 1.1.1.1',
  out: `Respuesta desde 1.1.1.1: bytes=32 tiempo=14ms TTL=57
Paquetes: enviados = 4, recibidos = 4, perdidos = 0 (0% perdidos)`,
  n: ['`ping -t` no se detiene hasta `Ctrl + C`.'] },

{ c: 'network', t: 'Ruta hasta un destino (tracert)', cmd: 'tracert <dominio>',
  d: 'Muestra los saltos que da tu conexión hasta llegar a un servidor.',
  s: ['Ejecuta `tracert google.com`.', 'Lee el tiempo de cada salto.', 'El primer salto es tu router; los `*` indican tiempo agotado.'],
  ex: 'tracert -h 5 1.1.1.1',
  out: `  1    <1 ms  192.168.1.1
  2     8 ms  10.20.0.1
  3     *     Tiempo de espera agotado`,
  n: ['`pathping` combina ping y tracert con estadísticas por salto.'] },

{ c: 'network', t: 'Puertos y conexiones (netstat)', cmd: 'netstat -ano',
  d: 'Lista conexiones TCP/UDP y el PID del proceso que las usa.',
  s: ['Ejecuta `netstat -ano`.', 'Filtra: `netstat -ano | findstr :80`.', 'Con el PID busca el proceso: `tasklist | findstr <PID>`.'],
  ex: 'netstat -ano | findstr :80',
  out: '  TCP    0.0.0.0:80    0.0.0.0:0    LISTENING    4',
  n: ['Útil para saber quién ocupa un puerto.'] },

{ c: 'network', t: 'Limpiar la caché DNS', cmd: 'ipconfig /flushdns',
  d: 'Borra la caché de nombres: soluciona sitios que no cargan tras cambiar de IP.',
  s: ['Ejecuta `ipconfig /flushdns`.', 'Vuelve a abrir el sitio.', 'Para ver lo que tenía guardado antes: `ipconfig /displaydns`.'],
  ex: 'ipconfig /flushdns',
  out: 'Se vació correctamente la caché de resolución de DNS.',
  n: ['Funciona sin permisos de administrador.'] },

{ c: 'network', t: 'Renovar la IP', cmd: 'ipconfig /release && ipconfig /renew',
  d: 'Libera la IP actual y pide una nueva al router (DHCP).',
  s: ['Ejecuta `ipconfig /release`.', 'Ejecuta `ipconfig /renew`.', 'Comprueba con `ipconfig`.'],
  ex: 'ipconfig /release\nipconfig /renew',
  n: ['! Si trabajas por escritorio remoto, perderás la conexión un momento.'] },

{ c: 'network', t: 'Consultar DNS (nslookup)', cmd: 'nslookup <dominio>',
  d: 'Consulta qué IP corresponde a un dominio.',
  s: ['Ejecuta `nslookup example.com`.', 'Para usar otro servidor DNS: `nslookup example.com 1.1.1.1`.', 'Lee `Address` en la respuesta.'],
  ex: 'nslookup example.com 1.1.1.1',
  n: ['Para tipos concretos: `nslookup -type=MX dominio.com`.'] },

{ c: 'network', t: 'Contraseña de Wi-Fi guardada', cmd: 'netsh wlan show profile name="<red>" key=clear', a: 1,
  d: 'Muestra la contraseña de una red Wi-Fi a la que ya te conectaste.',
  s: ['Lista las redes guardadas: `netsh wlan show profiles`.', 'Ejecuta el comando con el nombre de la red.', 'Busca `Contenido de la clave`.'],
  ex: 'netsh wlan show profile name="Casa-5G" key=clear',
  out: '    Contenido de la clave  : mi-clave-segura',
  n: ['Úsalo solo en tu propio equipo y tus propias redes.'] },

{ c: 'network', t: 'Restablecer la red', cmd: 'netsh winsock reset', a: 1,
  d: 'Reinicia la pila de red de Windows cuando hay fallos de conexión persistentes.',
  s: ['Abre CMD como administrador.', 'Ejecuta `netsh winsock reset` y luego `netsh int ip reset`.', 'Reinicia el equipo.'],
  ex: 'netsh winsock reset\nnetsh int ip reset',
  out: 'Se restableció correctamente el catálogo de Winsock. Debe reiniciar el equipo.',
  n: ['Úsalo como último recurso tras probar `ipconfig /flushdns` y `/renew`.'] },

{ c: 'network', t: 'Tabla ARP y MAC', cmd: 'arp -a',
  d: 'Muestra los dispositivos de tu red local con su IP y dirección MAC.',
  s: ['Ejecuta `arp -a`.', 'Identifica dispositivos por su IP.', '`getmac` muestra la MAC de tu propio equipo.'],
  ex: 'arp -a',
  out: `  Dirección IP         Dirección física      Tipo
  192.168.1.1          a4-2b-b0-11-22-33     dinámico`,
  n: ['Primero haz ping al dispositivo para que aparezca en la tabla.'] },

{ c: 'network', t: 'Unidades de red (net use)', cmd: 'net use <letra>: \\\\<servidor>\\<recurso>',
  d: 'Conecta una carpeta compartida de la red como una unidad (Z:, Y:…).',
  s: ['Ejecuta `net use Z: \\\\servidor\\compartida`.', 'Accede escribiendo `Z:`.', 'Desconecta con `net use Z: /delete`.'],
  ex: 'net use Z: \\\\192.168.1.50\\compartida /persistent:yes',
  n: ['`/persistent:yes` recuerda la unidad tras reiniciar.'] },

/* ───────────────────────── EXTRAS ───────────────────────── */
{ c: 'extras', t: 'Limpiar la pantalla', cmd: 'cls',
  d: 'Borra todo el texto de la ventana de CMD.',
  s: ['Escribe `cls`.', 'Presiona Enter.', 'La ventana queda limpia (el historial con ↑ se conserva).'],
  ex: 'cls',
  n: ['Equivale a `clear` en Linux.'] },

{ c: 'extras', t: 'Ayuda de un comando', cmd: 'help <comando>',
  d: 'Explica un comando de CMD; `<comando> /?` da la ayuda detallada.',
  s: ['Lista de comandos: `help`.', 'Detalle de uno: `copy /?`.', 'Lee las opciones y ejemplos.'],
  ex: 'robocopy /?',
  n: ['Para ver una pantalla a la vez: `help | more`.'] },

{ c: 'extras', t: 'Abrir el Bloc de notas', cmd: 'notepad <archivo>',
  d: 'Abre un archivo de texto (o crea uno nuevo) en el Bloc de notas.',
  s: ['Ejecuta `notepad notas.txt`.', 'Si no existe, pregunta si quieres crearlo.', 'Edita y guarda.'],
  ex: 'notepad notas.txt',
  n: ['`code .` abre la carpeta actual en VS Code si lo tienes instalado.'] },

{ c: 'extras', t: 'Abrir el Explorador aquí', cmd: 'start .',
  d: 'Abre la carpeta actual en el Explorador de archivos.',
  s: ['Ejecuta `start .` (el punto es la carpeta actual).', 'Se abre el Explorador en esa ruta.', 'También sirve con archivos y URLs: `start https://example.com`.'],
  ex: 'start .',
  n: ['`explorer .` hace lo mismo.'] },

{ c: 'extras', t: 'Copiar la salida al portapapeles', cmd: '<comando> | clip',
  d: 'Envía el resultado de un comando directamente al portapapeles.',
  s: ['Ejecuta `ipconfig | clip`.', 'Pega con `Ctrl + V` donde quieras.', 'Útil para compartir diagnósticos.'],
  ex: 'ipconfig /all | clip',
  n: ['Para copiar una ruta: `cd | clip`.'] },

{ c: 'extras', t: 'Cambiar colores y título', cmd: 'color 0A',
  d: 'Cambia los colores de la ventana (fondo y texto); `title` cambia el título.',
  s: ['Ejecuta `color 0A` (fondo negro, texto verde claro).', 'El primer dígito es el fondo y el segundo el texto (0–F).', 'Ver opciones con `color /?`; vuelve al normal con `color`.'],
  ex: 'color 0A\ntitle Pixel Terminal',
  n: ['`color 0A` te da el clásico estilo "hacker" verde.'] },

{ c: 'extras', t: 'Historial de comandos', cmd: 'doskey /history',
  d: 'Muestra los comandos que escribiste en esta ventana.',
  s: ['Ejecuta `doskey /history`.', 'Navega con ↑ y ↓ o `F7` (lista emergente).', 'Repite el último con `F3`.'],
  ex: 'doskey /history',
  out: `ipconfig
ping 1.1.1.1
dir`,
  n: ['El historial se pierde al cerrar la ventana.'] },

{ c: 'extras', t: 'Escribir en pantalla y en archivos', cmd: 'echo <texto> > <archivo>',
  d: 'Imprime texto; con `>` lo guarda en un archivo y con `>>` lo agrega.',
  s: ['Mostrar: `echo Hola`.', 'Guardar: `echo Hola > nota.txt`.', 'Añadir una línea más: `echo Otra línea >> nota.txt`.'],
  ex: 'echo Hola Pixel > nota.txt\ntype nota.txt',
  out: 'Hola Pixel',
  n: ['`echo.` imprime una línea en blanco.'] },

{ c: 'extras', t: 'Hora y fecha', cmd: 'date /t & time /t',
  d: 'Muestra la fecha y hora actuales sin pedir que las cambies.',
  s: ['Ejecuta `date /t`.', 'Ejecuta `time /t`.', 'Con `&` encadenas ambos en una sola línea.'],
  ex: 'date /t & time /t',
  out: `mié 28/10/2026
03:50 p. m.`,
  n: ['Sin `/t`, `date` y `time` te permiten modificarlas.'] },

{ c: 'extras', t: 'Salir o cerrar CMD', cmd: 'exit',
  d: 'Cierra la ventana de CMD (o sale de una subsesión como `diskpart`).',
  s: ['Escribe `exit`.', 'Presiona Enter.', 'La ventana se cierra.'],
  ex: 'exit',
  n: ['`cmd /k <comando>` abre otra consola y ejecuta el comando dejándola abierta.'] }

];
